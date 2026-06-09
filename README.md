# 💰 Pinjaman Online - Platform Pinjaman Uang Digital

Website pinjaman online yang modern dengan admin panel dan user dashboard. **Ini adalah website STATIC yang tidak perlu npm start** - bisa dibuka langsung di browser atau di GitHub Pages!

## ✨ Fitur Utama

### Untuk User:
- ✅ Login/Logout dengan sistem autentikasi
- ✅ Dashboard dengan statistik pinjaman
- ✅ Mengajukan pinjaman baru dengan kalkulator cicilan otomatis
- ✅ Melihat riwayat pinjaman dan status permohonan
- ✅ Melihat riwayat pembayaran
- ✅ Profil pengguna
- ✅ Bunga otomatis berdasarkan durasi pinjaman:
  - 12% untuk durasi ≤ 12 bulan
  - 15% untuk durasi > 12 bulan

### Untuk Admin:
- ✅ Dashboard dengan statistik lengkap
- ✅ Kelola semua permohonan pinjaman
- ✅ Menyetujui atau menolak pinjaman
- ✅ Melihat detail pinjaman dan pembayaran
- ✅ Manajemen pengguna
- ✅ Filter pinjaman berdasarkan status (pending, approved, rejected)
- ✅ Statistik real-time (total pinjam, total dibayar, dll)

## 🚀 Setup & Cara Menjalankan

### Opsi 1: Buka Langsung di Browser
Cukup buka file `public/index.html` di browser - tidak perlu npm install atau npm start!

```bash
# Ekstrak project
cd /workspaces/tugas-kelompok/public

# Buka index.html dengan browser
# File > Open atau buka langsung dari file manager
```

### Opsi 2: Pakai Live Server (VS Code)
1. Install extension **Live Server** di VS Code
2. Right-click pada `public/index.html`
3. Pilih "Open with Live Server"

### Opsi 3: Python Simple HTTP Server
```bash
cd /workspaces/tugas-kelompok/public
python3 -m http.server 8000
# Buka di browser: http://localhost:8000
```

### Opsi 4: Deploy ke GitHub Pages
1. Push ke GitHub dengan folder `public`
2. Setting repository → Pages → Source: `/ (root)` atau `/public`
3. Website akan live di: `https://username.github.io/tugas-kelompok`

## 📋 Database Storage

Aplikasi menggunakan **Static Data + localStorage** (tidak ada backend server):

```
public/
├── db.js       # Static database dengan semua data
├── index.html  # Halaman login
├── user-dashboard.html    # Dashboard user
├── admin-dashboard.html   # Dashboard admin
├── app.js     # Utility functions
└── style.css  # Styling
```

**Catatan:** Data disimpan di **localStorage browser** - data akan hilang jika cache dibersihkan. Untuk persistent storage, upgrade ke backend database.

## 👤 Demo Account

Semua data tersimpan di `db.js` - login dengan akun berikut:

### Admin:
- **Username:** `admin`
- **Password:** `admin123`

### User 1:
- **Username:** `john`
- **Password:** `john123`

### User 2:
- **Username:** `jane`
- **Password:** `jane123`

## 📁 Struktur Project

```
tugas-kelompok/
├── public/                  # Folder website static
│   ├── index.html          # Halaman login
│   ├── user-dashboard.html # Dashboard user
│   ├── admin-dashboard.html # Dashboard admin
│   ├── db.js              # Database statis
│   ├── app.js             # Utility functions
│   └── style.css          # Styling modern & responsive
│
├── data/                    # (Tidak digunakan, untuk referensi)
│   ├── users.json
│   ├── loans.json
│   └── payments.json
│
├── src/                     # (Tidak digunakan, backend lama)
│   └── server.js
│
└── README.md
```

## 🎨 UI/UX Features

- 🌈 **Modern Design:** Gradient colors dan smooth animations
- 📱 **Responsive:** Bekerja sempurna di desktop, tablet, dan mobile
- ⚡ **Fast Performance:** No backend needed - instant loading
- 🎯 **User Friendly:** Navigasi intuitif dan form yang mudah digunakan
- 📊 **Visual Stats:** Dashboard dengan card statistik yang menarik
- 🔐 **Secure:** Session management dengan localStorage
- 🚀 **Static Website:** Bisa di-host di GitHub Pages gratis!

## 💡 Fitur Kalkulator Pinjaman

Kalkulator otomatis menampilkan:
- Jumlah pinjaman yang diajukan
- Bunga tahunan (berdasarkan durasi)
- Total dengan bunga
- Cicilan per bulan

**Contoh:**
- Pinjam: Rp 5.000.000
- Durasi: 12 bulan
- Bunga: 12% per tahun
- Total dengan bunga: Rp 5.600.000
- Cicilan/bulan: Rp 466.667

## 🔐 Keamanan & Catatan

- ✅ Password check pada login
- ✅ Role-based access control (RBAC)
- ✅ Session management dengan localStorage
- ✅ Validasi input pada semua form
- ✅ Data separation antara user dan admin

**⚠️ PENTING:**
- Data hanya disimpan di browser (localStorage)
- Jika user clear cache/cookies, data akan hilang
- Untuk production, upgrade ke database SQL (MySQL/PostgreSQL)
- Password disimpan di plain text (hanya untuk demo)

## 📱 Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Teknologi

**Frontend (100% Static):**
- HTML5
- CSS3 (dengan variables, grid, flexbox)
- Vanilla JavaScript (ES6+)
- localStorage API

**Database:**
- JavaScript Object dalam db.js
- Browser localStorage

**No Backend Required:** 🎉

## 📝 Update & Maintenance

Untuk menambah data pengguna atau pinjaman:
1. Edit file `public/db.js`
2. Tambah di array `DB.users` atau `DB.loans`
3. Save dan refresh browser

## 🚀 Fitur yang Bisa Ditambahkan

- [ ] Integrasi dengan Firebase untuk persistent database
- [ ] Export data ke PDF/Excel
- [ ] Email notification
- [ ] Payment gateway integration (Stripe, Midtrans)
- [ ] Two-factor authentication
- [ ] Advanced analytics & charts
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Mobile app version

## 📄 License

Bebas digunakan untuk keperluan pembelajaran dan bisnis.

## 👨‍💻 Author

Created for educational purposes - Platform Pinjaman Online (Static Version)

---

**🎉 Selesai! Website siap digunakan tanpa backend server!**

Untuk questions atau saran, silakan create issue di GitHub.
