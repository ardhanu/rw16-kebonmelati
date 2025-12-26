"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  googleSheetService,
  KegiatanItem,
} from "@/services/googleSheetService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KegiatanDetailPage() {
  const params = useParams();
  const [item, setItem] = useState<KegiatanItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine ID from params
    const id = Number(params.id);

    // Fetch all then find (since API doesn't support single fetch by ID efficiently yet)
    googleSheetService.getKegiatan().then((data) => {
      const found = data.find((d) => d.id === id);
      setItem(found || null);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-soft flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-neutral-soft flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Kegiatan tidak ditemukan</h1>
        <Link href="/kegiatan" className="text-accent underline">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="grow bg-neutral-soft min-h-screen pb-16">
        <PageHeader title={item.title} />

        <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg">
            <Link
              href="/kegiatan"
              className="inline-flex items-center text-gray-500 hover:text-accent mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Kembali ke Jadwal
            </Link>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
              <span className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
                {item.category}
              </span>
              <span className="flex items-center">
                <Calendar size={16} className="mr-2" /> {item.date || "-"}
              </span>
              <span className="flex items-center">
                <User size={16} className="mr-2" /> Admin RW
              </span>
            </div>

            {item.images.length > 0 && (
              <div className="mb-8 rounded-xl overflow-hidden relative h-64 md:h-96 w-full">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </div>

            {/* Gallery if multiple images */}
            {item.images.length > 1 && (
              <div className="mt-10 pt-10 border-t">
                <h3 className="font-bold text-xl mb-4">Galeri Foto</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {item.images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-32 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
