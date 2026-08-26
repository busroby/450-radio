// ==========================================
// KONFIGURASI & DEKLARASI ELEMEN DOM
// ==========================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_O1fa98OjJqmah-AvmIRU_IrZOK7Yi6eH_7PBP9QJTjz_MwEeyB_wWN350u2Tey35/exec';
const streamUrl = "https://radio.pelajarjurnalis.or.id/play";

// Elemen Form & Komentar
const commentForm = document.getElementById('commentForm');
const namaInput = document.getElementById('namaInput');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const pesanInput = document.getElementById('pesanInput');
const submitBtn = document.getElementById('submitBtn');
const commentsList = document.getElementById('commentsList');
const captchaQuestion = document.getElementById('captchaQuestion');
const captchaInput = document.getElementById('captchaInput');
const commentModal = document.getElementById('commentModal');

// Elemen Navigasi & UI Chat
const replyBanner = document.getElementById('replyBanner');
const replyTargetName = document.getElementById('replyTargetName');
const btnScrollBottom = document.getElementById('btnScrollBottom');
const unreadBadge = document.getElementById('unreadBadge');

// Elemen Audio & Visualizer
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const statusIndicator = document.getElementById('statusIndicator');
const canvas = document.getElementById('spectrumCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// Elemen Lightbox Galeri
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

// Icon SVG
const playIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const heartIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
const replyIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>`;

const svgPlay = '<path d="M8 5v14l11-7z"/>';
const svgPause = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';

// State Global Audio
let radioPlayer = null;
let audioCtx = null;
let analyser = null;
let source = null;

// State Global Komentar
let selectedParentId = null;
let captchaAnswer = 0;
let localLikedComments = JSON.parse(localStorage.getItem('radio_liked_ids') || '[]');
let allComments = [];
let visibleCount = 15;
let isFirstLoad = true;
let unreadCount = 0;


// ==========================================
// AUDIO STREAMING & SPECTRUM VISUALIZER
// ==========================================
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64; // 32 bar frekuensi
    analyser.connect(audioCtx.destination);
  }
}

if (playBtn) {
  playBtn.addEventListener('click', function() {
    initAudio();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Play Radio Streaming
    if (!radioPlayer || radioPlayer.paused) {
      radioPlayer = new Audio();
      radioPlayer.src = streamUrl;
      radioPlayer.crossOrigin = "anonymous";
      radioPlayer.preload = "none";

      requestFullScreen();

      source = audioCtx.createMediaElementSource(radioPlayer);
      source.connect(analyser);

      radioPlayer.play()
        .then(() => {
          if (playIcon) playIcon.innerHTML = svgPause;
          if (statusIndicator) {
            statusIndicator.innerText = "Live";
            statusIndicator.classList.add('playing');
          }
          drawSpectrum();
        })
        .catch(err => {
          console.error("Gagal melakukan streaming:", err);
          if (statusIndicator) statusIndicator.innerText = "Error Conn";
        });

    } else {
      // Pause / Stop Radio Streaming (Anti-delay reset)
      radioPlayer.pause();
      radioPlayer.src = "";
      radioPlayer.load();

      exitFullScreen();

      if (source) {
        source.disconnect();
      }

      if (playIcon) playIcon.innerHTML = svgPlay;
      if (statusIndicator) {
        statusIndicator.innerText = "Paused";
        statusIndicator.classList.remove('playing');
      }

      drawSpectrum(); // Membersihkan canvas
    }
  });
}

function drawSpectrum() {
  if (!ctx || !canvas) return;

  if (!radioPlayer || radioPlayer.paused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  requestAnimationFrame(drawSpectrum);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barGap = 2;
  const totalGaps = (bufferLength - 1) * barGap;
  const barWidth = (canvas.width - totalGaps) / bufferLength;

  const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
  gradient.addColorStop(0, '#00a884');
  gradient.addColorStop(0.7, '#00d2a2');
  gradient.addColorStop(1, '#34d399');

  for (let i = 0; i < bufferLength; i++) {
    const value = dataArray[i];
    const percent = value / 255;
    const barHeight = Math.max(3, percent * canvas.height);
    const x = i * (barWidth + barGap);
    const y = canvas.height - barHeight;

    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    if (ctx.roundRect) {
      ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
    } else {
      ctx.rect(x, y, barWidth, barHeight);
    }
    ctx.fill();
  }
}


// ==========================================
// MODAL & CONTROL BALASAN KOMENTAR
// ==========================================
function openModal(parentId = null, authorName = '') {
  selectedParentId = parentId;
  if (parentId && replyBanner) {
    replyTargetName.innerText = '@' + authorName;
    replyBanner.style.display = 'flex';
  } else if (replyBanner) {
    replyBanner.style.display = 'none';
  }
  clearEmailError();
  if (commentModal) commentModal.classList.add('active');
}

function closeModal() {
  if (commentModal) commentModal.classList.remove('active');
  cancelReply();
}

function cancelReply() {
  selectedParentId = null;
  if (replyBanner) replyBanner.style.display = 'none';
}

function closeModalOnOverlay(e) { 
  if (e.target === commentModal) closeModal(); 
}


// ==========================================
// LOGIKA SISTEM KOMENTAR & CAPTCHA
// ==========================================
function generateCaptcha() {
  if (!captchaQuestion || !captchaInput) return;
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  captchaAnswer = num1 + num2;
  captchaQuestion.innerText = `Berapa ${num1} + ${num2}?`;
  captchaInput.value = '';
}

function loadSavedUser() {
  const savedName = localStorage.getItem('radio_user_name');
  const savedEmail = localStorage.getItem('radio_user_email');
  if (savedName && namaInput) namaInput.value = savedName;
  if (savedEmail && emailInput) emailInput.value = savedEmail;
}

async function fetchComments(forceScroll = false) {
  if (!commentsList) return;
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();

    if (!data || data.length === 0) {
      commentsList.innerHTML = '<p style="text-align:center;color:var(--wa-muted);font-size:0.8rem;margin:auto;">Belum ada pesan.</p>';
      return;
    }

    // Cek pesan baru masuk saat pengguna tidak di paling bawah
    if (!isFirstLoad && data.length > allComments.length) {
      const diff = data.length - allComments.length;
      const isAtBottom = (commentsList.scrollHeight - commentsList.scrollTop) <= (commentsList.clientHeight + 80);

      if (!isAtBottom) {
        unreadCount += diff;
        updateScrollButtonUI(true);
      }
    }

    allComments = data;
    renderComments(forceScroll);

  } catch (err) {
    console.error("Fetch Error:", err);
    commentsList.innerHTML = '<p style="text-align:center;color:red;font-size:0.8rem;margin:auto;">Gagal memuat obrolan.</p>';
  }
}

function renderComments(forceScroll = false) {
  if (!commentsList) return;

  const isAtBottom = (commentsList.scrollHeight - commentsList.scrollTop) <= (commentsList.clientHeight + 80);

  // Urutan kronologis lama ke baru (Oldest First)
  allComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Ambil hanya komentar utama (tanpa parentId)
  const parentComments = allComments.filter(c => !c.parentId);
  const totalParents = parentComments.length;

  // Batasi sesuai visibleCount
  const commentsToDisplay = parentComments.slice(Math.max(0, totalParents - visibleCount));

  let html = '';

  // Tombol muat pesan lebih lama di paling atas
  if (totalParents > visibleCount) {
    html += `<button class="btn-more" onclick="loadMoreComments()">Muat Pesan Lebih Lama</button>`;
  }

  // Render thread komentar
  commentsToDisplay.forEach(item => {
    html += renderThreadRecursive(item);
  });

  commentsList.innerHTML = html;

  // Autoscroll ke bawah
  if (isFirstLoad || forceScroll || isAtBottom) {
    scrollToBottom();
    isFirstLoad = false;
  }
}

// Rekursif untuk merender hirarki balasan
function renderThreadRecursive(commentItem) {
  const parentOfComment = commentItem.parentId ? allComments.find(c => String(c.id) === String(commentItem.parentId)) : null;
  let html = `<div class="chat-thread">`;
  html += renderChatBubble(commentItem, parentOfComment);

  // Cari anak balasan
  const childReplies = allComments
    .filter(c => String(c.parentId) === String(commentItem.id))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  if (childReplies.length > 0) {
    html += `<div class="chat-replies-container">`;
    childReplies.forEach(reply => {
      html += renderThreadRecursive(reply);
    });
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function renderChatBubble(item, parentItem = null) {
  const date = new Date(item.timestamp).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '');

  const isLiked = localLikedComments.includes(item.id);
  const isReply = !!item.parentId;

  let quotedHtml = '';
  if (isReply && parentItem) {
    quotedHtml = `
      <div class="chat-quoted">
        <div class="chat-quoted-author">${escapeHtml(parentItem.nama)}</div>
        <div class="chat-quoted-text">${escapeHtml(parentItem.pesan)}</div>
      </div>
    `;
  }

  return `
    <div class="chat-bubble ${isReply ? 'outgoing' : 'incoming'}">
      <div class="chat-author-line">
        <span class="chat-author">${escapeHtml(item.nama)}</span>
        <span class="chat-user-code">${escapeHtml(item.userCode || '')}</span>
      </div>

      ${quotedHtml}

      <div class="chat-message-text">${escapeHtml(item.pesan)}</div>

      <div class="chat-footer">
        <div class="chat-actions">
          <button class="chat-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${item.id}', this)">
            ${heartIconSVG} <span>${item.likes || 0}</span>
          </button>
          <button class="chat-btn" onclick="openModal('${item.id}', '${escapeHtml(item.nama)}')">
            ${replyIconSVG}
          </button>
        </div>
        <span class="chat-time">${date}</span>
      </div>
    </div>
  `;
}


// ==========================================
// SCROLL MONITOR & INTERAKSI KHUSUS
// ==========================================
if (commentsList) {
  commentsList.addEventListener('scroll', () => {
    const isAtBottom = (commentsList.scrollHeight - commentsList.scrollTop) <= (commentsList.clientHeight + 80);

    if (isAtBottom) {
      unreadCount = 0;
      updateScrollButtonUI(false);
    } else {
      updateScrollButtonUI(true);
    }
  });
}

function updateScrollButtonUI(show) {
  if (!btnScrollBottom) return;
  if (show) {
    btnScrollBottom.classList.add('active');
    if (unreadCount > 0) {
      btnScrollBottom.classList.add('has-unread');
      if (unreadBadge) unreadBadge.innerText = unreadCount > 99 ? '99+' : unreadCount;
    } else {
      btnScrollBottom.classList.remove('has-unread');
    }
  } else {
    btnScrollBottom.classList.remove('active', 'has-unread');
  }
}

function scrollToBottomManual() {
  unreadCount = 0;
  updateScrollButtonUI(false);
  scrollToBottom();
}

function scrollToBottom() {
  setTimeout(() => {
    if (commentsList) commentsList.scrollTop = commentsList.scrollHeight;
  }, 50);
}

function loadMoreComments() {
  visibleCount += 15;
  renderComments(false);
}

async function toggleLike(rowId, btnElement) {
  if (localLikedComments.includes(rowId)) return;

  const countSpan = btnElement.querySelector('span');
  let currentLikes = parseInt(countSpan.innerText) || 0;
  countSpan.innerText = currentLikes + 1;
  btnElement.classList.add('liked');

  localLikedComments.push(rowId);
  localStorage.setItem('radio_liked_ids', JSON.stringify(localLikedComments));

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify({ action: 'like', rowId: rowId })
    });
  } catch (err) {
    console.error("Gagal mengirim Like:", err);
  }
}


// ==========================================
// VALIDASI EMAIL & PENGIRIMAN FORM
// ==========================================
function isValidEmailSyntax(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

async function checkDomainMX(domain) {
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { 'accept': 'application/dns-json' }
    });
    const data = await response.json();
    return data.Status === 0 && data.Answer && data.Answer.length > 0;
  } catch (e) {
    return true; // Fallback jika terjadi kegagalan jaringan API
  }
}

function showEmailError(msg) {
  if (!emailInput || !emailError) return;
  emailInput.classList.add('input-error');
  emailError.innerText = msg;
  emailError.classList.add('active');
}

function clearEmailError() {
  if (!emailInput || !emailError) return;
  emailInput.classList.remove('input-error');
  emailError.classList.remove('active');
}

if (emailInput) {
  emailInput.addEventListener('input', clearEmailError);
}

if (commentForm) {
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearEmailError();

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const pesan = pesanInput.value.trim();

    if (!isValidEmailSyntax(email)) {
      showEmailError('Format email tidak valid (contoh: user@gmail.com)');
      return;
    }

    if (parseInt(captchaInput.value.trim(), 10) !== captchaAnswer) {
      alert('Jawaban Captcha salah!');
      generateCaptcha();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = 'Memeriksa email...';

    const domain = email.split('@')[1];
    const isDomainValid = await checkDomainMX(domain);

    if (!isDomainValid) {
      showEmailError(`Domain '@${domain}' tidak dapat menerima email / tidak aktif.`);
      submitBtn.disabled = false;
      submitBtn.innerText = 'Kirim';
      return;
    }

    submitBtn.innerText = 'Mengirim...';

    localStorage.setItem('radio_user_name', nama);
    localStorage.setItem('radio_user_email', email);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          nama,
          email,
          pesan,
          parentId: selectedParentId
        })
      });

      pesanInput.value = '';
      generateCaptcha();
      closeModal();

      setTimeout(() => {
        fetchComments(true);
        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim';
      }, 1200);
    } catch (err) {
      alert('Gagal mengirim pesan.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Kirim';
    }
  });
}


// ==========================================
// UTILITAS, FULLSCREEN & GALERI
// ==========================================
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function requestFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(() => {});
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function switchPage(pageId, evt) {
  document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) selectedPage.classList.add('active');
  if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');

  if (pageId === 'gallery-page') {
    fetchGalleryData();
  }
}

function fetchGalleryData() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  fetch(SCRIPT_URL + '?action=gallery')
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';

      if (!data || data.length === 0 || data.error) {
        container.innerHTML = '<p style="text-align:center; color:var(--wa-muted); grid-column: 1/-1;">Belum ada foto di galeri.</p>';
        return;
      }

      renderGallery(data);
    })
    .catch(err => {
      console.error("Gagal mengambil data galeri:", err);
      container.innerHTML = '<p style="text-align:center; color:var(--error); grid-column: 1/-1;">Gagal memuat galeri.</p>';
    });
}

function renderGallery(galleryData) {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  let html = '';

  galleryData.forEach(item => {
    const title = escapeHtml(item.title || 'Foto Galeri');
    const caption = escapeHtml(item.caption || '');
    const imgUrl = item.imageUrl || '';

    if (!imgUrl) return;

    html += `
      <div class="gallery-item" onclick="openLightbox('${imgUrl}', '${title}', '${caption}')">
        <img src="${imgUrl}" alt="${title}" loading="lazy">
        <div class="gallery-info">
          <h4>${title}</h4>
        </div>
      </div>
    `;
  });

  galleryGrid.innerHTML = html;
}

function openLightbox(imageUrl, title, caption) {
  if (!lightboxImg || !lightboxModal) return;
  lightboxImg.src = imageUrl;
  if (lightboxCaption) {
    lightboxCaption.innerHTML = `<strong>${title}</strong>${caption ? '<br>' + caption : ''}`;
  }
  lightboxModal.classList.add('active');
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  setTimeout(() => {
    if (lightboxImg) lightboxImg.src = '';
  }, 250);
}

function closeLightboxOnOverlay(e) {
  if (e.target === lightboxModal) closeLightbox();
}

// ==========================================
// INISIALISASI AWAL WEB
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  generateCaptcha();
  loadSavedUser();
  fetchComments(true);

  // Auto Refresh Komentar setiap 15 detik
  setInterval(() => {
    fetchComments(false);
  }, 15000);
});
