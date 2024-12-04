// Ini File Javascript

// Cara Menghitung BMI = Berat Badan/(Tinggi Badan)2
function rumusBMI(){
    let beratBadan = document.getElementById("berat-badan-input").value;
    let tinggiBadan = document.getElementById("tinggi-badan-input").value;
    beratBadan = parseFloat(beratBadan); // Mengubah String Menjadi Integer
    tinggiBadan = parseFloat(tinggiBadan); // Mengubah String Menjadi Integer
    let bmi = (beratBadan/(tinggiBadan/100)**2); // Mengubah Satuan CM Menjadi M Supaya Selaras Dengan Rumus BMI
    bmi = bmi.toFixed(1); // Pembulatan Dua Angka Desimal
    console.log(bmi);

// Validasi Data Input
    if (isNaN(beratBadan)|| isNaN(tinggiBadan)||beratBadan <=0 || tinggiBadan <=0) {
        alert ("Pastikan semua data diinput dengan benar (angka positif).");
        return; 
    }

// Validasi Hasil BMI
    if (isNaN(bmi) || bmi <= 0) {
        alert("Hasil BMI tidak valid.");
        return;
    }

 // Menampilkan Hasil Hitung BMI di Section Hasil Kalkulasi
    let resultCalculation = document.getElementById("result-calculation");
        if (resultCalculation) {
            resultCalculation.innerHTML = bmi;
        } else {
            console.error("Elemen 'result-calculation' tidak ditemukan");
        }

// Membuat kondisi dan Menampilkan Keterangan di Section Hasil Kalkulasi
let keterangan = "";
    if (bmi < 18.5) {
        keterangan = "Kekurangan Berat Badan";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        keterangan = "Normal (Ideal)";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        keterangan = "Kelebihan Berat Badan";
    } else if (bmi >30) {
        keterangan = "Kegemukan (Obestitas)";
    } else 
        keterangan = "-";
                    
let infoResult = document.getElementById("info-result");
    if (infoResult) {
        infoResult.innerHTML = keterangan;
    } else {
        console.error("Elemen 'info-result' tidak ditemukan");
    }

// Mengatur Pilihan Radio Button
    let jenisKelamin = document.querySelector('input[name="gender"]:checked'); // Mengambil nilai radio button yang terpilih
        if (jenisKelamin) {
            document.getElementById("gender-value").innerHTML = jenisKelamin.value; // Menampilkan jenis kelamin
        } else {
            document.getElementById("gender-value").innerHTML = "-"; // Menampilkan "-" jika belum dipilih
        }

// Memunculkan Usia di Section Hasil Kalkulasi        
    let usia = document.getElementById("usia-input").value; 
        document.getElementById("usia-value").innerHTML = usia;
}

// Mengatur Tombol Reset
function resetForm(){
    // Kosongkan Semua Inputan Number
    document.getElementById("berat-badan-input").value = "";
    document.getElementById("tinggi-badan-input").value = "";
    document.getElementById("usia-input").value = "";

    // Kosongkan Pilihan Jenis Kelamin di Radio Button
    let jenisKelamin = document.getElementsByName("gender");
    for (let i = 0; i < jenisKelamin.length; i++){
        jenisKelamin[i].checked = false;
    }

    // Kosongkan Semua Result di Section Hasil Kalkulasi
    document.getElementById("result-calculation").innerHTML = "0";
    document.getElementById("info-result").innerHTML = "Status Berat Badan";
    document.getElementById("pilih-gender").innerHTML = "Jenis Kelamin";
    document.getElementById("usia-pengunjung").innerHTML = "Usia";
}


// Mengatur Tombol Download File
function downloadFile(){
    let bmi = document.getElementById("result-calculation").innerHTML;
    let jenisKelamin = document.getElementById("gender-value").innerHTML;
    let statusBeratBadan = document.getElementById("info-result").innerHTML;
    let usia = document.getElementById("usia-input").value;
// Data Validation
    if (!bmi || bmi === "0" || !jenisKelamin || jenisKelamin === "Jenis Kelamin" || ! statusBeratBadan === "Status Berat Badan") {
        alert("Pastikan semua data sudah dihitung dengan benar dan siap diunduh.");
        return;
    }

// Membuat Isi File Download  
let fileContent = `Hasil Kalkulasi BMI\n\nJenis Kelamin: ${jenisKelamin}\nUsia: ${usia}\nBMI: ${bmi}\nStatus Berat Badan: ${statusBeratBadan}`;
  
// Membuat Blob dari String
    let blob = new Blob([fileContent], {type:'text/plain'});
    
// Membuat URL untuk Blob    
    let url = URL.createObjectURL(blob);

// Membuat elemen <a> untuk Download File
    let a = document.createElement("a");
    a.href = url;
    a.download = "Hasil_BMI.txt";

// Menambahkan elemen <a> ke DOM dan Memicu Klik Download
    document.body.appendChild(a);

// Mengatur Timeout Untuk Menunda Pemanggilan Klik
    setTimeout(function() {
        a.click();
    // Menghapus Elemen <a> Setelah Di Klik
    document.body.removeChild(a);
    // Menghapus URL Object Setelah Selesai
    URL.revokeObjectURL(url);
}, 100);
}
