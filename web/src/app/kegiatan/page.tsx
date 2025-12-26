"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  googleSheetService,
  KegiatanItem,
} from "@/services/googleSheetService";
import { Calendar, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";

export default function KegiatanPage() {
  const [items, setItems] = useState<KegiatanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    googleSheetService.getKegiatan().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="grow bg-neutral-soft min-h-screen">
        <PageHeader
          title="Jadwal & Kegiatan Warga"
          description="Informasi terbaru seputar agenda dan aktivitas di lingkungan RW 16."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-border hover:shadow-lg transition-all group flex flex-col"
                >
                  {/* Image Placeholder or Actual Image */}
                  <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0">
                    {item.images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {item.date || "-"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {item.description}
                    </p>

                    <Link
                      href={`/kegiatan/${item.id}`}
                      className="block mt-auto w-full"
                    >
                      <button className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        Lihat Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>Belum ada data kegiatan.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
