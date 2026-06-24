export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: "home" | "building" | "plug" | "database";
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatarUrl: string;
  role: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  alt: string;
}

// Static Data
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Sedot WC Rumah / Pribadi",
    description: "Layanan sedot WC untuk rumah, ruko, dan tempat tinggal lainnya secara cepat, bersih, dan higienis.",
    iconName: "home",
  },
  {
    id: "serv-2",
    title: "Sedot WC Perusahaan / Instansi",
    description: "Melayani kebutuhan sedot WC skala besar untuk perkantoran, pabrik, sekolah, rumah ibadah, dan instansi.",
    iconName: "building",
  },
  {
    id: "serv-3",
    title: "WC Mampet & Saluran Tersumbat",
    description: "Mengatasi WC tersumbat, wastafel mampet, dan pipa pembuangan air kotor terhambat tanpa bongkar.",
    iconName: "plug",
  },
  {
    id: "serv-4",
    title: "Perawatan Septic Tank",
    description: "Perawatan rutin, renovasi septic tank, resapan baru, serta detoksifikasi bakteri agar tetap aman dan tidak bermasalah.",
    iconName: "database",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Bapak Ahmad Rifai",
    rating: 5,
    comment: "Sangat puas dengan layanannya! Petugas datang tepat waktu, pengerjaannya cepat sekali, dan area sekitar dibersihkan kembali setelah selesai. WC mampet langsung beres. Sangat direkomendasikan!",
    avatarUrl: "/src/assets/images/buat_gambar_Bapak_Ahmad_Rifai_202606250100.jpeg",
    role: "Pemilik Rumah (Jakarta)",
  },
  {
    id: "test-2",
    name: "Ibu Indah Permata",
    rating: 5,
    comment: "Septic tank penuh di ruko kami langsung diatasi di hari yang sama. Timnya ramah, profesional, dan menjelaskan semuanya secara transparan. Harganya juga sangat terjangkau dibanding yang lain.",
    avatarUrl: "/src/assets/images/buat_gambar_Ibu_Indah_Permata_202606250105.jpeg",
    role: "Pemilik Ruko (Depok)",
  },
  {
    id: "test-3",
    name: "Bapak Hendra Wijaya",
    rating: 5,
    comment: "Respons sangat cepat saat dihubungi malam hari. Saluran wastafel yang mampet berhari-hari langsung tuntas dalam waktu kurang dari 1 jam menggunakan peralatan modern mereka. Hebat!",
    avatarUrl: "/src/assets/images/buat_gambar_Bapak_Hendra_Wijaya_202606250109.jpeg",
    role: "Manajer Restoran (Tangerang)",
  },
];

// We will use the dynamically generated assets for the gallery
export const GALLERY_DATA = [
  {
    id: "gal-1",
    imageUrl: "/src/assets/images/worker_septic_cleaning_1782320642146.jpg",
    title: "Pembersihan Septic Tank",
    alt: "Petugas ahli sedang melakukan pembersihan septic tank perumahan.",
  },
  {
    id: "gal-2",
    imageUrl: "/src/assets/images/drain_cleaning_equipment_1782320659169.jpg",
    title: "Peralatan Modern High-Pressure",
    alt: "Mesin pompa vakum modern bertenaga tinggi untuk hasil tuntas.",
  },
  {
    id: "gal-3",
    imageUrl: "/src/assets/images/manhole_maintenance_1782320672772.jpg",
    title: "Perawatan Saluran & Manhole",
    alt: "Pengecekan dan penyedotan saluran pipa pembuangan kotoran.",
  },
];

export const CONTACT_PHONE = "085882448632";
export const CONTACT_PHONE_DISPLAY = "085882448632";
export const WA_URL = `https://wa.me/6285882448632?text=Halo%20Sedot%20WC%20Prima%20Jaya%2C%20saya%20tertarik%20dengan%20layanan%20Anda.`;
