export const rwData = {
  identity: {
    name: "RW 16",
    kelurahan: "Maju Jaya",
    tagline: "Guyub Rukun, Aman, Sejahtera",
    description:
      "Mitra pemerintah dalam melayani warga, menjaga ketertiban, dan membangun lingkungan yang harmonis, sesuai Pergub DKI Jakarta No. 22 Tahun 2022.",
    contact: {
      address:
        "Jl. Tenaga Listrik, RT.15/RW.16, Kb. Melati, Tanah Abang, Jakarta Pusat",
      email: "sekretariat@rw16-kebonmelati.id",
      phone: "+62 812-0000-0000",
    },
    stats: {
      kk: 450,
      warga: 1500,
      rt: 8,
    },
  },
  about: {
    vision:
      "Terwujudnya lingkungan RW 16 yang religius, aman, bersih, dan gotong royong.",
    mission:
      "Meningkatkan pelayanan publik yang prima, menjaga keamanan lingkungan (Siskamling), dan memberdayakan ekonomi warga.",
    structure: [
      { role: "Ketua RW", name: "Bpk. H. Ahmad Fauzi" },
      { role: "Sekretaris", name: "Ibu Siti Aminah" },
      { role: "Bendahara", name: "Bpk. Budi Santoso" },
      { role: "Bidang Pemerintahan", name: "Bpk. Joko" },
      { role: "Bidang Pembangunan", name: "Bpk. Asep" },
      { role: "Bidang Kesejahteraan Rakyat", name: "Ibu Dewi" },
    ],
    rt_list: [
      { name: "RT 001", ketua: "Bpk. Rahmat" },
      { name: "RT 002", ketua: "Bpk. Yudi" },
      { name: "RT 003", ketua: "Bpk. Dedi" },
      { name: "RT 004", ketua: "Bpk. Eko" },
      { name: "RT 005", ketua: "Bpk. Fajar" },
      { name: "RT 006", ketua: "Bpk. Gani" },
      { name: "RT 007", ketua: "Bpk. Hadi" },
      { name: "RT 008", ketua: "Bpk. Indra" },
    ],
  },
  highlights: [
    {
      title: "Posyandu Lansia",
      desc: "Layanan kesehatan dan pemantauan rutin untuk warga lanjut usia.",
    },
    {
      title: "Posyandu Balita",
      desc: "Program kesehatan, imunisasi, dan tumbuh kembang balita.",
    },
    {
      title: "Program S3",
      desc: "Sedekah Seribu Sehari: Gerakan gotong royong sosial warga.",
    },
    {
      title: "Ambulance",
      desc: "Layanan transportasi darurat siaga 24 jam untuk warga.",
    },
    {
      title: "SATGAS Keamanan",
      desc: "Satuan Tugas keamanan lingkungan yang responsif.",
    },
  ],
};

export const servicesData = {
  procedure: {
    title: "Alur Pelayanan Administrasi RW",
    steps: [
      {
        title: "Lapor RT",
        desc: "Datang ke Ketua RT setempat untuk meminta surat pengantar.",
      },
      {
        title: "Verifikasi Berkas",
        desc: "Pastikan dokumen (KTP/KK) asli dan fotokopi lengkap.",
      },
      {
        title: "Validasi RW",
        desc: "Bawa berkas ke Sekretariat RW pada jam kerja (19.00 - 21.00).",
      },
      { title: "Selesai", desc: "Surat ditandatangani dan dicap basah RW." },
    ],
  },
  services: [
    {
      id: 1,
      title: "Pengantar Dokumen Kependudukan",
      description:
        "Pengantar untuk pembuatan/perubahan KK, KTP, Akta Lahir/Kematian, atau Surat Pindah.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP & KK Lama",
        "Akta Pelengkap (Nikah/Cerai/Lahir)",
      ],
    },
    {
      id: 2,
      title: "Surat Keterangan Domisili",
      description:
        "Keterangan tempat tinggal untuk keperluan perbankan, sekolah, atau pekerjaan.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP & KK",
        "Surat Jaminan (Jika bukan warga setempat)",
      ],
    },
    {
      id: 3,
      title: "Surat Keterangan Usaha (SKU)",
      description:
        "Pengantar untuk izin usaha mikro/kecil atau keperluan kredit bank.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP, KK, NPWP",
        "Foto Lokasi Usaha",
      ],
    },
    {
      id: 4,
      title: "Surat Keterangan Ahli Waris",
      description:
        "Pengurusan penetapan ahli waris untuk perbankan atau pertanahan.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP/KK Pewaris & Ahli Waris",
        "Akta Kematian, Nikah, Lahir",
      ],
    },
    {
      id: 5,
      title: "Surat Ket. Belum Menikah/Janda/Duda",
      description:
        "Keterangan status perkawinan untuk persyaratan menikah lagi.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP & KK",
        "Surat Pernyataan Status Bermaterai",
      ],
    },
    {
      id: 6,
      title: "Surat Keterangan Tidak Mampu (SKTM)",
      description:
        "Rekomendasi untuk keringanan biaya sekolah, kesehatan, atau bantuan sosial.",
      requirements: [
        "Surat Pengantar RT",
        "Fotokopi KTP & KK",
        "Surat Pernyataan Tidak Mampu",
      ],
    },
    {
      id: 7,
      title: "Pengantar SKCK",
      description: "Surat pengantar untuk pembuatan Catatan Kepolisian (SKCK).",
      requirements: ["Surat Pengantar RT", "Fotokopi KTP & KK"],
    },
    {
      id: 8,
      title: "Izin Keramaian",
      description:
        "Pengantar izin untuk mengadakan acara yang mengundang massa.",
      requirements: [
        "Surat Permohonan",
        "Proposal Acara",
        "Fotokopi KTP Penanggung Jawab",
      ],
    },
  ],
};

export function getHighlights() {
  return rwData.highlights;
}

export function getTopServices(limit = 3) {
  return servicesData.services.slice(0, limit);
}
