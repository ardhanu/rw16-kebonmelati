/**
 * RW Identity Model
 * Stores core organizations profile data.
 */
export default class RWModel {
  constructor() {
    this.data = {
      identity: {
        name: "RW 16",
        kelurahan: "Maju Jaya",
        tagline: "Guyub Rukun, Aman, Sejahtera",
        description:
          "Mitra pemerintah dalam melayani warga, menjaga ketertiban, dan membangun lingkungan yang harmonis, sesuai Pergub DKI Jakarta No. 22 Tahun 2022.",
        contact: {
          address: "Jl. Contoh Dummy No. 123",
          email: "contoh@dummy.com",
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
        citizen_charter: {
          obligations: [
            "Melaksanakan hasil Musyawarah RT/RW.",
            "Mendukung tugas Pengurus RT/RW.",
            "Berperan aktif menjaga kerukunan dan keamanan.",
            "Melapor 1x24 jam bagi tamu yang menginap (Pasal 13 Pergub 22/2022).",
          ],
          rights: [
            "Mendapat pelayanan administrasi pemerintahan.",
            "Menyampaikan pendapat dalam Musyawarah.",
            "Mendapat perlakuan yang sama dalam pelayanan kemasyarakatan.",
          ],
        },
      },
      highlights: [
        {
          title: "Posyandu Lansia",
          desc: "Layanan kesehatan dan pemantauan rutin untuk warga lanjut usia.",
          icon: "elderly",
        },
        {
          title: "Posyandu Balita",
          desc: "Program kesehatan, imunisasi, dan tumbuh kembang balita.",
          icon: "child_care",
        },
        {
          title: "Program S3",
          desc: "Sedekah Seribu Sehari: Gerakan gotong royong sosial warga.",
          icon: "volunteer_activism",
        },
        {
          title: "Ambulance",
          desc: "Layanan transportasi darurat siaga 24 jam untuk warga.",
          icon: "medical_services",
        },
        {
          title: "SATGAS Keamanan",
          desc: "Satuan Tugas keamanan lingkungan yang responsif.",
          icon: "security",
        },
      ],
    };
  }

  async getIdentity() {
    return this.data.identity;
  }

  async getAbout() {
    return this.data.about;
  }

  async getHighlights() {
    return this.data.highlights;
  }
}
