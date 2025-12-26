import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesList from "@/app/layanan/ServicesList";
import PageHeader from "@/components/PageHeader";

export default function LayananPage() {
  return (
    <>
      <Navbar />
      <main className="grow bg-neutral-soft min-h-screen">
        <PageHeader
          title="Layanan Warga"
          description="Ajukan permohonan surat pengantar dan administrasi lainnya secara online. Hemat waktu, transparan, dan dapat dipantau."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ServicesList />
        </div>
      </main>
      <Footer />
    </>
  );
}
