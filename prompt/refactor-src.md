# Refactoring src folder

Tolong lakukan pemindaian penuh pada folder src/ di proyek React saya ini. Tujuan utamanya adalah Refactoring dan menerapkan Separation of Concerns.

Tolong berikan laporan yang berisi 3 hal berikut:

1. Duplikasi UI Tailwind: Cari elemen UI yang class Tailwind-nya sering diulang-ulang (seperti button, badge, atau card) yang seharusnya bisa diekstrak menjadi satu Reusable Component murni di folder components/.

2. Ekstraksi Custom Hook: Cari file halaman (pages/) atau komponen besar yang masih mencampur urusan pengambilan data (API/Axios) dan state management dengan urusan render UI. Sarankan bagian mana yang harus dipindah menjadi Custom Hook di folder hooks/.

3. Fungsi Utilitas: Cari kalkulasi matematika, formatting teks/angka, atau logika berulang lainnya yang sebaiknya dipindah ke folder lib/ atau utils/.

Jangan langsung ubah kodenya. Berikan saya laporannya terlebih dahulu dalam bentuk daftar (bullet points) lengkap dengan nama file-nya.