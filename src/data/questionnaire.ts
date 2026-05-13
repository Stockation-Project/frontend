// src/data/questionnaire.ts

export interface AnswerQuestion {
  id: string;
  text: string;
  point: number;
}

export interface Question {
  id: number;
  question: string;
  subtitle?: string;
  options: AnswerQuestion[];
}

export const riskQuestions: Question[] = [
  {
    id: 1,
    question:
      "Bagaimana sahabat Anda mendeskripsikan Anda sebagai seorang pengambil risiko?",
    subtitle: "Pilih yang paling menggambarkan dirimu.",
    options: [
      { id: "1a", text: "Suka mengambil risiko", point: 4 },
      {
        id: "1b",
        text: "Baru mengambil risiko setelah berpikir panjang",
        point: 3,
      },
      { id: "1c", text: "Waspada terhadap risiko", point: 2 },
      { id: "1d", text: "Penakut dalam mengambil risiko", point: 1 },
    ],
  },
  {
    id: 2,
    question:
      "Anda berada di suatu acara game di TV dan dapat memilih salah satu kotak hadiah. Mana yang akan Anda pilih?",
    subtitle: "Pilih kotak hadiah yang paling sesuai dengan insting Anda.",
    options: [
      {
        id: "2a",
        text: "Kotak terbuka berisi uang tunai sebesar 5 juta rupiah.",
        point: 1,
      },
      {
        id: "2b",
        text: "Kotak tertutup dengan 50% kemungkinan berisi 10 juta rupiah.",
        point: 2,
      },
      {
        id: "2c",
        text: "Kotak tertutup dengan kemungkinan 25% berisi 25 juta rupiah",
        point: 3,
      },
      {
        id: "2d",
        text: "Kotak tertutup dengan kemungkinan 5% berisi 50 juta rupiah",
        point: 4,
      },
    ],
  },
  {
    id: 3,
    question:
      "Anda baru selesai menabung dan berencana pergi berlibur ke tempat yang paling ingin Anda kunjungi seumur hidup. Tiga minggu sebelum berangkat, Anda tiba-tiba dipecat. Apa yang akan Anda lakukan?",
    subtitle: "Situasi tak terduga terjadi. Apa prioritas Anda saat ini?",
    options: [
      { id: "3a", text: "Membatalkan liburan", point: 4 },
      {
        id: "3b",
        text: "Pergi liburan dengan budget yang lebih sedikit",
        point: 3,
      },
      {
        id: "3c",
        text: "Pergi liburan dengan alasan mengulur waktu untuk persiapan mencari pekerjaan baru",
        point: 2,
      },
      {
        id: "3d",
        text: "Pergi dan menambah waktu liburan karena “hidup hanya satu kali”",
        point: 1,
      },    
    ],
  },
  {
    id: 4,
    question:
      "Anda tiba-tiba mendapatkan uang sebesar 300 juta khusus untuk investasi. Apa yang akan Anda lakukan?",
    subtitle:
      "Bayangkan Anda memiliki modal besar, ke mana Anda akan mengalokasikannya?",
    options: [
      {
        id: "4a",
        text: "Menyimpannya di bank, pasar uang, atau deposito berjangka",
        point: 1,
      },
      {
        id: "4b",
        text: "Menginvestasikannya ke reksa dana atau obligasi yang aman",
        point: 2,
      },
      { id: "4c", text: "Menginvestasikannya pada saham", point: 3 },
    ],
  },
  {
    id: 5,
    question:
      "Sejauh pengalaman Anda, seberapa santai Anda dalam berinvestasi pada saham atau reksa dana?",
    subtitle: "Jujurlah pada tingkat kenyamanan emosional Anda.",
    options: [
      { id: "5a", text: "Tidak santai sama sekali", point: 1 },
      { id: "5b", text: "Santai-santai saja", point: 2 },
      { id: "5c", text: "Sangat santai", point: 3 },
    ],
  },
  {
    id: 6,
    question:
      "Ketika mendengar kata “risiko”, apa yang muncul di pikiran Anda?",
    subtitle: "Kata apa yang pertama kali terlintas di benak Anda?",
    options: [
      { id: "6a", text: "Kehilangan", point: 1 },
      { id: "6b", text: "Ketidakpastian", point: 2 },
      { id: "6c", text: "Kesempatan", point: 3 },
      { id: "6d", text: "Menegangkan/mendebarkan", point: 4 },
    ],
  },
  {
    id: 7,
    question:
      "Saat ini, sebagian besar investasi Anda ada di produk aman (seperti obligasi pemerintah). Terdapat prediksi bahwa harga emas dan properti lain akan naik, sementara investasi Anda sekarang mungkin turun. Apa yang akan Anda lakukan?",
    subtitle:
      "Bagaimana Anda merespons peluang di tengah potensi penurunan nilai?",
    options: [
      { id: "7a", text: "Tetap mempertahankan investasi sekarang", point: 1 },
      {
        id: "7b",
        text: "Menjual investasi sekarang, menempatkan setengah hasil ke pasar uang dan setengah ke emas/properti",
        point: 2,
      },
      {
        id: "7c",
        text: "Menjual seluruh investasi lalu memindahkannya ke emas/properti",
        point: 3,
      },
      {
        id: "7d",
        text: "Menjual seluruh investasi lalu menambah pinjaman untuk investasi lebih banyak di emas/properti",
        point: 4,
      },
    ],
  },
  {
    id: 8,
    question: "Investasi dengan konsekuensi mana yang Anda pilih?",
    subtitle: "Pertimbangkan batas toleransi kerugian Anda.",
    options: [
      {
        id: "8a",
        text: "Keuntungan terbaik 500 ribu; kemungkinan terburuk tidak untung dan tidak rugi",
        point: 1,
      },
      {
        id: "8b",
        text: "Keuntungan terbaik 1 juta; kemungkinan terburuk rugi 500 ribu",
        point: 2,
      },
      {
        id: "8c",
        text: "Keuntungan terbaik 4 juta; kemungkinan terburuk rugi 1 juta",
        point: 3,
      },
      {
        id: "8d",
        text: "Keuntungan terbaik 6 juta; kemungkinan terburuk rugi 3 juta",
        point: 4,
      },
    ],
  },
  {
    id: 9,
    question:
      "Jika mendapatkan kesempatan mendapatkan uang tambahan sebesar 2 juta, mana yang akan Anda pilih?",
    subtitle: "Apakah Anda lebih memilih kepastian atau peluang?",
    options: [
      {
        id: "9a",
        text: "Langsung menerima uang sebesar 1 juta tanpa risiko",
        point: 1,
      },
      {
        id: "9b",
        text: "Mendapat kesempatan 50% untuk menerima 1 juta dengan risiko 50% tidak mendapatkan apa-apa",
        point: 3,
      },
    ],
  },
  {
    id: 10,
    question:
      "Anda diberi uang sebesar 2 juta rupiah. Pilihlah salah satu opsi berikut!",
    subtitle: "Bagaimana Anda menghadapi skenario kerugian finansial?",
    options: [
      { id: "10a", text: "Langsung kehilangan uang 500 ribu", point: 1 },
      {
        id: "10b",
        text: "Kemungkinan 50% untuk kehilangan uang 1 juta dan 50% lainnya tidak kehilangan uang sepeserpun.",
        point: 3,
      },
    ],
  },
  {
    id: 11,
    question:
      "Saudaramu memberimu warisan sebesar 100 juta rupiah dengan syarat seluruh uang tersebut kamu investasikan ke salah satu pilihan di bawah. Mana yang akan Anda pilih?",
    subtitle: "Pilih instrumen yang paling sesuai dengan preferensi Anda.",
    options: [
      {
        id: "11a",
        text: "Produk aman seperti tabungan atau reksa dana pasar uang",
        point: 1,
      },
      {
        id: "11b",
        text: "Reksa dana campuran (gabungan saham dan obligasi)",
        point: 2,
      },
      {
        id: "11c",
        text: "Investasi langsung ke beberapa saham perusahaan",
        point: 3,
      },
      {
        id: "11d",
        text: "Komoditas seperti emas, perak, atau minyak",
        point: 4,
      },
    ],
  },
  {
    id: 12,
    question:
      "Jika Anda harus menginvestasikan uang sebesar 20 juta, opsi investasi mana yang menurut Anda paling menarik?",
    subtitle: "Bagaimana Anda membagi keranjang investasi Anda?",
    options: [
      {
        id: "12a",
        text: "60% investasi risiko rendah, 30% investasi risiko moderat, dan 10% investasi risiko tinggi",
        point: 1,
      },
      {
        id: "12b",
        text: "30% investasi risiko rendah, 40% investasi risiko moderat, dan 30% investasi risiko tinggi",
        point: 2,
      },
      {
        id: "12c",
        text: "10% investasi risiko rendah, 40% investasi risiko moderat, dan 50% investasi risiko tinggi",
        point: 3,
      },
    ],
  },
  {
    id: 13,
    question:
      "Beberapa teman yang kamu percaya, salah satunya seorang ahli geologis berpengalaman, mengajak kamu berinvestasi dalam eksplorasi tambang emas dengan peluang keberhasilan sebesar 20%. Jika berhasil, keuntungannya bisa 50 hingga 100 kali lipat dari modal. Jika gagal, keseluruhan modal akan hilang. Berapa banyak uang yang akan Anda investasikan?",
    subtitle:
      "Peluang besar dengan risiko total. Berapa batas keberanian Anda?",
    options: [
      { id: "13a", text: "Tidak ada", point: 1 },
      { id: "13b", text: "Setara gaji 1 bulan", point: 2 },
      { id: "13c", text: "Setara gaji 3 bulan", point: 3 },
      { id: "13d", text: "Setara gaji 6 bulan", point: 4 },
    ],
  },
];
