interface Step {
  number: string;
  label: string;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    number: "01",
    label: "DAFTAR",
    title: "Buat Akun Gratis",
    description: "Daftar hanya dengan email dan kata sandi. Tidak perlu kartu, modal, atau dokumen identitas finansial.",
  },
  {
    number: "02",
    label: "PROFIL RISIKO",
    title: "Kenali Toleransi Mentalmu",
    description: "Isi kuesioner psikologis singkat untuk mengetahui batasan risiko dan gaya investasi yang paling tidak membuatmu stres.",
  },
  {
    number: "03",
    label: "BUAT DOMPET",
    title: "Buat Dompet Investasi",
    description: "Daftarkan dompet untuk setiap strategi: pilahkan saham blue-chip, growth, atau dividen.",
  },
  {
    number: "04",
    label: "AKSI SIMULASI",
    title: "Praktikkan Keputusan Rasional",
    description: "Latih mentalmu menghadapi pasar nyata dengan saldo virtual. Bangun kebiasaan logis, bukan emosional.",
  },
];