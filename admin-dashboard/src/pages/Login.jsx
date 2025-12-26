import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Security Check: Verify Role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // If DB query fails (e.g. RLS issues), sign out and show exact error
        await supabase.auth.signOut();
        throw new Error("Gagal Verifikasi Role: " + profileError.message);
      }

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Akses Ditolak: Akun ini bukan Admin.");
      }

      toast.success("Login Berhasil!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left Side: Artistic/Brand */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 to-indigo-800 text-white flex-col justify-center px-12 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Sistem Pelayanan <br />{" "}
            <span className="text-blue-300">Warga RW.016</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-md">
            Platform terpadu untuk pengelolaan administrasi, surat pengantar,
            dan data kependudukan yang cepat dan transparan.
          </p>

          <div className="flex gap-4 items-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-blue-200">Akses Sistem</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold">Realtime</div>
              <div className="text-xs text-blue-200">Notifikasi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 lg:hidden">
            <h2 className="text-3xl font-bold text-blue-900">RW.016 Admin</h2>
            <p className="text-gray-500">Masuk untuk mengelola dashboard</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 hidden lg:block mb-2">
              Selamat Datang 👋
            </h2>
            <p className="text-gray-500">Masukkan kredensial Admin Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="admin@rw16.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between ml-1">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            &copy; 2025 Sistem Informasi RW.016. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
