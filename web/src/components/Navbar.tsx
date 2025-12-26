"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { authService } from "@/services/authService";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check auth state
    authService.getUser().then(setUser);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-tight hover:text-accent-light transition-colors"
            >
              RW. 16
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:ml-6 md:space-x-8 items-center">
            {["Beranda", "Profil", "Layanan", "Kegiatan"].map((item) => {
              const path =
                item === "Beranda"
                  ? "/"
                  : item === "Profil"
                  ? "/profil"
                  : `/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={path}
                  className={`${
                    isActive(path) ? "bg-white/10 text-white" : "text-gray-200"
                  } hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* CTA / Login */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Link
                href="/layanan"
                className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              >
                Hi,{" "}
                {user.user_metadata?.fullname?.split(" ")[0] ||
                  user.email?.split("@")[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              >
                Masuk
              </Link>
            )}
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              Lapor / Aduan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-primary border-t border-white/10`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {["Beranda", "Profil", "Layanan", "Kegiatan"].map((item) => {
            const path = item === "Beranda" ? "/" : `/${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                href={path}
                onClick={toggleMenu}
                className="text-gray-200 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </Link>
            );
          })}
          <div className="pt-4 flex flex-col gap-2">
            {!user && (
              <Link
                href="/login"
                onClick={toggleMenu}
                className="bg-white/10 hover:bg-white/20 text-white block px-3 py-3 rounded-md text-base font-bold text-center"
              >
                Masuk
              </Link>
            )}
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="bg-accent hover:bg-accent-hover text-white block px-3 py-3 rounded-md text-base font-bold text-center"
            >
              Lapor / Aduan
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
