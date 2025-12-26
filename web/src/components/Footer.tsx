"use client";

import {
  Globe,
  AtSign,
  Phone,
  ChevronRight,
  Flame,
  Siren,
  Ambulance,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Desc */}
          <div>
            <span className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              RW 16
            </span>
            <p className="font-medium text-gray-400 mt-4 leading-relaxed">
              Membangun lingkungan Kebon Melati yang aman, nyaman, dan harmonis
              melalui gotong royong dan inovasi digital.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Globe className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AtSign className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 border-b border-gray-700 pb-2 inline-block">
              Menu Warga
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Layanan Surat", href: "/layanan" },
                { label: "Jadwal Kegiatan", href: "/kegiatan" },
                { label: "Profil Pengurus", href: "/profil" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-light transition-all flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 border-b border-gray-700 pb-2 inline-block">
              Darurat (24 Jam)
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Flame className="text-red-500 h-6 w-6" />
                <div>
                  <p className="text-xs text-gray-400">Pemadam</p>
                  <p className="font-bold">113</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Siren className="text-blue-500 h-6 w-6" />
                <div>
                  <p className="text-xs text-gray-400">Polisi</p>
                  <p className="font-bold">110</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Ambulance className="text-green-500 h-6 w-6" />
                <div>
                  <p className="text-xs text-gray-400">Ambulans</p>
                  <p className="font-bold">118</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 border-b border-gray-700 pb-2 inline-block">
              Lokasi Sekretariat
            </h3>
            <div className="bg-gray-800 h-32 w-full rounded-lg flex items-center justify-center mb-4 overflow-hidden border border-gray-700 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.42999557404!2d106.8105747!3d-6.192444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6a73c091937%3A0x6280436815349f7e!2sKebon%20Melati%2C%20Tanah%20Abang%2C%20Central%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1703000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Jl. Kebon Melati No. 16, Jakarta Pusat.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 RW. 16 Kebon Melati. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
