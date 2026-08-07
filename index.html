
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Creative Radio 450 - 144.500 MHz</title>
  <style>
    :root {
      --bg: #090d16;
      --card: rgba(22, 30, 49, 0.7);
      --card-border: rgba(56, 189, 248, 0.2);
      --primary: #38bdf8;
      --accent: #8b5cf6;
      --accent-glow: rgba(139, 92, 246, 0.4);
      --text: #f8fafc;
      --muted: #94a3b8;
      --like: #f43f5e;
      --neon-cyan: #06b6d4;
    }
    
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
    }
    
    body { 
      background-color: var(--bg); 
      background-image: 
        radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.12) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.12) 0px, transparent 50%);
      color: var(--text); 
      display: flex; 
      justify-content: center; 
      padding: 16px 12px; 
      min-height: 100vh; 
    }
    
    .container { 
      width: 100%; 
      max-width: 480px; 
      display: flex; 
      flex-direction: column; 
      gap: 18px; 
    }
    
    /* STYLES ICON SVG */
    .icon-svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
      display: inline-block;
      vertical-align: middle;
    }
    
    /* MODERN PLAYER CARD STYLING */
    .modern-player-card { 
      background: var(--card);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      padding: 24px 20px; 
      border-radius: 24px; 
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
    }

    .modern-player-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .station-header {
      text-align: center;
      width: 100%;
    }

    .station-badge {
      background: rgba(56, 189, 248, 0.1);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      letter-spacing: 1px;
      display: inline-block;
      margin-bottom: 8px;
    }

    .station-title { 
      font-size: 1.5rem; 
      font-weight: 800;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 2px;
    }

    .station-freq {
      color: var(--muted);
      font-size: 0.85rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .freq-highlight {
      color: var(--neon-cyan);
      font-weight: 700;
      font-family: monospace;
      font-size: 0.95rem;
    }

    /* MODERN DISPLAY & VISUALIZER CANVAS */
    .display-screen {
      width: 100%;
      background: rgba(10, 15, 29, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 12px;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .screen-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.7rem;
      color: var(--muted);
      font-family: monospace;
    }

    .live-status {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #34d399;
      font-weight: 700;
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      background: #34d399;
      border-radius: 50%;
      box-shadow: 0 0 8px #34d399;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }

    canvas#spectrumCanvas {
      width: 100%;
      height: 75px;
      border-radius: 8px;
      background: rgba(5, 8, 16, 0.6);
    }

    /* CONTROLS AREA */
    .player-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;
      margin-top: 4px;
    }

    .play-btn-modern {
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      color: #ffffff;
      border: none;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      font-size: 1.4rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 20px var(--accent-glow);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .play-btn-modern .icon-svg {
      width: 24px;
      height: 24px;
    }

    .play-btn-modern:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 25px var(--accent-glow);
    }

    .play-btn-modern:active {
      transform: scale(0.95);
    }

    /* COMMENT CARD STYLING */
    .comments-card { 
      background: var(--card);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      padding: 18px 16px; 
      border-radius: 20px; 
      display: flex; 
      flex-direction: column; 
      gap: 14px; 
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    
    .comments-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 12px;
    }

    .comments-header h2 {
      font-size: 1.05rem;
      font-weight: 700;
    }

    .btn-open-popup {
      background: linear-gradient(135deg, var(--primary), #0284c7);
      color: #0f172a;
      border: none;
      padding: 8px 14px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);
      transition: transform 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-open-popup:active {
      transform: scale(0.95);
    }

    /* POPUP MODAL STYLES */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(9, 13, 22, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s ease-in-out;
    }

    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: #111827;
      width: 100%;
      max-width: 420px;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transform: translateY(15px);
      transition: transform 0.25s ease-in-out;
    }

    .modal-overlay.active .modal-content {
      transform: translateY(0);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .modal-header h3 {
      font-size: 1.1rem;
      color: var(--text);
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }

    .btn-close .icon-svg {
      width: 20px;
      height: 20px;
    }

    /* INDIKATOR BALASAN DI MODAL */
    .reply-banner {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.2);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.8rem;
      color: var(--primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .btn-cancel-reply {
      background: transparent;
      border: none;
      color: var(--like);
      cursor: pointer;
      font-weight: 700;
      font-size: 0.8rem;
    }

    .comment-form { 
      display: flex; 
      flex-direction: column; 
      gap: 12px; 
    }
    
    .form-row { 
      display: flex; 
      flex-direction: column; 
      gap: 10px; 
    }

    @media (min-width: 480px) {
      .form-row { flex-direction: row; }
      .form-row input { flex: 1; }
    }
    
    input, textarea { 
      background: rgba(17, 24, 39, 0.8); 
      border: 1px solid rgba(255, 255, 255, 0.1); 
      color: var(--text); 
      padding: 10px 12px; 
      border-radius: 10px; 
      font-size: 0.9rem; 
      width: 100%; 
      transition: border-color 0.2s;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .captcha-box { 
      background: rgba(17, 24, 39, 0.8); 
      padding: 10px 12px; 
      border-radius: 10px; 
      border: 1px dashed rgba(255, 255, 255, 0.15); 
      display: flex; 
      align-items: center; 
      justify-content: space-between;
    }

    .captcha-label {
      font-weight: 600;
      color: var(--primary);
      font-size: 0.85rem;
    }

    button.btn-submit { 
      background: linear-gradient(135deg, var(--primary), #0284c7); 
      color: #0f172a; 
      font-weight: 700; 
      border: none; 
      padding: 12px; 
      border-radius: 10px; 
      cursor: pointer; 
      font-size: 0.95rem;
    }

    /* LIST KOMENTAR & BALASAN */
    .comments-list { 
      display: flex; 
      flex-direction: column; 
      gap: 12px; 
    }
    
    .comment-item { 
      background: rgba(15, 23, 42, 0.6); 
      padding: 12px 14px; 
      border-radius: 12px; 
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-left: 3px solid var(--primary); 
    }
    
    .comment-item.is-reply {
      margin-left: 20px;
      border-left-color: var(--accent);
      background: rgba(15, 23, 42, 0.4);
    }

    .comment-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      font-size: 0.8rem; 
      margin-bottom: 6px; 
    }
    
    .comment-author { 
      font-weight: 700; 
      color: var(--primary); 
    }
    
    .user-badge { 
      background: rgba(51, 65, 85, 0.8); 
      color: var(--muted); 
      font-size: 0.65rem; 
      padding: 2px 6px; 
      border-radius: 4px; 
      font-family: monospace;
      margin-left: 4px;
    }
    
    .comment-time { 
      color: var(--muted); 
      font-size: 0.7rem; 
    }
    
    .comment-body { 
      font-size: 0.88rem; 
      word-break: break-word; 
      margin-bottom: 8px; 
      line-height: 1.4;
      color: #e2e8f0;
    }
    
    .comment-actions {
      display: flex;
      gap: 8px;
    }

    .like-btn, .reply-btn { 
      background: transparent; 
      border: 1px solid rgba(255, 255, 255, 0.1); 
      color: var(--muted); 
      padding: 4px 10px; 
      border-radius: 20px; 
      font-size: 0.75rem; 
      cursor: pointer; 
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }

    .like-btn .icon-svg, .reply-btn .icon-svg {
      width: 13px;
      height: 13px;
    }
    
    .like-btn.liked { 
      background: rgba(244, 63, 94, 0.15); 
      border-color: var(--like); 
      color: var(--like); 
    }

    .reply-btn:hover {
      background: rgba(56, 189, 248, 0.1);
      color: var(--primary);
    }

    .btn-more {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--primary);
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    }

    .btn-more:hover {
      background: rgba(56, 189, 248, 0.08);
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- PLAYER RADIO MODERN -->
    <div class="modern-player-card">
      <div class="station-header">
        <span class="station-badge">LIVE BROADCAST</span>
        <h1 class="station-title">Creative Radio 450</h1>
        <div class="station-freq">
          <span>Freq:</span>
          <span class="freq-highlight">144.500 MHz</span>
        </div>
      </div>
      
      <!-- Layar Display Visualizer & Status -->
      <div class="display-screen">
        <div class="screen-top-bar">
          <div class="live-status">
            <span class="pulse-dot"></span>
            <span id="lcdStatus">READY</span>
          </div>
          <span>AUDIO VISUALIZER</span>
        </div>
        <canvas id="spectrumCanvas"></canvas>
      </div>

      <!-- Tombol Kontrol Utama -->
      <div class="player-controls">
        <button class="play-btn-modern" id="playBtn" onclick="togglePlay()">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    </div>

    <!-- Audio Element -->
    <audio id="radioPlayer" crossorigin="anonymous" autoplay preload="auto">
      <source src="https://radio.pelajarjurnalis.or.id/radio/;" type="audio/mpeg">
    </audio>

    <!-- AREA KOMENTAR -->
    <div class="comments-card">
      <div class="comments-header">
        <h2>Komentar Pendengar</h2>
        <button class="btn-open-popup" onclick="openModal()">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          Tulis Pesan
        </button>
      </div>

      <div class="comments-list" id="commentsList"></div>
      
      <button id="btnLoadMore" class="btn-more" style="display: none;" onclick="loadMoreComments()">Tampilkan Komentar Lainnya</button>
    </div>
  </div>

  <!-- POPUP MODAL FORM KOMENTAR -->
  <div class="modal-overlay" id="commentModal" onclick="closeModalOnOverlay(event)">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modalTitle">Tulis Pesan Anda</h3>
        <button class="btn-close" onclick="closeModal()">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>

      <!-- Banner Indikator Balasan -->
      <div id="replyBanner" class="reply-banner" style="display: none;">
        <span>Membalas <strong id="replyTargetName">@User</strong></span>
        <button class="btn-cancel-reply" onclick="cancelReply()">Batal</button>
      </div>
      
      <form class="comment-form" id="commentForm">
        <div class="form-row">
          <input type="text" id="namaInput" placeholder="Nama Anda" required>
          <input type="email" id="emailInput" placeholder="Email (Privat)" required>
        </div>
        <textarea id="pesanInput" rows="3" placeholder="Tulis komentar atau salam..." required></textarea>
        <div class="captcha-box">
          <span class="captcha-label" id="captchaQuestion">Berapa 0 + 0?</span>
          <input type="number" id="captchaInput" placeholder="Hasil?" required style="width: 80px; text-align: center;">
        </div>
        <button type="submit" class="btn-submit" id="submitBtn">Kirim Komentar</button>
      </form>
    </div>
  </div>

  <script>
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoI3m5EAcayQptkr5N4ljxgMNrD_ifD-nF_tNPvA2M7RFkS2l4GXZ85D-wMvYgFjWn/exec'; // Ganti URL Apps Script Anda
    const commentForm = document.getElementById('commentForm');
    const namaInput = document.getElementById('namaInput');
    const emailInput = document.getElementById('emailInput');
    const pesanInput = document.getElementById('pesanInput');
    const submitBtn = document.getElementById('submitBtn');
    const commentsList = document.getElementById('commentsList');
    const btnLoadMore = document.getElementById('btnLoadMore');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captchaInput');
    const commentModal = document.getElementById('commentModal');
    
    const replyBanner = document.getElementById('replyBanner');
    const replyTargetName = document.getElementById('replyTargetName');

    // SVG ICONS TEMPLATES
    const playIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    const pauseIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    const heartIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    const replyIconSVG = `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>`;

    // AUDIO & VISUALIZER SPECTRUM
    const radioPlayer = document.getElementById('radioPlayer');
    const playBtn = document.getElementById('playBtn');
    const lcdStatus = document.getElementById('lcdStatus');
    const canvas = document.getElementById('spectrumCanvas');
    const ctx = canvas.getContext('2d');

    let audioCtx, analyser, source;
    let isInitialized = false;

    // Autoplay Listener
    window.addEventListener('DOMContentLoaded', () => {
      radioPlayer.play().then(() => {
        playBtn.innerHTML = pauseIconSVG;
        lcdStatus.innerText = 'STREAMING';
      }).catch(() => {
        lcdStatus.innerText = 'PAUSED';
      });
    });

    function initAudio() {
      if (isInitialized) return;
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(radioPlayer);
        
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        analyser.fftSize = 64; 
        isInitialized = true;
      } catch(e) {}
    }

    function togglePlay() {
      initAudio();

      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (radioPlayer.paused) {
        radioPlayer.play();
        playBtn.innerHTML = pauseIconSVG;
        lcdStatus.innerText = 'STREAMING';
        if (isInitialized) drawSpectrum();
      } else {
        radioPlayer.pause();
        playBtn.innerHTML = playIconSVG;
        lcdStatus.innerText = 'PAUSED';
      }
    }

    function drawSpectrum() {
      if (radioPlayer.paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      requestAnimationFrame(drawSpectrum);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 3.8;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(1, '#8b5cf6');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 3, barHeight);

        x += barWidth;
      }
    }

    // Modal Popup Control
    let selectedParentId = null;

    function openModal(parentId = null, authorName = '') { 
      selectedParentId = parentId;
      if (parentId) {
        replyTargetName.innerText = '@' + authorName;
        replyBanner.style.display = 'flex';
      } else {
        replyBanner.style.display = 'none';
      }
      commentModal.classList.add('active'); 
    }

    function closeModal() { 
      commentModal.classList.remove('active'); 
      cancelReply();
    }

    function cancelReply() {
      selectedParentId = null;
      replyBanner.style.display = 'none';
    }

    function closeModalOnOverlay(e) { if (e.target === commentModal) closeModal(); }

    // CAPTCHA & KOMENTAR LOGIC
    let captchaAnswer = 0;
    let localLikedComments = JSON.parse(localStorage.getItem('radio_liked_ids') || '[]');
    let allComments = [];
    let visibleCount = 10; 

    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      captchaAnswer = num1 + num2;
      captchaQuestion.innerText = `Berapa ${num1} + ${num2}?`;
      captchaInput.value = '';
    }

    function loadSavedUser() {
      const savedName = localStorage.getItem('radio_user_name');
      const savedEmail = localStorage.getItem('radio_user_email');
      if (savedName) namaInput.value = savedName;
      if (savedEmail) emailInput.value = savedEmail;
    }

    async function fetchComments() {
      try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        
        if (!data || data.length === 0) {
          commentsList.innerHTML = '<p style="text-align:center;color:var(--muted);font-size:0.85rem;">Belum ada komentar.</p>';
          btnLoadMore.style.display = 'none';
          return;
        }

        allComments = data; 
        renderComments();

      } catch (err) {
        commentsList.innerHTML = '<p style="text-align:center;color:red;font-size:0.85rem;">Gagal memuat komentar.</p>';
      }
    }

    function renderComments() {
      // Kelompokkan komentar utama dan balasan
      const parentComments = allComments.filter(c => !c.parentId);
      const replies = allComments.filter(c => c.parentId);

      // Urutkan balasan dari terlama ke terbaru
      replies.reverse();

      const commentsToDisplay = parentComments.slice(0, visibleCount);

      let html = '';

      commentsToDisplay.forEach(item => {
        html += renderCommentCard(item, false);

        // Cari balasan dari komentar ini
        const itemReplies = replies.filter(r => r.parentId == item.id);
        itemReplies.forEach(reply => {
          html += renderCommentCard(reply, true);
        });
      });

      commentsList.innerHTML = html;
      btnLoadMore.style.display = parentComments.length > visibleCount ? 'block' : 'none';
    }

    function renderCommentCard(item, isReply) {
      const date = new Date(item.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
      const isLiked = localLikedComments.includes(item.id);
      
      return `
        <div class="comment-item ${isReply ? 'is-reply' : ''}">
          <div class="comment-header">
            <div>
              <span class="comment-author">${escapeHtml(item.nama)}</span>
              <span class="user-badge">${escapeHtml(item.userCode)}</span>
            </div>
            <span class="comment-time">${date}</span>
          </div>
          <div class="comment-body">${escapeHtml(item.pesan)}</div>
          <div class="comment-actions">
            <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${item.id}, this)">
              ${heartIconSVG} <span class="like-count">${item.likes || 0}</span>
            </button>
            ${!isReply ? `
              <button class="reply-btn" onclick="openModal(${item.id}, '${escapeHtml(item.nama)}')">
                ${replyIconSVG} Balas
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }

    function loadMoreComments() {
      visibleCount += 10;
      renderComments();
    }

    async function toggleLike(rowId, btnElement) {
      if (localLikedComments.includes(rowId)) return;
      
      const countSpan = btnElement.querySelector('.like-count');
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
      } catch (err) {}
    }

    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (parseInt(captchaInput.value.trim(), 10) !== captchaAnswer) {
        alert('Jawaban Captcha salah!');
        generateCaptcha();
        return;
      }

      const nama = namaInput.value.trim();
      const email = emailInput.value.trim();
      const pesan = pesanInput.value.trim();

      localStorage.setItem('radio_user_name', nama);
      localStorage.setItem('radio_user_email', email);

      submitBtn.disabled = true;
      submitBtn.innerText = 'Mengirim...';

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
          fetchComments();
          submitBtn.disabled = false;
          submitBtn.innerText = 'Kirim Komentar';
        }, 1200);
      } catch (err) {
        alert('Gagal mengirim komentar.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim Komentar';
      }
    });

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    generateCaptcha();
    loadSavedUser();
    fetchComments();
    setInterval(fetchComments, 10000);
  </script>
</body>
</html>
