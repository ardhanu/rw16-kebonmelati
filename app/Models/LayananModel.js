/**
 * Layanan Model
 * Stores list of public services.
 */
export default class LayananModel {
    constructor() {
        this.data = {
            procedure: {
                title: "Alur Pelayanan Administrasi RW",
                steps: [
                    { title: "Lapor RT", desc: "Datang ke Ketua RT setempat untuk meminta surat pengantar." },
                    { title: "Verifikasi Berkas", desc: "Pastikan dokumen (KTP/KK) asli dan fotokopi lengkap." },
                    { title: "Validasi RW", desc: "Bawa berkas ke Sekretariat RW pada jam kerja (19.00 - 21.00)." },
                    { title: "Selesai", desc: "Surat ditandatangani dan dicap basah RW." }
                ]
            },
            services: [
                {
                    id: 1,
                    title: "Pengantar Dokumen Kependudukan",
                    description: "Pengantar untuk pembuatan/perubahan KK, KTP, Akta Lahir/Kematian, atau Surat Pindah.",
                    icon: "assignment_ind",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP & KK Lama",
                        "Akta Pelengkap (Nikah/Cerai/Lahir) sesuai kebutuhan"
                    ]
                },
                {
                    id: 2,
                    title: "Surat Keterangan Domisili",
                    description: "Keterangan tempat tinggal untuk keperluan perbankan, sekolah, atau pekerjaan.",
                    icon: "home",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP & KK",
                        "Surat Jaminan & KTP Penjamin (Jika bukan warga setempat)"
                    ]
                },
                {
                    id: 3,
                    title: "Surat Keterangan Usaha (SKU)",
                    description: "Pengantar untuk izin usaha mikro/kecil atau keperluan kredit bank.",
                    icon: "store",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP, KK, NPWP",
                        "Foto Lokasi Usaha",
                        "Surat Pernyataan Tidak Berjualan di Trotoar (Bermaterai)"
                    ]
                },
                {
                    id: 4,
                    title: "Surat Keterangan Ahli Waris",
                    description: "Pengurusan penetapan ahli waris untuk perbankan atau pertanahan.",
                    icon: "people",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP/KK Pewaris & Seluruh Ahli Waris",
                        "Akta Kematian, Akta Nikah, Akta Lahir Ahli Waris",
                        "Surat Pernyataan Ahli Waris (Bermaterai)"
                    ]
                },
                {
                    id: 5,
                    title: "Surat Ket. Belum Menikah/Janda/Duda",
                    description: "Keterangan status perkawinan untuk persyaratan menikah lagi atau administrasi lainnya.",
                    icon: "favorite",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP & KK",
                        "Surat Pernyataan Status Bermaterai (+ TTD 2 Saksi)",
                        "Akta Cerai/Kematian Pasangan (Jika Janda/Duda)"
                    ]
                },
                {
                    id: 6,
                    title: "Surat Keterangan Tidak Mampu (SKTM)",
                    description: "Rekomendasi untuk keringanan biaya sekolah, kesehatan, atau bantuan sosial.",
                    icon: "health_and_safety",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP & KK",
                        "Surat Pernyataan Tidak Mampu (Bermaterai)"
                    ]
                },
                {
                    id: 7,
                    title: "Pengantar SKCK",
                    description: "Surat pengantar untuk pembuatan Catatan Kepolisian (SKCK) di Polsek/Polres.",
                    icon: "encrypted",
                    requirements: [
                        "Surat Pengantar RT",
                        "Fotokopi KTP & KK",
                        "Surat Pernyataan Data Benar (Bermaterai)"
                    ]
                },
                {
                    id: 8,
                    title: "Izin Keramaian",
                    description: "Pengantar izin untuk mengadakan acara yang mengundang massa (Hajatan/Pentas).",
                    icon: "campaign",
                    requirements: [
                        "Surat Permohonan Resmi",
                        "Proposal Acara & Susunan Panitia",
                        "Fotokopi KTP Penanggung Jawab",
                        "Izin/Persetujuan Tempat"
                    ]
                }
            ],
            downloads: [
                { title: "Surat Pengantar RT/RW", type: "PDF", size: "150 KB", url: "#" },
                { title: "Surat Pernyataan Tidak Merangkap Jabatan", type: "DOCX", size: "200 KB", url: "#" },
                { title: "Berita Acara Pemilihan Ketua RT/RW", type: "PDF", size: "120 KB", url: "#" },
                { title: "Tata Tertib Musyawarah Warga", type: "PDF", size: "300 KB", url: "#" }
            ]
        };
    }

    getAllServices() {
        return this.data.services;
    }

    getDownloads() {
        return this.data.downloads;
    }
    
    async getTopServices(limit = 3) {
        return this.data.services.slice(0, limit);
    }

    getProcedure() {
        return this.data.procedure;
    }
}
