#  Sistem Manajemen Data Lahan dan Tanaman

Mini Project Ujian Tengah Semester (UTS) Ganjil T.A. 2026/2027  
Mata Kuliah: **Dasar Pemrograman Frontend**  
STIKOM PGRI Banyuwangi  

---

##  Identitas Mahasiswa

* **Nama**: Muhammad Yoga Rayfanda Wibowo
* **NIM**: 1125102228 (NIM Genap)
* **Kelas**: SP3.1
* **Program Studi**: S1 Teknik Informatika
* **Dosen Pengampu**: Sony Panca Budiarto, M.Kom

---

##  Deskripsi Proyek

Aplikasi **Sistem Manajemen Data Lahan dan Tanaman** adalah platform web frontend interaktif yang dirancang untuk mengelola inventaris plot lahan pertanian dan komoditas tanaman di wilayah Banyuwangi. 

Proyek ini dibangun secara murni menggunakan **Vanilla JavaScript ES6+**, **HTML5 Semantik**, dan **CSS3 Modern (Mobile-First)** tanpa bantuan *framework* atau *library* eksternal (seperti Bootstrap, Tailwind, jQuery, atau React) sesuai ketentuan soal UTS.

---

##  Fitur Utama

1. **Struktur Modular (ES Modules)**:
   * Menggunakan tag `<script type="module">` untuk memisahkan logika aplikasi menjadi modul-modul yang terisolasi dan rapi (*Clean Code*).
2. **Dashboard Agregasi Statistik**:
   * Menampilkan perhitungan total plot lahan, total luas (m²), dan estimasi hasil panen (Kg) secara otomatis menggunakan *Higher-Order Function* (`.reduce()`).
3. **Formulir Validasi Client-Side & Live Preview**:
   * Memiliki sistem validasi input interaktif (*error text & state*) serta fitur *Live Preview* data secara real-time saat pengguna mengetik.
4. **Fitur CRUD & Anti-Reload**:
   * Mendukung aksi **Tambah Data**, **Edit Data**, **Hapus Data**, dan **Toggle Status Plot Lahan** secara asinkron tanpa memuat ulang (*reload*) halaman peramban via `event.preventDefault()`.
5. **Pencarian & Filter Real-Time**:
   * Fitur pencarian lokasi lahan dan filter komoditas tanaman yang responsif menggunakan *Higher-Order Function* (`.filter()`).
6. **Katalog Card Dinamis (Dynamic DOM UI)**:
   * Rendering kartu status lahan secara dinamis ke pohon DOM menggunakan `document.createElement()` dan `append()`.

---

##  Struktur Direktori Proyek

```text
uts-frontend-lahan/
├── index.html                  # Berkas HTML5 Semantik utama
├── style.css                   # Gaya CSS Modern & Responsive (Mobile-First)
├── README.md                   # Dokumentasi resmi proyek UTS
└── assets/
    └── js/
        ├── main.js             # Entry Point & Controller Utama
        └── modules/
            ├── lahan_service.js  # Data Service, Dataset, & HOF Logic
            ├── form_validator.js # Modul Validasi Form & Error State
            └── ui_renderer.js    # Modul Render DOM Tabel & Cards Grid
```

---

##  Penjelasan Arsitektur Modul JavaScript

* **`lahan_service.js`**: Bertindak sebagai penyedia data memori (*Data Layer*) dan fungsi logika bisnis menggunakan HOF (`.filter()`, `.reduce()`, `.map()`).
* **`form_validator.js`**: Menangani aturan validasi input data lahan, memeriksa kelayakan nilai, dan merender indikator error visual.
* **`ui_renderer.js`**: Bertanggung jawab penuh terhadap manipulasi hierarki DOM, merender baris tabel, memperbarui statistik dashboard, serta membuat elemen *card* dinamis.
* **`main.js`**: Pengendali utama (*Controller*) yang mengintegrasikan event listener (`submit`, `input`, `change`, `click`) dengan seluruh modul lainnya.

---

##  Cara Menjalankan Proyek

1. **Kloning Repositori**:
   ```bash
   git clone https://github.com/muyo-cmd/uts-frontend-lahan.git
   ```
2. **Buka di Visual Studio Code**:
   Buka folder proyek `uts-frontend-lahan` di VS Code.
3. **Jalankan menggunakan Live Server**:
   * Klik kanan pada file `index.html` $\rightarrow$ pilih **Open with Live Server**.
   * Atau buka peramban dan akses alamat lokal `http://127.0.0.1:5500/index.html`.
   *(Catatan: ES Modules memerlukan web server lokal dan tidak dapat berjalan dengan cara double-click file HTML secara langsung).*

---

##  Lisensi & Hak Cipta

Dipublikasikan untuk memenuhi Ujian Tengah Semester (UTS) Ganjil T.A. 2026/2027 — STIKOM PGRI Banyuwangi.