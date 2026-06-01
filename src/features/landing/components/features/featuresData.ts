import { Wallet, LineChart, PieChart, ShoppingCart } from "lucide-react";
import profilRisikoImg from "../../../../assets/images/landing-page/profil-risiko.png";
import tableImg from "../../../../assets/images/landing-page/table.png";
import alokasiImg from "../../../../assets/images/landing-page/alokasi.png";
import simulasiImg from "../../../../assets/images/landing-page/Simulasi.png";

export const FEATURES = [
  {
    icon: Wallet,
    title: "Sistem Kantong (Sub-Dompet)",
    description: "Latih kedisiplinan dan kontrol emosimu. Pisahkan portofoliomu ke dalam dompet-dompet terisolasi agar kamu tetap rasional dan tidak mudah panik saat pasar bergejolak.",
    image: profilRisikoImg,
  },
  {
    icon: LineChart,
    title: "Data Saham Real-Time",
    description: "Belajar menghadapi volatilitas pasar nyata dengan kepala dingin. Rasakan tekanan dinamika harga secara langsung, namun dengan jaring pengaman tanpa risiko kehilangan uang riil.",
    image: tableImg,
  },
  {
    icon: PieChart,
    title: "Alokasi Pintar",
    description: "Hindari keputusan impulsif. AI kami memberikan rekomendasi komposisi portofolio yang paling sehat dan sesuai dengan tingkat toleransi stres psikologismu.",
    image: alokasiImg,
  },
  {
    icon: ShoppingCart,
    title: "Keranjang Simulasi",
    description: "Rencanakan transaksimu secara logis. Evaluasi dan simulasikan dampak risiko ke portofoliomu sebelum mengambil keputusan akhir.",
    image: simulasiImg,
  },
];