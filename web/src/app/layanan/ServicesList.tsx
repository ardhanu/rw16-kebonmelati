"use client";

import { useState, useEffect } from "react";
import { servicesData } from "@/data/models";
import { authService } from "@/services/authService";
import { requestService, RequestItem } from "@/services/requestService";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Lock,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";

import { PlusCircle } from "lucide-react";
import RequestForm from "./RequestForm";

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState<"list" | "history" | "create">(
    "list"
  );
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>([]);

  useEffect(() => {
    authService.getUser().then(async (u) => {
      setUser(u);
      if (u) {
        loadRequests();
      }
    });
  }, []);

  const loadRequests = async () => {
    try {
      const reqs = await requestService.getMyRequests();
      setRequests(reqs);
    } catch (e) {
      console.error("Failed handling requests", e);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center w-fit gap-1">
            <CheckCircle size={12} /> Disetujui
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center w-fit gap-1">
            <XCircle size={12} /> Ditolak
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 flex items-center w-fit gap-1">
            <Clock size={12} /> Menunggu
          </span>
        );
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar / Menu */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-border">
          {user ? (
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Profil Warga
              </p>
              <p
                className="font-bold text-primary truncate sm:max-w-[200px]"
                title={user.user_metadata?.fullname || user.email}
              >
                {user.user_metadata?.fullname || user.email?.split("@")[0]}
              </p>
              {user.user_metadata?.rt && (
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Warga {user.user_metadata.rt}
                </p>
              )}
              <p className="text-xs text-gray-400 truncate w-full mb-3">
                {user.email}
              </p>
              <button
                onClick={() => {
                  authService.logout().then(() => window.location.reload());
                }}
                className="text-xs text-red-500 hover:underline mt-1"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-800 mb-2 font-medium">
                Masuk untuk akses penuh
              </p>
              <Link
                href="/login"
                className="block w-full py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent-hover transition-colors"
              >
                Masuk Akun
              </Link>
            </div>
          )}

          <button
            onClick={() => setActiveTab("list")}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between mb-2 transition-colors ${
              activeTab === "list"
                ? "bg-blue-50 text-accent font-bold ring-2 ring-blue-100"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText size={18} /> Daftar Layanan
            </span>
            <ChevronRight size={16} />
          </button>

          {user && (
            <>
              <button
                onClick={() => setActiveTab("history")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between mb-2 transition-colors ${
                  activeTab === "history"
                    ? "bg-blue-50 text-accent font-bold ring-2 ring-blue-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Clock size={18} /> Riwayat Pengajuan
                </span>
                {requests.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {requests.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("create")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                  activeTab === "create"
                    ? "bg-blue-50 text-accent font-bold ring-2 ring-blue-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <PlusCircle size={18} /> Buat Pengajuan
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3">
        {activeTab === "create" && (
          <RequestForm
            onCancel={() => setActiveTab("list")}
            onSuccess={() => {
              loadRequests();
              setActiveTab("history");
            }}
          />
        )}

        {activeTab === "list" && (
          <div className="space-y-6 animate-fade-in">
            {servicesData.services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-border hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                        Persyaratan:
                      </p>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        {service.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center gap-2 pt-1 md:w-48">
                    {user ? (
                      <button
                        onClick={() => setActiveTab("create")}
                        className="w-full py-2.5 px-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-sm text-sm text-center"
                      >
                        Ajukan Surat
                      </button>
                    ) : (
                      <div className="w-full text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg mb-2">
                          <Lock size={14} />
                          <span className="text-xs font-bold">
                            Login Diperlukan
                          </span>
                        </div>
                        <Link
                          href="/login"
                          className="block w-full py-2 px-4 border border-accent text-accent font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm"
                        >
                          Masuk
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && user && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">
                Riwayat Pengajuan
              </h2>
              <button
                onClick={() => loadRequests()}
                className="text-sm text-accent hover:underline"
              >
                Refresh
              </button>
            </div>

            {requests.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>Belum ada riwayat pengajuan.</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="mt-4 text-accent font-bold hover:underline"
                >
                  Buat Pengajuan Baru
                </button>
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-xl border border-neutral-border shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-800">
                        {req.service_type?.name || "Layanan Umum"}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(req.created_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {req.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        &quot;{req.notes}&quot;
                      </p>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-primary">
                    <ChevronRight />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
