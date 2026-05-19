import { Wallet, LineChart, PieChart, ShoppingCart } from "lucide-react";
import profilRisikoImg from "../../../../assets/images/landing-page/profil-risiko.png";
import tableImg from "../../../../assets/images/landing-page/table.png";
import alokasiImg from "../../../../assets/images/landing-page/alokasi.png";
import simulasiImg from "../../../../assets/images/landing-page/Simulasi.png";

export const FEATURES = [
  {
    icon: Wallet,
    title: "Sistem Kantong (Sub-Dompet)",
    description: "Pisahkan strategi investasimu dengan membuat beberapa dompet. Setiap transaksi beli & jual hanya bisa dilakukan di dalam sub-dompet — persis seperti investor profesional mengelola portofolio.",
    image: profilRisikoImg,
  },
  {
    icon: LineChart,
    title: "Data Saham Real-Time",
    description: "Harga dan pergerakan saham dari pasar nyata. Belajar membaca chart dan memahami volatilitas tanpa uang asli yang terancam.",
    image: tableImg,
  },
  {
    icon: PieChart,
    title: "Alokasi Pintar",
    description: "Rekomendasi alokasi saham berdasarkan profil risikomu. Sistem menyarankan komposisi portofolio yang optimal — kamu tinggal setujui dan eksekusi.",
    image: alokasiImg,
  },
  {
    icon: ShoppingCart,
    title: "Keranjang Simulasi",
    description: "Beli kombinasi saham sekaligus seperti keranjang belanja e-commerce. Preview portofolio sebelum eksekusi transaksi.",
    image: simulasiImg,
  },
];