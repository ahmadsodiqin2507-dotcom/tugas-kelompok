# 🚀 Cara Membuka Website Pinjaman Online

Website ini adalah **STATIC WEBSITE** - tidak perlu npm start! Bisa langsung dibuka di browser.

## ✅ Opsi 1: Buka File HTML Langsung (Termudah)

1. Buka folder `/public/` di file manager
2. Double-click `index.html`
3. Browser akan membuka website automatically
4. Login dengan akun demo:
   - Username: `admin` / `john` / `jane`
   - Password: `admin123` / `john123` / `jane123`

## ✅ Opsi 2: Gunakan Live Server di VS Code

1. Install extension **Live Server** (cari di Extensions)
2. Right-click pada `/public/index.html`
3. Pilih "Open with Live Server"
4. Browser akan membuka di `http://localhost:5500`

## ✅ Opsi 3: Python HTTP Server

```bash
# Buka terminal di folder project
cd /workspaces/tugas-kelompok/public

# Jalankan Python server
python3 -m http.server 8000

# Buka di browser: http://localhost:8000
```

## ✅ Opsi 4: Deploy ke GitHub Pages

1. Push project ke GitHub
2. Go to repository Settings → Pages
3. Source: 
   - Branch: `main`
   - Folder: `/public`
4. Save - website akan live di GitHub Pages

## 👤 Demo Accounts

```
Admin:
Username: admin
Password: admin123

User 1:
Username: john
Password: john123

User 2:
Username: jane
Password: jane123
```

## 📁 File Structure

```
public/           ← Website static disini
├── index.html    ← Login page
├── user-dashboard.html
├── admin-dashboard.html
├── db.js         ← Database
├── app.js        ← Utility functions
├── style.css     ← Styling
```

## ⚠️ Penting

- Data disimpan di **localStorage** (hilang jika cache dibersihkan)
- Tidak ada backend server diperlukan
- Bekerja di semua browser modern
- Responsive di desktop, tablet, dan mobile

## 🎉 Selesai!

Website sudah siap digunakan. Pilih salah satu opsi di atas dan enjoy!
