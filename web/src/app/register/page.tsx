"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    rt: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Generate RT Options (001 - 015) - Standardized strictly to 3 digits like legacy? Legacy was padding 3 digits "RT 001"
  // Legacy code: const rtNum = i.toString().padStart(3, "0");
  const rtOptions = Array.from({ length: 15 }, (_, i) => {
    const num = (i + 1).toString().padStart(3, "0");
    return `RT ${num}`;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.phone.length > 13)
        throw new Error("Nomor HP maksimal 13 digit");

      await authService.register(
        formData.email,
        formData.password,
        formData.fullname,
        formData.phone,
        formData.rt
      );

      Swal.fire({
        title: "Registrasi Berhasil!",
        text: "Silakan cek email untuk verifikasi (jika ada) atau langsung login.",
        icon: "success",
      }).then(() => {
        router.push("/login");
      });
    } catch (error: unknown) {
      let message = "Terjadi kesalahan.";
      if (error instanceof Error) {
        message = error.message;
        if (message.includes("already registered")) {
          message = "Email ini sudah terdaftar.";
        }
      }
      Swal.fire("Registrasi Gagal", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-soft flex items-center justify-center p-4 py-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-border">
        <div className="p-8">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" /> Kembali ke Login
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-accent mb-4">
              <User size={24} />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              Daftar Akun Warga
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Lengkapi data diri Anda untuk membuat akun baru.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="fullname"
                  type="text"
                  required
                  placeholder="Sesuai KTP"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email@contoh.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor HP / WA
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="phone"
                  type="number"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warga RT
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="rt"
                  required
                  value={formData.rt}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white appearance-none"
                >
                  <option value="">-- Pilih RT --</option>
                  {rtOptions.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-accent-hover transition-all flex justify-center items-center gap-2 mt-6 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Daftar Akun"
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-accent font-bold hover:underline"
            >
              Masuk disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
