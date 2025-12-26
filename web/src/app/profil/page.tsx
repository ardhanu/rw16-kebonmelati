import { rwData } from "@/data/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function ProfilPage() {
  const { identity, about } = rwData;

  return (
    <>
      <Navbar />
      <main className="grow bg-neutral-soft min-h-screen">
        <PageHeader
          title={`Profil ${identity.name}`}
          description="Menuju Lingkungan yang Guyub, Rukun, dan Sejahtera."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Vision Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-border mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-4">Visi</h2>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  &quot;{about.vision}&quot;
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-accent mb-4">Misi</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {about.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Structure */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Organigram */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-neutral-border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">
                Struktur Organisasi
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.structure.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center p-3 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                      {s.name[0]}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                        {s.role}
                      </p>
                      <h4 className="font-bold text-gray-800">{s.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RT List */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">
                Daftar Ketua RT
              </h2>
              <div className="space-y-4">
                {about.rt_list.map((rt, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-dashed pb-2 last:border-0"
                  >
                    <span className="font-bold text-gray-600">{rt.name}</span>
                    <span className="text-sm text-gray-500">{rt.ketua}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
