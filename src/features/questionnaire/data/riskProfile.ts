import turtleImg from "@/assets/profile/Kura-Kura.png";
import hippoImg from "@/assets/profile/Kudanil.png";
import capybaraImg from "@/assets/profile/Capibara.png";
import wolfImg from "@/assets/profile/Serigala.png";
import lionImg from "@/assets/profile/Singa.png";

export const RISK_PROFILES = {
  turtle: {
    label: "Kura-kura",
    image: turtleImg,
    description:
      "Bagaikan kura-kura, ketenangan adalah segalanya. Tipe ini memilih langkah yang minim risiko serta menjaga kestabilan untuk menghindari kerugian, bahkan jika harus mengalami pertumbuhan yang lebih lambat.",
  },
  hippo: {
    label: "Kuda Nil",
    image: hippoImg,
    description:
      "Bagaikan kuda nil, tenang di permukaan dan kuat menjaga arah. Tipe ini mengutamaka a n keamanan, tetapi tetap membuka diri terhadap peluang. Mereka tidak gegabah dalam mengambil keputusan, tetapi cukup berani mencoba selama risikonya masih terkendali.",
  },
  capybara: {
    label: "Capybara",
    image: capybaraImg,
    description:
      "Bagaikan kapibara, sabar dan seimbang dalam setiap langkah. Tipe ini mampu menjaga keseimbangan antara keamanan dan peluang. Mereka tidak mudah panik saat kondisi berubah serta cukup fleksibel dalam menyesuaikan strategi untuk pertumbuhan yang stabil.",
  },
  wolf: {
    label: "Serigala",
    image: wolfImg,
    description:
      "Bagaikan serigala, lincah dan tajam dalam menangkap peluang. Tipe ini berani melangkah lebih jauh dengan perhitungan yang matang. Mereka aktif mencari peluang untuk mendapatkan hasil yang lebih tinggi dan tidak ragu menghadapi risiko yang menyertainya.",
  },
  lion: {
    label: "Singa",
    image: lionImg,
    description:
      "Bagaikan singa, gagah dan berani dalam menaklukkan peluang. Tipe ini memiliki ambisi besar dan keberanian tinggi dalam mengambil keputusan. Mereka tidak ragu menghadapi risiko demi mendapatkan hasil maksimal serta siap menghadapi dinamika pasar yang tajam.",
  },
};

export type RiskProfileKey = keyof typeof RISK_PROFILES;