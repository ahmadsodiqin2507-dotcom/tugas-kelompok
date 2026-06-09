# 💰 Pinjaman Online - Platform Pinjaman Uang Digital

Website pinjaman online yang modern dengan admin panel dan user dashboard. Sistem ini memungkinkan pengguna untuk mengajukan pinjaman dan admin untuk mengelola permohonan pinjaman.

## 🎯 Fitur Utama

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

## 📋 Data Storage

Aplikasi menggunakan **JSON files** sebagai database:

```
data/
├── users.json       # Data pengguna dan admin
├── loans.json       # Data pinjaman
└── payments.json    # Data pembayaran
```

## 🚀 Instalasi & Setup

### Prerequisites:
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi:

1. **Clone atau buka repository:**
```bash
cd /workspaces/tugas-kelompok
```

2. **Install dependencies:**
```bash
npm install
```

3. **Jalankan server:**
```bash
npm start
```

4. **Akses aplikasi:**
```
http://localhost:3000
```

## 👤 Demo Account

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
├── src/
│   └── server.js           # Backend Express server
├── public/
│   ├── index.html          # Halaman login
│   ├── user-dashboard.html # Dashboard user
│   ├── admin-dashboard.html # Dashboard admin
│   ├── app.js             # Utility functions
│   └── style.css          # CSS styling
├── data/
│   ├── users.json         # Database pengguna
│   ├── loans.json         # Database pinjaman
│   └── payments.json      # Database pembayaran
├── package.json           # NPM dependencies
└── README.md             # Dokumentasi ini
```

## 🔄 API Endpoints

### Authentication:
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### User Pinjaman:
- `GET /api/loans/user/:userId` - Get pinjaman user
- `POST /api/loans` - Submit pinjaman baru
- `POST /api/payments` - Submit pembayaran

### Admin Pinjaman:
- `GET /api/admin/loans` - Get semua pinjaman
- `PUT /api/admin/loans/:id/approve` - Approve pinjaman
- `PUT /api/admin/loans/:id/reject` - Reject pinjaman
- `GET /api/admin/stats` - Get statistik

### Admin Pengguna:
- `GET /api/admin/users` - Get semua pengguna

## 🎨 UI/UX Features

- 🌈 **Modern Design:** Gradient colors dan smooth animations
- 📱 **Responsive:** Bekerja sempurna di desktop, tablet, dan mobile
- ⚡ **Fast Performance:** Optimized CSS dan minimal JavaScript
- 🎯 **User Friendly:** Navigasi intuitif dan form yang mudah digunakan
- 📊 **Visual Stats:** Dashboard dengan card statistik yang menarik
- 🔐 **Secure:** Session management dengan localStorage

## 💡 Fitur Kalkulator Pinjaman

Kalkulator otomatis menampilkan:
- Jumlah pinjaman yang diajukan
- Bunga tahunan (berdasarkan durasi)
- Total dengan bunga
- Cicilan per bulan

Contoh:
- Pinjam: Rp 5.000.000
- Durasi: 12 bulan
- Bunga: 12% per tahun
- Total dengan bunga: Rp 5.600.000
- Cicilan/bulan: Rp 466.667

## 🔐 Keamanan

- ✅ Password check pada login
- ✅ Role-based access control (RBAC)
- ✅ Session management dengan localStorage
- ✅ Validasi input pada semua form
- ✅ Data separation antara user dan admin

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🛠️ Teknologi

**Frontend:**
- HTML5
- CSS3 (with variables dan grid/flexbox)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- File System (untuk JSON database)
- CORS middleware

**Database:**
- JSON files (users.json, loans.json, payments.json)

## 📝 Catatan Pengembangan

### Fitur yang Bisa Ditambahkan:
- [ ] Integrasi dengan database SQL (MySQL/PostgreSQL)
- [ ] Email notification untuk approval/rejection
- [ ] Payment gateway integration
- [ ] Two-factor authentication
- [ ] Loan calculator dengan berbagai skenario
- [ ] Export laporan ke PDF
- [ ] Dashboard analytics lebih detail
- [ ] System untuk cicilan otomatis
- [ ] Interest calculation lebih kompleks
- [ ] User verification/KYC process

## 📄 License

Bebas digunakan untuk keperluan pembelajaran dan bisnis.

## 👨‍💻 Author

Created for educational purposes - Platform Pinjaman Online

---

**Selamat menggunakan! 🎉**

Jika ada pertanyaan atau saran, silakan hubungi administrator.