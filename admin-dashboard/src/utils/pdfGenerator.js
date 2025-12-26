import { jsPDF } from "jspdf";

/**
 * Generate Surat Pengantar PDF
 *
 * PANDUAN DESAIN:
 * - Gunakan doc.text("Teks", x, y) untuk menulis.
 * - Koordinat X: Kiri ke Kanan (0 - 210 untuk A4).
 * - Koordinat Y: Atas ke Bawah.
 * - doc.setFontSize(ukuran) untuk mengubah ukuran font.
 * - doc.setFont("namafont", "style") untuk mengubah gaya (bold, normal).
 */
export const generateSuratPengantar = (req) => {
  const doc = new jsPDF();

  // ==========================================
  // AREA KOP SURAT (HEADER)
  // ==========================================
  doc.setFontSize(14);
  doc.setFont("times", "bold");
  // Align Center (roughly X=105)
  doc.text("RUKUN WARGA 016", 105, 20, { align: "center" });
  doc.text("KELURAHAN KEBON MELATI", 105, 26, { align: "center" });
  doc.text("KECAMATAN TANAH ABANG", 105, 32, { align: "center" });

  // Garis Bawah Kop
  doc.setLineWidth(0.5);
  doc.line(20, 36, 190, 36); // Garis dari X=20 ke X=190 di Y=36

  // ==========================================
  // AREA JUDUL SURAT
  // ==========================================
  doc.setFontSize(12);
  doc.text("SURAT PENGANTAR", 105, 46, { align: "center" });

  doc.setFont("times", "normal");
  // Format Nomor Surat
  const nomorSurat = `Nomor: ${req.id}/RW.016/${new Date().getFullYear()}`;
  doc.text(nomorSurat, 105, 52, { align: "center" });

  // ==========================================
  // AREA ISI SURAT (BODY)
  // ==========================================
  doc.setFontSize(11);

  // Paragraf Pembuka
  doc.text(
    "Yang bertanda tangan di bawah ini Pengurus RW. 016 Kelurahan Kebon Melati,",
    20,
    65
  );
  doc.text("dengan ini menerangkan bahwa:", 20, 70);

  // Data Warga
  const startY = 80; // Titik mulai data
  const labelX = 30; // Posisi margin kiri label
  const valueX = 80; // Posisi margin kiri isi (titik dua)

  doc.text(`Nama Lengkap`, labelX, startY);
  doc.text(`: ${req.profiles?.full_name || "-"}`, valueX, startY);

  doc.text(`Warga RT`, labelX, startY + 8);
  doc.text(`: ${req.profiles?.rt || "-"}`, valueX, startY + 8);

  doc.text(`No. HP`, labelX, startY + 16);
  doc.text(`: ${req.profiles?.phone_number || "-"}`, valueX, startY + 16);

  doc.text(`Keperluan`, labelX, startY + 16);
  doc.text(`: ${req.service_type?.name || "-"}`, valueX, startY + 16);

  doc.text(`Keterangan`, labelX, startY + 24);
  doc.text(`: ${req.notes || "-"}`, valueX, startY + 24);

  // Paragraf Penutup
  doc.text(
    "Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.",
    20,
    startY + 40
  );

  // ==========================================
  // AREA TANDA TANGAN (FOOTER)
  // ==========================================
  const dateStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const signX = 140; // Posisi X tanda tangan
  const signY = startY + 60;

  doc.text(`Jakarta, ${dateStr}`, signX, signY);
  doc.text("Ketua RW. 016", signX, signY + 6);

  // Space untuk Tanda Tangan
  doc.text("..........................", signX, signY + 30);

  // Simpan File
  doc.save(`Surat_Pengantar_${req.profiles?.full_name}.pdf`);
};
