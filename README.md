# 🎓 SIAKAD - Dashboard Data Mahasiswa & Akademik

> **Tugas Responsi 1: Pemrograman Fullstack**  
> **Universitas 'Aisyiyah Yogyakarta**  
> **Dosen Pengampu**: Wildan Muhammad Ardana, S.Kom., M.Kom.  
> 
> **Identitas Mahasiswa**:
> - **Nama**: UMAR  
> - **NIM**: 2511501006  
> - **Program Studi**: Teknologi Informasi  
> - **Studi Kasus 2**: Dashboard Data Mahasiswa & Akademik  

---

## 📌 Deskripsi Proyek

Proyek ini adalah aplikasi **Dashboard Admin Akademik (SIAKAD)** berbasis web modern yang menerapkan operasi **CRUD (Create, Read, Update, Delete)** lengkap secara *client-side* tanpa basis data SQL, memanfaatkan penyimpanan lokal (*LocalStorage*).

Aplikasi ini dibangun untuk mengintegrasikan secara penuh 6 materi perkuliahan Pemrograman Fullstack:
1. **HTML Dasar & Semantik**: Struktur semantik halaman admin (`<aside>`, `<header>`, `<main>`, `<footer>`), form input terstruktur, tabel data, serta elemen modal dialog.
2. **CSS Styling & Responsive**: Skema warna khas institusi akademik modern, tipografi bersih, transisi/animasi halus saat hover, dan dukungan *media query* untuk tampilan responsif di desktop, tablet, maupun ponsel pintar.
3. **Bootstrap CSS**: Memanfaatkan utility classes (`container-fluid`, `row`, `col`, `shadow-sm`, `rounded-4`), sistem grid responsif, serta komponen siap pakai (`Card`, `Navbar`, `Table`, `Modal`, `Button`, `Badge`, `Toast`).
4. **JavaScript Dasar**: Penggunaan tipe data, *Array of Objects* untuk menampung entitas mahasiswa dan mata kuliah, fungsi-fungsi modular, serta percabangan logika (*if/else* & *ternary*).
5. **DOM JavaScript & jQuery**: Manipulasi elemen DOM secara dinamis, penangkapan aksi pengguna melalui *event listener*, serta efek jQuery (*fade-in animation* pada tabel saat filter berubah dan interaksi buka-tutup sidebar).
6. **React JS (React 19)**: Arsitektur berbasis komponen (`App`, `Sidebar`, `Navbar`, `StatCards`, `StudentTable`, `StudentModal`, `GradeModal`, `DeleteModal`), reaktifitas *state* menggunakan `useState` dan `useEffect`.

---

## ✨ Fitur-Fitur Utama

### 1. Operasi CRUD Lengkap
- **Create (Tambah Mahasiswa)**: Modal formulir pendaftaran mahasiswa baru dengan validasi input (NIM unik, Nama, Program Studi, Semester, IPK, Status, Gender, Email, dan Dosen PA).
- **Read (Tampil Data Mahasiswa)**: Tabel data terstruktur menampilkan NIM, Avatar inisial, Nama, Program Studi, Semester, Badge IPK, dan Status Aktif.
- **Update (Edit Data Mahasiswa)**: Modal formulir pembaruan data akademik mahasiswa yang terisi otomatis.
- **Delete (Hapus Mahasiswa)**: Modal konfirmasi pengamanan sebelum data mahasiswa dihapus dari daftar.

### 2. Fitur Khusus: Modal Form Input Nilai / KHS
Sesuai panduan studi kasus, aplikasi dilengkapi modal khusus untuk:
- Menginputkan mata kuliah baru beserta SKS dan nilai huruf (A, A-, B+, B, B-, C+, C, D, E).
- **Kalkulasi Otomatis IPK & SKS**: Sistem secara otomatis menghitung ulang bobot IPK dan total SKS mahasiswa secara real-time berdasarkan rumus akademik:
  $$\text{IPK} = \frac{\sum (\text{SKS} \times \text{Bobot})}{\sum \text{SKS}}$$

### 3. Lencana (Badge) Predikat IPK & Status
- 🟣 **Cumlaude**: IPK $\ge 3.75$ (Lencana ungu berikon bintang).
- 🟢 **Sangat Memuaskan**: $3.50 \le \text{IPK} < 3.75$ (Lencana hijau berikon centang).
- 🔵 **Memuaskan**: $\text{IPK} < 3.50$ (Lencana biru informatif).
- **Status Akademik**: Badge berwarna untuk status **Aktif** (Hijau), **Cuti** (Kuning), **Lulus** (Biru), dan **Non-Aktif** (Merah).

### 4. Filter Pencarian & Pengurutan (Sorting)
- **Live Search**: Pencarian instan berdasarkan NIM atau Nama mahasiswa.
- **Filter Program Studi**: Menyaring berdasarkan Teknologi Informasi, Sistem Informasi, Bioteknologi, dll.
- **Filter Status**: Menyaring berdasarkan status Aktif, Cuti, Lulus, atau Non-Aktif.
- **Pengurutan (Sort)**: Berdasarkan NIM, Nama (A-Z), IPK Tertinggi, atau IPK Terendah.

### 5. Ringkasan Statistik (Stat Cards)
- Total Mahasiswa Terdaftar
- Jumlah Mahasiswa Aktif
- Rata-rata IPK Seluruh Mahasiswa
- Jumlah Kandidat Lulusan Cumlaude

### 6. Penyimpanan Data Lokal (LocalStorage)
Data akademik dan KHS tersimpan secara otomatis pada *browser LocalStorage* (`unisa_siakad_students`), sehingga seluruh data tetap tersimpan saat halaman dimuat ulang (*refresh*).

---

## 🛠️ Teknologi yang Digunakan

- **React JS** `v19.3.1` (Frontend Library)
- **Vite** `v8.3.6` (Next Generation Frontend Tooling)
- **Bootstrap** `v5.3.8` (CSS Framework)
- **React-Bootstrap** `v2.10.10` (React UI Components)
- **Bootstrap Icons** `v1.11.3` (Icon Library)
- **jQuery** `v3.7.1` (DOM Manipulation & Animation)

---

## 📁 Struktur Direktori

```text
responsi-data-mahasiswa/
├── public/
├── src/
│   ├── components/
│   │   ├── DeleteModal.jsx     # Modal konfirmasi hapus data
│   │   ├── GradeModal.jsx      # Modal form input nilai KHS & kalkulator IPK
│   │   ├── Navbar.jsx          # Topbar navigasi & aksi cepat
│   │   ├── Sidebar.jsx         # Sidebar admin & identitas pembuat (Umar)
│   │   ├── StatCards.jsx       # Kartu statistik ringkasan akademik
│   │   ├── StudentModal.jsx    # Modal form tambah & edit mahasiswa
│   │   └── StudentTable.jsx    # Tabel daftar mahasiswa & filter pencarian
│   ├── utils/
│   │   └── dummyData.js        # Data awal mahasiswa UNISA (Umar & rekan)
│   ├── App.css                 # Custom CSS & tema warna responsif
│   ├── App.jsx                 # State management utama, CRUD, & jQuery
│   ├── index.css               # Styling dasar
│   └── main.jsx                # Entry point aplikasi
├── index.html                  # HTML template
├── package.json                # Dependensi proyek
├── vite.config.js              # Konfigurasi Vite
└── README.md                   # Dokumentasi resmi responsi
```

---



*Disusun oleh: **UMAR (NIM: 2511501006)** — Program Studi Teknologi Informasi, Universitas 'Aisyiyah Yogyakarta.*

