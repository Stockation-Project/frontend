# 🚨 PROTOKOL KEAMANAN KODE & MIGRASI ARSITEKTUR (WAJIB DIBACA) 🚨

Sebagai AI Agent yang membantu pengembangan proyek Stockation, Anda dilarang keras merusak stabilitas aplikasi yang sudah berjalan. Saat melakukan pembuatan fitur baru atau migrasi ke arsitektur *Feature-Based*, Anda WAJIB mematuhi aturan-aturan mutlak berikut:

## 1. ZERO DELETION POLICY (Kebijakan Anti-Hapus)
- **JANGAN PERNAH** menghapus (*delete/rm*) file apapun yang sudah ada di dalam proyek, terutama di dalam folder `src/hooks/`, `src/types/`, `src/services/`, atau `src/components/global/`.
- Jika Anda merasa sebuah file sudah usang (*obsolete*) karena migrasi, biarkan file tersebut tetap di sana. Keputusan untuk menghapus file lama hanya boleh dilakukan oleh User secara manual.

## 2. REFACTOR BY ADDITION (Modifikasi Aman)
- Saat memigrasikan logika dari folder global ke dalam folder `src/features/...`, lakukan penyalinan kode (*Copy*), bukan pemindahan destruktif (*Cut/Move* yang merusak file asal tanpa memperbaiki *import*).
- Jangan pernah mengubah *return value* (nilai kembalian) dari sebuah *Custom Hook* lama yang sudah berjalan, karena komponen lain di luar jangkauan Anda mungkin sedang bergantung pada data tersebut.

## 3. PRESERVASI TIPE DATA (Strict Typescript)
- Jangan menghapus, mengganti nama properti, atau mengubah struktur `interface` dan `type` pada file di dalam folder `src/types/`. 
- Jika fitur baru di dalam `src/features/` membutuhkan tipe data dengan struktur yang sedikit berbeda, BUAT `interface` baru di dalam folder fitur tersebut (misal: `src/features/wallet/types/wallet.ts`) dan lakukan *mapping*, JANGAN mengubah tipe data global yang sudah ada.

## 4. RESOLUSI IMPORT YANG AMAN
- Jika Anda memindahkan komponen atau fungsi, pastikan Anda juga memperbarui SEMUA jalur *import* (`import ... from '...'`) di file lain yang menggunakan komponen/fungsi tersebut. 
- Jangan pernah membiarkan aplikasi dalam status *error compilation* akibat "Module not found".

## KONFIRMASI EKSEKUSI
Sebelum Anda mengeksekusi penulisan kode atau perubahan struktur folder, berikan ringkasan (bullet points) tentang file apa saja yang akan Anda BACA dan file baru apa yang akan Anda BUAT. **Tunggu persetujuan (approval) dari saya sebelum mulai menulis/memodifikasi kode.**

## Penting
Tetap baca juga file-file berikut sebelum mengeksekusi task:
- requirements.md
- ai-agent-rules.md (General Rules)
- prompt/feature-specific-rules.md (Feature Specific Rules)