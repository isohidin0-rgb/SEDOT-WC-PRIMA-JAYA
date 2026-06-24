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

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CoverageRegion {
  name: string;
  subareas: string[];
}

export const translationData = {
  id: {
    // Brand / general
    companyName: "PRIMA JAYA",
    tagline: "BERSIH, CEPAT, TUNTAS",
    logoSub: "SEDOT WC",
    ctaCallUs: "HUBUNGI KAMI",
    ctaOrderNow: "Pesan Sekarang",
    ctaCallNow: "Hubungi 24 Jam",
    warranty: "GARANSI",
    trusted: "TERPERCAYA",

    // Header Navigation
    navHome: "Beranda",
    navAbout: "Tentang Kami",
    navServices: "Layanan",
    navBenefits: "Keunggulan",
    navTestimonials: "Testimoni",
    navGallery: "Galeri",
    navCoverage: "Wilayah",
    navFaq: "FAQ",
    navContact: "Kontak",
    callUs24H: "Hubungi Kami 24 Jam",

    // Hero Section
    heroSub: "Jasa Sedot WC Resmi & Terpercaya",
    heroTitle: "SEDOT WC",
    heroDesc: "Layanan sedot WC profesional, cepat, bersih dan harga bersahabat. Siap melayani pelancaran saluran mampet dan septic tank tuntas 24 Jam Non-Stop.",
    heroFeatures: ["Layanan 24 Jam", "Cepat & Tuntas", "Aman & Terpercaya", "Harga Bersahabat"],
    heroBadgeTitle: "Armada Siaga",
    heroBadgeDesc: "Truk tangki modern siap jalan di seluruh kota.",

    // InfoBar Section
    infoClockTitle: "Layanan 24 Jam",
    infoClockSub: "Siap melayani kapan saja",
    infoMapTitle: "Jangkauan Luas",
    infoMapSub: "Melayani seluruh wilayah",
    infoUsersTitle: "Tenaga Profesional",
    infoUsersSub: "Berpengalaman & terpercaya",
    infoSettingsTitle: "Peralatan Modern",
    infoSettingsSub: "Teknologi terbaru & higienis",

    // About & Services
    aboutLabel: "Profil Perusahaan",
    aboutTitle: "TENTANG KAMI",
    aboutDesc1: "Sedot WC Prima Jaya adalah penyedia layanan sedot WC profesional yang siap membantu mengatasi masalah septic tank penuh, WC mampet, saluran mampet, dan limbah rumah tangga dengan cepat, bersih, dan tuntas.",
    aboutDesc2: "Kami didukung oleh armada truk tangki modern berkapasitas besar serta tenaga ahli berpengalaman yang mengutamakan kepuasan pelanggan dengan harga bersahabat dan transparan.",
    servicesLabel: "Solusi Sanitasi Kami",
    servicesTitle: "LAYANAN KAMI",

    // Services Data
    services: [
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
    ] as ServiceItem[],

    // Testimonials & Gallery
    testimonialsLabel: "Feedback Real Pelanggan",
    testimonialsTitle: "TESTIMONI PELANGGAN",
    galleryLabel: "Dokumentasi Lapangan",
    galleryTitle: "GALERI PEKERJAAN",
    viewAllGallery: "Lihat Semua Galeri",

    // Testimonials Data
    testimonials: [
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
    ] as TestimonialItem[],

    // Gallery Data
    gallery: [
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
    ] as GalleryItem[],

    // Coverage Area
    coverageLabel: "Area Layanan Aktif",
    coverageTitle: "Wilayah Jangkauan Sedot WC",
    coverageDesc: "Armada tangki Sedot WC Prima Jaya siaga di berbagai titik strategis Jabodetabek untuk memastikan waktu kedatangan yang sangat cepat langsung ke alamat Anda.",
    coverageCheckTitle: "Cek Jangkauan Lokasi",
    coverageCheckSub: "Verifikasi Instan 24 Jam",
    coverageCheckDesc: "Ketik nama kota, kecamatan, atau kelurahan Anda di Jabodetabek di bawah ini untuk memverifikasi ketersediaan armada kami secara instan:",
    coverageInputPlaceholder: "Cari kelurahan / kecamatan...",
    coverageSuccessTitle: "Lokasi Tercover!",
    coverageSuccessDesc: "area yang cocok dengan pencarian Anda. Kami siap meluncur ke alamat Anda:",
    coverageDefaultBanner: "Masukkan lokasi Anda untuk memeriksa secara cepat.",
    coverageFallbackTitle: "Layanan Prima",
    coverageFallbackDesc: "Kami melayani seluruh kelurahan di Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Meskipun nama spesifik kelurahan Anda tidak tertulis, tim kami tetap dapat menjangkau lokasi Anda!",
    tabAll: "Semua",

    // Coverage Data
    coverage: [
      {
        name: "Jakarta",
        subareas: [
          "Jakarta Pusat (Senen, Kemayoran, Tanah Abang, Menteng, Cempaka Putih)",
          "Jakarta Selatan (Cilandak, Kebayoran Baru/Lama, Tebet, Pasar Minggu, Jagakarsa)",
          "Jakarta Barat (Cengkareng, Grogol, Kebon Jeruk, Kembangan, Palmerah)",
          "Jakarta Utara (Sunter, Kelapa Gading, Pluit, Tanjung Priok, Cilincing)",
          "Jakarta Timur (Pondok Gede, Kramat Jati, Duren Sawit, Cakung, Pulogadung)",
        ],
      },
      {
        name: "Depok",
        subareas: [
          "Margonda", "Cinere", "Cimanggis", "Sawangan", "Pancoran Mas", "Tapos", "Beji", "Sukmajaya", "Cipayung"
        ],
      },
      {
        name: "Tangerang",
        subareas: [
          "Tangerang Kota (Cipondoh, Karawaci, Ciledug, Tangerang, Periuk)",
          "Tangerang Selatan (BSD, Bintaro, Pamulang, Ciputat, Serpong, Setu)",
          "Kabupaten Tangerang (Cikupa, Balaraja, Tigaraksa, Pasar Kemis, Sepatan)",
        ],
      },
      {
        name: "Bekasi",
        subareas: [
          "Bekasi Kota (Harapan Indah, Galaxi, Bekasi Barat/Timur/Utara/Selatan)",
          "Kabupaten Bekasi (Cikarang, Cibitung, Tambun, Grand Wisata, Babelan)",
        ],
      },
      {
        name: "Bogor",
        subareas: [
          "Bogor Kota (Baranangsiang, Pajajaran, Bogor Timur/Barat/Utara/Selatan)",
          "Kabupaten Bogor (Cibinong, Sentul, Bojonggede, Parung, Cileungsi, Citeureup)",
        ],
      },
    ] as CoverageRegion[],

    // FAQ Section
    faqLabel: "Pertanyaan Umum",
    faqTitle: "Tanya Jawab (FAQ)",
    faqDesc: "Temukan jawaban langsung untuk pertanyaan yang paling sering ditanyakan mengenai layanan, tarif, garansi, dan cakupan operasional kami.",
    faqTrustTitle: "Punya pertanyaan lain yang belum terjawab?",
    faqTrustDesc: "Hubungi Customer Service 24 jam kami secara gratis untuk konsultasi masalah septic tank atau saluran mampet Anda sekarang.",

    // FAQ Data
    faqs: [
      {
        id: "faq-1",
        question: "Berapa biaya / tarif layanan Sedot WC Prima Jaya?",
        answer: "Biaya sedot WC kami sangat bersahabat, transparan, dan disesuaikan dengan jenis layanan (sedot septic tank, pelancaran saluran mampet, atau perawatan), volume tangki yang diperlukan, serta jarak lokasi. Kami menjamin tidak ada biaya siluman (tambahan tersembunyi). Silakan hubungi kami untuk mendapatkan estimasi penawaran harga terbaik dan gratis konsultasi!",
      },
      {
        id: "faq-2",
        question: "Bagaimana cara melakukan pemesanan layanan?",
        answer: "Sangat mudah! Anda dapat mengisi Formulir Pemesanan cepat di website ini yang akan terintegrasi langsung dengan WhatsApp kami, atau Anda bisa langsung menekan tombol telepon untuk berbicara dengan Customer Service kami. Setelah detail lokasi dan keluhan dikonfirmasi, tim teknisi terdekat akan segera meluncur ke lokasi Anda sesuai jadwal yang disepakati.",
      },
      {
        id: "faq-3",
        question: "Wilayah mana saja yang dijangkau oleh Sedot WC Prima Jaya?",
        answer: "Kami melayani seluruh area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi). Dengan jaringan armada yang tersebar luas di berbagai titik strategis, kami menjamin tim teknisi dapat tiba di lokasi Anda dengan cepat dan tepat waktu tanpa hambatan jarak.",
      },
      {
        id: "faq-4",
        question: "Apakah layanan Sedot WC Prima Jaya tersedia selama 24 jam?",
        answer: "Ya, kami beroperasi 24 jam non-stop setiap hari, termasuk hari Minggu dan hari libur nasional. Masalah sanitasi seperti WC meluap atau saluran mampet seringkali terjadi secara mendadak, oleh karena itu tim darurat kami selalu siaga kapan pun Anda membutuhkan bantuan.",
      },
      {
        id: "faq-5",
        question: "Apakah ada garansi jika WC mampet kembali setelah dikerjakan?",
        answer: "Tentu saja! Kami memberikan jaminan garansi hasil pekerjaan yang bersih, rapi, dan tuntas. Jika terjadi kendala atau keluhan serupa dalam masa garansi yang disepakati, tim kami siap datang kembali ke lokasi Anda untuk melakukan pengecekan ulang dan perbaikan tanpa biaya tambahan.",
      },
      {
        id: "faq-6",
        question: "Peralatan apa yang digunakan untuk proses penyedotan?",
        answer: "Kami menggunakan armada truk tangki modern berkapasitas besar (merek ISUZU) yang dilengkapi dengan mesin pompa vakum bertenaga tinggi (super vacuum) untuk menyedot kotoran dengan cepat. Kami juga memiliki peralatan jetting bertekanan tinggi untuk menghancurkan sumbatan keras di dalam pipa tanpa perlu melakukan pembongkaran lantai atau saluran.",
      },
    ] as FAQItem[],

    // Footer
    footerCallNow: "HUBUNGI KAMI SEKARANG!",
    footerDesc: "Penyedia jasa sedot WC, septic tank, dan pelancaran saluran air mampet terpercaya 24 Jam. Melayani cepat, rapi, bersih, dan tuntas dengan garansi kepuasan pelanggan 100%.",
    footerPros1: "Teknisi Berpengalaman & Ramah",
    footerPros2: "Peralatan Vakum Bertenaga Tinggi",
    footerQuickLinks: "Tautan Cepat",
    footerCoverageTitle: "Area Jangkauan Kami",
    footerCoverageDesc: "Kami melayani jasa sedot WC panggilan di seluruh area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) dan sekitarnya 24 Jam.",
    footerCtaButton: "Panggil Teknisi Sekarang",
    footerCopyright: "Sedot WC Prima Jaya. Hak Cipta Dilindungi Undang-Undang.",
    footerTerms: "Syarat & Ketentuan",
    footerPrivacy: "Kebijakan Privasi",

    // Contact Modal
    modalTitle: "Formulir Pemesanan",
    modalSub: "Sedot WC Prima Jaya",
    modalSuccessTitle: "Pesanan Dialihkan ke WhatsApp!",
    modalSuccessDesc: "Sistem telah merangkum detail data pesanan Anda dan mengarahkannya ke WhatsApp Prima Jaya. Mohon hubungi kami di room chat.",
    modalNameLabel: "Nama Lengkap *",
    modalNamePlaceholder: "Contoh: Bapak Budi Santoso",
    modalPhoneLabel: "Nomor WhatsApp *",
    modalPhonePlaceholder: "Contoh: 08123456789",
    modalAddressLabel: "Alamat Lengkap *",
    modalAddressPlaceholder: "Contoh: Jl. Merpati No. 12, RT 03/RW 04, Kel. Sukamaju, Kec. Cilandak, Jakarta Selatan",
    modalServiceLabel: "Pilih Layanan",
    modalScheduleLabel: "Jadwal Pengerjaan",
    modalSchedulePlaceholder: "Contoh: Hari ini jam 1 siang",
    modalNotesLabel: "Detail Keluhan / Masalah (Opsional)",
    modalNotesPlaceholder: "Misal: Septic tank meluap bau, WC tersumbat tidak bisa disiram sama sekali.",
    modalSubmitWa: "Pesan via WhatsApp",
    modalSubmitCall: "Telepon Langsung",
    modalPrivacyNote: "* Data Anda aman dan hanya digunakan untuk kepentingan penjadwalan layanan kami.",

    // Floating WhatsApp
    floatingWaStatus: "Online (Respons Cepat)",
    floatingWaTitle: "Sedot WC Prima Jaya",
    floatingWaGreeting: "Halo! Ada yang bisa kami bantu? Silakan pilih salah satu saluran kontak kami di bawah ini:",
    floatingWaCtaText: "PILIH SALURAN KONTAK KAMI",
    floatingWaOptionWa: "Pesan via WhatsApp",
    floatingWaOptionCall: "Telepon Langsung (24 Jam)",
    floatingWaOptionEmail: "Kirim Email Kami",
  },
  en: {
    // Brand / general
    companyName: "PRIMA JAYA",
    tagline: "CLEAN, FAST, COMPLETE",
    logoSub: "SEWAGE TRUCK",
    ctaCallUs: "CONTACT US",
    ctaOrderNow: "Book Now",
    ctaCallNow: "24-Hour Contact",
    warranty: "WARRANTY",
    trusted: "TRUSTED",

    // Header Navigation
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navBenefits: "Benefits",
    navTestimonials: "Testimonials",
    navGallery: "Gallery",
    navCoverage: "Coverage",
    navFaq: "FAQ",
    navContact: "Contact",
    callUs24H: "Contact Us 24 Hours",

    // Hero Section
    heroSub: "Official & Trusted Sewage Truck Services",
    heroTitle: "SEWAGE SERVICES",
    heroDesc: "Professional, fast, clean, and affordable sewage truck services. Ready to clear clogged drains and fully flush septic tanks 24/7 non-stop.",
    heroFeatures: ["24-Hour Service", "Fast & Thorough", "Safe & Reliable", "Affordable Prices"],
    heroBadgeTitle: "Standby Fleet",
    heroBadgeDesc: "Modern vacuum tankers ready to roll across the entire region.",

    // InfoBar Section
    infoClockTitle: "24-Hour Service",
    infoClockSub: "Ready to serve at any time",
    infoMapTitle: "Wide Coverage",
    infoMapSub: "Serving the entire metropolitan area",
    infoUsersTitle: "Professional Crew",
    infoUsersSub: "Experienced & highly trusted",
    infoSettingsTitle: "Modern Equipment",
    infoSettingsSub: "Latest hygienic vacuum technology",

    // About & Services
    aboutLabel: "Company Profile",
    aboutTitle: "ABOUT US",
    aboutDesc1: "Sedot WC Prima Jaya is a professional sewage service provider ready to help resolve full septic tanks, clogged toilets, blocked drains, and domestic waste issues quickly, cleanly, and thoroughly.",
    aboutDesc2: "We are supported by a standby fleet of modern, large-capacity vacuum tankers and highly experienced specialists who prioritize customer satisfaction with transparent, friendly pricing.",
    servicesLabel: "Our Sanitation Solutions",
    servicesTitle: "OUR SERVICES",

    // Services Data
    services: [
      {
        id: "serv-1",
        title: "Residential Sewage Services",
        description: "Hygienic and fast vacuum services for homes, shop houses, and various residential buildings.",
        iconName: "home",
      },
      {
        id: "serv-2",
        title: "Commercial & Institutional",
        description: "Large-scale waste management services for corporate offices, factories, schools, and worship venues.",
        iconName: "building",
      },
      {
        id: "serv-3",
        title: "Clogged Toilet & Drain Clearing",
        description: "Quick resolution for clogged toilets, blocked sinks, and pipe obstructions without floor excavation.",
        iconName: "plug",
      },
      {
        id: "serv-4",
        title: "Septic Tank Maintenance",
        description: "Regular checkups, septic tank renovations, new seepage well builds, and biological bacterial treatments.",
        iconName: "database",
      },
    ] as ServiceItem[],

    // Testimonials & Gallery
    testimonialsLabel: "Real Customer Feedback",
    testimonialsTitle: "CUSTOMER TESTIMONIALS",
    galleryLabel: "Field Documentation",
    galleryTitle: "WORK GALLERY",
    viewAllGallery: "View Full Gallery",

    // Testimonials Data
    testimonials: [
      {
        id: "test-1",
        name: "Mr. Ahmad Rifai",
        rating: 5,
        comment: "Extremely satisfied with the service! The team arrived right on schedule, completed the work super fast, and left the surrounding area clean. Clogged toilet was solved instantly. Highly recommended!",
        avatarUrl: "/src/assets/images/buat_gambar_Bapak_Ahmad_Rifai_202606250100.jpeg",
        role: "Homeowner (Jakarta)",
      },
      {
        id: "test-2",
        name: "Mrs. Indah Permata",
        rating: 5,
        comment: "Full septic tank at our commercial shop house was cleared on the very same day. The crew was polite, professional, and transparent about everything. Pricing was extremely fair too.",
        avatarUrl: "/src/assets/images/buat_gambar_Ibu_Indah_Permata_202606250105.jpeg",
        role: "Shop Owner (Depok)",
      },
      {
        id: "test-3",
        name: "Mr. Hendra Wijaya",
        rating: 5,
        comment: "Very rapid response when contacted late at night. Our kitchen sink which had been clogged for days was cleared in less than an hour using their modern equipment. Excellent work!",
        avatarUrl: "/src/assets/images/buat_gambar_Bapak_Hendra_Wijaya_202606250109.jpeg",
        role: "Restaurant Manager (Tangerang)",
      },
    ] as TestimonialItem[],

    // Gallery Data
    gallery: [
      {
        id: "gal-1",
        imageUrl: "/src/assets/images/worker_septic_cleaning_1782320642146.jpg",
        title: "Septic Tank Cleaning",
        alt: "Expert technicians conducting a full septic tank clearance at a residential home.",
      },
      {
        id: "gal-2",
        imageUrl: "/src/assets/images/drain_cleaning_equipment_1782320659169.jpg",
        title: "Modern High-Pressure Tools",
        alt: "Powerful and modern high-pressure vacuum machinery for complete sanitation.",
      },
      {
        id: "gal-3",
        imageUrl: "/src/assets/images/manhole_maintenance_1782320672772.jpg",
        title: "Pipe & Manhole Maintenance",
        alt: "Inspecting and clearing main outlet sewer pipes.",
      },
    ] as GalleryItem[],

    // Coverage Area
    coverageLabel: "Active Service Areas",
    coverageTitle: "Our Coverage Map",
    coverageDesc: "Our standby truck fleet is strategically stationed across the metropolitan Jabodetabek region to ensure incredibly fast response times directly to your address.",
    coverageCheckTitle: "Check Location Coverage",
    coverageCheckSub: "Instant 24-Hour Verification",
    coverageCheckDesc: "Type your city, district, or village name in Jabodetabek below to check our fleet availability instantly:",
    coverageInputPlaceholder: "Search village / district / city...",
    coverageSuccessTitle: "Area Covered!",
    coverageSuccessDesc: "areas matched your search. We are ready to dispatch our fleet to your address:",
    coverageDefaultBanner: "Enter your location to quickly verify coverage.",
    coverageFallbackTitle: "Premium Dispatch",
    coverageFallbackDesc: "We cover all neighborhoods in Jakarta, Bogor, Depok, Tangerang, and Bekasi. Even if your exact village is not listed, our dispatch network can still reach you!",
    tabAll: "All",

    // Coverage Data
    coverage: [
      {
        name: "Jakarta",
        subareas: [
          "Central Jakarta (Senen, Kemayoran, Tanah Abang, Menteng, Cempaka Putih)",
          "South Jakarta (Cilandak, Kebayoran Baru/Lama, Tebet, Pasar Minggu, Jagakarsa)",
          "West Jakarta (Cengkareng, Grogol, Kebon Jeruk, Kembangan, Palmerah)",
          "North Jakarta (Sunter, Kelapa Gading, Pluit, Tanjung Priok, Cilincing)",
          "East Jakarta (Pondok Gede, Kramat Jati, Duren Sawit, Cakung, Pulogadung)",
        ],
      },
      {
        name: "Depok",
        subareas: [
          "Margonda", "Cinere", "Cimanggis", "Sawangan", "Pancoran Mas", "Tapos", "Beji", "Sukmajaya", "Cipayung"
        ],
      },
      {
        name: "Tangerang",
        subareas: [
          "Tangerang City (Cipondoh, Karawaci, Ciledug, Tangerang, Periuk)",
          "South Tangerang (BSD, Bintaro, Pamulang, Ciputat, Serpong, Setu)",
          "Tangerang Regency (Cikupa, Balaraja, Tigaraksa, Pasar Kemis, Sepatan)",
        ],
      },
      {
        name: "Bekasi",
        subareas: [
          "Bekasi City (Harapan Indah, Galaxy, West/East/North/South Bekasi)",
          "Bekasi Regency (Cikarang, Cibitung, Tambun, Grand Wisata, Babelan)",
        ],
      },
      {
        name: "Bogor",
        subareas: [
          "Bogor City (Baranangsiang, Pajajaran, West/East/North/South Bogor)",
          "Bogor Regency (Cibinong, Sentul, Bojonggede, Parung, Cileungsi, Citeureup)",
        ],
      },
    ] as CoverageRegion[],

    // FAQ Section
    faqLabel: "Frequently Asked Questions",
    faqTitle: "Tanya Jawab (FAQ)",
    faqDesc: "Find direct and helpful answers to the most common queries regarding our services, rates, warranty, and operations.",
    faqTrustTitle: "Have another question?",
    faqTrustDesc: "Contact our 24-hour Customer Support desk for a completely free consultation regarding your septic tank or drain issue today.",

    // FAQ Data
    faqs: [
      {
        id: "faq-1",
        question: "How much do the services of Sedot WC Prima Jaya cost?",
        answer: "Our rates are very competitive, fully transparent, and tailored to the service type (septic tank vacuuming, drain clearing, or routine checkups), volume size, and address distance. We guarantee zero hidden costs. Reach out to us for a free, instant quotation!",
      },
      {
        id: "faq-2",
        question: "How do I book a service?",
        answer: "It is extremely simple! Fill out the quick Booking Form on this page which aggregates your details directly into our WhatsApp dispatch, or press the direct phone button. Once details are confirmed, the closest crew is sent immediately.",
      },
      {
        id: "faq-3",
        question: "Which areas are covered by Sedot WC Prima Jaya?",
        answer: "We cover the entire Jabodetabek metropolitan area (Jakarta, Bogor, Depok, Tangerang, Bekasi). With a vast network of fleet hubs, we ensure a speedy and punctual arrival regardless of distance.",
      },
      {
        id: "faq-4",
        question: "Are services available 24 hours?",
        answer: "Yes, we operate 24 hours non-stop every single day of the year, including weekends and public holidays. Sanitation issues often happen suddenly, so our emergency crew remains on standby.",
      },
      {
        id: "faq-5",
        question: "Is there a warranty if the clog happens again?",
        answer: "Absolutely! We provide a robust service warranty. If any similar issue occurs within the agreed coverage window, our team will recheck and resolve the issue free of any extra charge.",
      },
      {
        id: "faq-6",
        question: "What equipment do you use during extraction?",
        answer: "We employ modern, high-capacity vacuum trucks (ISUZU) equipped with high-pressure suction pumps. For rigid blockages, we use high-velocity hydro-jetting to clear obstructions without cracking floors or pipes.",
      },
    ] as FAQItem[],

    // Footer
    footerCallNow: "CALL US RIGHT NOW!",
    footerDesc: "Your trusted 24-hour companion for residential and commercial vacuum services, septic tank repairs, and blocked drain clearing. Fast, thorough, and backed by a 100% satisfaction guarantee.",
    footerPros1: "Experienced & Friendly Technicians",
    footerPros2: "High-Powered Modern Suction Equipment",
    footerQuickLinks: "Quick Links",
    footerCoverageTitle: "Our Coverage Map",
    footerCoverageDesc: "We provide on-call emergency vacuum truck services throughout Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) 24 hours a day.",
    footerCtaButton: "Call Technicians Now",
    footerCopyright: "Sedot WC Prima Jaya. All Rights Reserved.",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",

    // Contact Modal
    modalTitle: "Booking Form",
    modalSub: "Sedot WC Prima Jaya",
    modalSuccessTitle: "Order Forwarded to WhatsApp!",
    modalSuccessDesc: "We have summarized your booking details and forwarded them directly to our WhatsApp support chat. Please tap send in the WhatsApp app.",
    modalNameLabel: "Full Name *",
    modalNamePlaceholder: "Example: Mr. John Doe",
    modalPhoneLabel: "WhatsApp Number *",
    modalPhonePlaceholder: "Example: 08123456789",
    modalAddressLabel: "Full Address *",
    modalAddressPlaceholder: "Example: Jl. Merpati No. 12, RT 03/RW 04, Sukamaju, Cilandak, South Jakarta",
    modalServiceLabel: "Select Service",
    modalScheduleLabel: "Requested Schedule",
    modalSchedulePlaceholder: "Example: Today at 1 PM",
    modalNotesLabel: "Issue Details (Optional)",
    modalNotesPlaceholder: "Example: Septic tank is emitting odors, toilet won't flush at all.",
    modalSubmitWa: "Send via WhatsApp",
    modalSubmitCall: "Call Directly",
    modalPrivacyNote: "* Your data is secure and only used to coordinate your service scheduling.",

    // Floating WhatsApp
    floatingWaStatus: "Online (Fast Response)",
    floatingWaTitle: "Sedot WC Prima Jaya",
    floatingWaGreeting: "Hello! How can we assist you today? Please choose one of our communication channels below:",
    floatingWaCtaText: "CHOOSE A CONTACT CHANNEL",
    floatingWaOptionWa: "Chat on WhatsApp",
    floatingWaOptionCall: "Direct Call (24 Hours)",
    floatingWaOptionEmail: "Send an Email",
  }
};
