import { rwData, getTopServices, getHighlights } from "@/data/models";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const identity = rwData.identity;
  const highlights = getHighlights();
  const topServices = getTopServices(3);

  return (
    <>
      <Navbar />
      <main className="grow">
        {/* Hero Section */}
        <section className="relative bg-primary text-white overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('/assets/images/hero-bg.png')] bg-cover bg-center"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
              {identity.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto font-light">
              {identity.tagline}
            </p>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {identity.description}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/layanan"
                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Layanan Warga
              </Link>
              <Link
                href="/profil"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all"
              >
                Profil RW
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 bg-neutral-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Program Unggulan
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-border hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                    {/* Icon placeholder or dynamic icon */}
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <span className="font-bold text-xl">#{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {h.title}
                  </h3>
                  <p className="text-neutral-text-secondary leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Summary */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Layanan Digital
                </h2>
                <p className="text-gray-500 max-w-xl">
                  Urus keperluan administrasi lebih mudah dan cepat melalui
                  platform digital kami.
                </p>
              </div>
              <Link
                href="/layanan"
                className="hidden md:flex items-center text-accent font-bold hover:underline mt-4 md:mt-0"
              >
                Lihat Semua Layanan &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topServices.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent hover:-translate-y-1 transition-transform"
                >
                  <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-accent">
                    <span className="font-bold text-xl">{s.title[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {s.description}
                  </p>
                  <Link
                    href={`/layanan?id=${s.id}`}
                    className="text-accent font-semibold hover:text-accent-hover text-sm"
                  >
                    Ajukan Sekarang &rarr;
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/layanan"
                className="text-accent font-bold hover:underline"
              >
                Lihat Semua Layanan &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
