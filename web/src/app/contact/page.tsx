"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { rwData } from "@/data/models";
import { Mail, MapPin, Phone, Send, Loader2, Clock } from "lucide-react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    rt: "",
    kategori: "Administrasi Surat",
    pesan: "",
  });

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzn3f-2C-RE281BQdGJRaP17PBtdhEVR5M-wV3s94TRozLl9GANMk5_IMn6U_ASBdES-Q/exec";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("Nama Lengkap", formData.nama);
    data.append("Nomor WhatsApp", formData.whatsapp);
    data.append("RT Berapa", formData.rt);
    data.append("Kategori", formData.kategori);
    data.append("Pesan", formData.pesan);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      Swal.fire({
        title: "Terkirim!",
        text: "Pesan Anda telah berhasil dikirim ke pengurus.",
        icon: "success",
        confirmButtonColor: "#2563EB",
      });

      setFormData({
        nama: "",
        whatsapp: "",
        rt: "",
        kategori: "Administrasi Surat",
        pesan: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim pesan.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-down">
            <h1 className="text-4xl font-extrabold text-primary mb-4">
              Hubungi Sekretariat
            </h1>
            <p className="text-xl text-gray-600">
              Sampaikan aspirasi, aduan, atau kebutuhan administrasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info & Hours */}
            <div className="space-y-8 animate-fade-in-left">
              <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-border">
                <h3 className="text-xl font-bold text-primary mb-6">
                  Informasi Kontak
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-accent">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">
                        Alamat
                      </p>
                      <p className="text-gray-800 font-medium">
                        {rwData.identity.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-accent">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-accent font-medium hover:underline">
                        <a href={`mailto:${rwData.identity.contact.email}`}>
                          {rwData.identity.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-accent">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-1">
                        Telepon / WA
                      </p>
                      <p className="text-gray-800 font-medium">
                        {rwData.identity.contact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="text-blue-300" />
                  Jam Pelayanan
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-blue-800 pb-3">
                    <span className="text-blue-200">Senin - Jumat</span>
                    <span className="font-bold">19:30 - 22:00</span>
                  </li>
                  <li className="flex justify-between pt-1">
                    <span className="text-blue-200">Sabtu - Minggu</span>
                    <span className="font-bold text-red-300">Libur</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-right">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-border relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-all"></div>

                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10 border-l-4 border-accent pl-4">
                  Formulir Aspirasi Warga
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 relative z-10"
                >
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-semibold text-gray-700 mb-1 ml-1"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm"
                      placeholder="Bpk. Budi Santoso"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-semibold text-gray-700 mb-1 ml-1"
                      >
                        Nomor WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm"
                        placeholder="0812xxxx"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rt"
                        className="block text-sm font-semibold text-gray-700 mb-1 ml-1"
                      >
                        RT Berapa
                      </label>
                      <input
                        type="text"
                        id="rt"
                        value={formData.rt}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm"
                        placeholder="Contoh: 05"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="kategori"
                      className="block text-sm font-semibold text-gray-700 mb-1 ml-1"
                    >
                      Kategori
                    </label>
                    <select
                      id="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm"
                    >
                      <option>Administrasi Surat</option>
                      <option>Laporan Keamanan</option>
                      <option>Usulan Pembangunan</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pesan"
                      className="block text-sm font-semibold text-gray-700 mb-1 ml-1"
                    >
                      Pesan / Detail
                    </label>
                    <textarea
                      id="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm"
                      placeholder="Tulis pesan anda disini..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 hover:scale-[1.02] flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:transform-none disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Mengirim...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-20 scroll-reveal animate-fade-in-up">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Lokasi Sekretariat RW 16
            </h2>
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-96 relative group">
              <iframe
                src="https://maps.google.com/maps?q=Jl.+Tenaga+Listrik,+RT.15/RW.16,+Kb.+Melati,+Tanah+Abang,+Jakarta+Pusat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:opacity-90 transition-opacity"
              ></iframe>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-white text-center text-sm font-medium">
                  Klik peta untuk membuka Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
