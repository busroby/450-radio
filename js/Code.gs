function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Ambil parameter dari URL (baik ?sheet=gallery maupun ?action=gallery)
  var target = "";
  if (e && e.parameter) {
    target = e.parameter.sheet || e.parameter.action || "";
  }
  target = String(target).toLowerCase().trim();

  // 1. JIKA PEMANGGILAN UNTUK GALERI (?sheet=gallery)
  if (target === "gallery" || target === "galeri") {
    var sheetGallery = ss.getSheetByName("Gallery");
    
    if (!sheetGallery) {
      return ContentService.createTextOutput(JSON.stringify([{ error: "Tab sheet bernama 'Gallery' tidak ditemukan!" }]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var dataGallery = sheetGallery.getDataRange().getValues();
    var resultGallery = [];

    for (var j = 1; j < dataGallery.length; j++) {
      if (!dataGallery[j][0] && !dataGallery[j][1]) continue;

      resultGallery.push({
        id: j + 1,
        title: dataGallery[j][0] || '',
        imageUrl: dataGallery[j][1] || '',
        caption: dataGallery[j][2] || '',
        date: dataGallery[j][3] || ''
      });
    }

    return ContentService.createTextOutput(JSON.stringify(resultGallery))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. DEFAULT: PEMANGGILAN OBROLAN / KOMENTAR
  var sheetKomentar = ss.getSheetByName("Komentar") || ss.getSheets()[0];
  var data = sheetKomentar.getDataRange().getValues();
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    if (!data[i][1] && !data[i][3]) continue;

    result.push({
      id: i + 1,
      timestamp: data[i][0],
      nama: data[i][1],
      email: data[i][2],
      pesan: data[i][3],
      userCode: data[i][4] || '',
      likes: data[i][5] || 0,
      parentId: data[i][6] || null
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetKomentar = ss.getSheetByName("Komentar") || ss.getSheets()[0];
    
    // Membaca data kiriman dengan aman
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var action = data.action || '';

    // --- 1. ADMIN ACTIONS ---
    if (action === 'deleteChat') {
      var targetId = Number(data.id);
      var dataKomentar = sheetKomentar.getDataRange().getValues();
      for (var i = 1; i < dataKomentar.length; i++) {
        if ((i + 1) == targetId) {
          sheetKomentar.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "ID tidak ditemukan" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'addGallery') {
      var sheetGallery = ss.getSheetByName("Gallery");
      if (!sheetGallery) return ContentService.createTextOutput("Error: Sheet Gallery tidak ada");
      sheetGallery.appendRow([data.title || '', data.imageUrl || '', data.caption || '', new Date().toISOString().split('T')[0]]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Tambahkan potongan logika ini di dalam fungsi doPost(e) pada bagian ADMIN ACTIONS:
    if (action === 'editGallery') {
      var sheetGallery = ss.getSheetByName("Gallery");
      if (!sheetGallery) return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Sheet Gallery tidak ditemukan" }));

      var targetRow = Number(data.rowId); // Baris di Spreadsheet (id)
      var title = data.title || '';
      var imageUrl = data.imageUrl || '';
      var caption = data.caption || '';

      if (targetRow > 1) {
        // Ubah data pada Kolom A (Title), Kolom B (imageUrl), Kolom C (caption)
        sheetGallery.getRange(targetRow, 1).setValue(title);
        sheetGallery.getRange(targetRow, 2).setValue(imageUrl);
        sheetGallery.getRange(targetRow, 3).setValue(caption);

        return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Galeri berhasil diperbarui" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Baris tidak valid" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Tambahkan logika ini di bagian ADMIN ACTIONS pada doPost(e):
    if (action === 'checkPassword') {
      var sheetAdmin = ss.getSheetByName("Admin");
      
      if (!sheetAdmin) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Sheet 'Admin' belum dibuat!" }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Ambil password tersimpan di sel A2
      var savedPassword = String(sheetAdmin.getRange("A2").getValue()).trim();
      var inputPassword = String(data.password || '').trim();

      if (inputPassword === savedPassword) {
        return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ status: "wrong" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // --- 2. USER ACTION: LIKE (TANPA LOGIN ADMIN) ---
    if (action === 'like') {
      var rowId = Number(data.rowId);
      if (rowId > 1) {
        var currentLikes = sheetKomentar.getRange(rowId, 6).getValue() || 0;
        sheetKomentar.getRange(rowId, 6).setValue(Number(currentLikes) + 1);
        return ContentService.createTextOutput("Liked");
      }
    }

    // --- 3. USER ACTION: KIRIM PESAN BARU (TANPA LOGIN ADMIN) ---
    var timestamp = new Date();
    var nama = data.nama || 'Anonim';
    var email = data.email || 'anon@mail.com';
    var pesan = data.pesan || '';
    var parentId = data.parentId || '';

    if (!pesan.trim()) {
      return ContentService.createTextOutput("Error: Pesan kosong");
    }

    // Buat User Code Unik dari Email
    //var userCode = "USR-" + Math.abs(hashCode(email)).toString(16).substring(0, 4).toUpperCase();
    var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, email.toLowerCase());
    var userCode = '#' + rawHash.map(function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('').substring(0, 4).toUpperCase();    

    // Simpan ke Sheet1: [A: Timestamp, B: Nama, C: Email, D: Pesan, E: UserCode, F: Likes, G: ParentId]
    sheetKomentar.appendRow([timestamp, nama, email, pesan, userCode, 0, parentId]);
    
    return ContentService.createTextOutput("Success");

  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  } finally {
    lock.releaseLock();
  }
}
