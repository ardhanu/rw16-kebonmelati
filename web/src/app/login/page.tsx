"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(email, password);
      Swal.fire({
        title: "Berhasil!",
        text: "Selamat datang kembali.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/layanan"); // Redirect to services dashboard
      });
    } catch (error: unknown) {
      let message = "Email atau password salah.";
      if (error instanceof Error) {
        message = error.message;
      }
      Swal.fire("Gagal Masuk", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-soft flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-border">
        <div className="p-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" /> Kembali ke Beranda
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-accent mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              Masuk Akun Warga
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Silakan masuk untuk mengakses layanan surat online.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-accent-hover transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Masuk Sekarang"
              )}
            </button>
            <div className="text-right">
              <button
                type="button"
                onClick={async () => {
                  const { value: email } = await Swal.fire({
                    title: "Reset Password",
                    input: "email",
                    inputLabel: "Masukkan email Anda",
                    inputPlaceholder: "email@contoh.com",
                    showCancelButton: true,
                  });
                  if (email) {
                    try {
                      await authService.resetPassword(email);
                      Swal.fire(
                        "Terkirim",
                        "Cek email Anda untuk reset password.",
                        "success"
                      );
                    } catch (e: any) {
                      Swal.fire("Gagal", e.message, "error");
                    }
                  }
                }}
                className="text-sm text-accent hover:underline"
              >
                Lupa Password?
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-accent font-bold hover:underline"
            >
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
