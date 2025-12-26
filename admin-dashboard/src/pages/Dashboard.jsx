import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { generateSuratPengantar } from "../utils/pdfGenerator";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Printer,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequests();

    // Enable Real-time listener
    const subscription = supabase
      .channel("requests-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "requests" },
        async (payload) => {
          console.log("New Request Received!", payload);
          toast.success("🔔 Ada pengajuan surat baru masuk!", {
            duration: 5000,
          });

          // We need to fetch the full data (with profile relations) to display correctly
          // Or we can just just Trigger a Refetch for simplicity and accuracy
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchRequests() {
    try {
      // setLoading(true); // Don't block UI on background refresh
      const { data, error } = await supabase
        .from("requests")
        .select(
          `
            *,
            profiles:user_id(full_name, rt, phone_number),
            service_type:service_types(name)
        `
        )
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setRequests(data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(status) {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      const { error } = await supabase
        .from("requests")
        .update({ status: status })
        .eq("id", selectedRequest.id);

      if (error) throw error;

      // Refresh local state
      const updatedRequests = requests.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: status } : r
      );
      setRequests(updatedRequests);

      // Update selected request to reflect new status immediately
      const updatedSelected = { ...selectedRequest, status: status };
      setSelectedRequest(updatedSelected);

      toast.success(
        `Pengajuan berhasil di-${status === "approved" ? "SETUJUI" : "TOLAK"}`
      );

      // Auto print if approved
      if (status === "approved") {
        if (confirm("Cetak Surat Pengantar sekarang?")) {
          generateSuratPengantar(updatedSelected);
        }
      }
    } catch (err) {
      toast.error("Gagal update: " + err.message);
    } finally {
      setProcessing(false);
    }
  }

  function handlePrint(req) {
    generateSuratPengantar(req);
  }

  function getPublicUrl(path) {
    if (path.startsWith("http")) return path;
    const { data } = supabase.storage.from("documents").getPublicUrl(path);
    return data.publicUrl;
  }

  // Calculate Stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            Disetujui
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
            Menunggu
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Pantau permohonan surat warga secara real-time.
          </p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total Permohonan
            </p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Perlu Review</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.pending}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Disetujui</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.approved}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ditolak</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.rejected}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">
            Inbox Pengajuan Terbaru
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Pemohon
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Jenis Layanan
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-xs font-semibold uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    Sedang memuat data...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    Belum ada pengajuan masuk.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-4">
                      <div className="font-semibold text-gray-900">
                        {req.profiles?.full_name || "Tanpa Nama"}
                      </div>
                      <div className="text-xs text-gray-500">
                        RT: {req.profiles?.rt || "-"} • HP:{" "}
                        {req.profiles?.phone_number || "-"}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="material-symbols-outlined text-[18px] text-blue-500">
                          description
                        </span>
                        {req.service_type?.name}{" "}
                        {/* Corrected from service_types to service_type */}
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-500">
                      {new Date(req.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-8 py-4">{getStatusBadge(req.status)}</td>
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 transition-all shadow-sm shadow-blue-200"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Review */}
      {/* Modal Review */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Review Pengajuan
            </h2>
            <p className="text-gray-500 mb-6">
              Pastikan data warga sudah sesuai dengan persyaratan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b pb-2">
                  Data Pemohon
                </h4>
                <div>
                  <span className="block text-xs text-gray-500">
                    Nama Lengkap
                  </span>
                  <span className="text-gray-900 font-medium text-lg">
                    {selectedRequest.profiles?.full_name}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">
                    RT / Lokasi
                  </span>
                  <span className="text-gray-900 font-medium">
                    {selectedRequest.profiles?.rt}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Kontak</span>
                  <span className="text-gray-900 font-medium">
                    {selectedRequest.profiles?.phone_number}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b pb-2">
                  Detail Surat
                </h4>
                <div>
                  <span className="block text-xs text-gray-500">
                    Jenis Layanan
                  </span>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <FileText size={16} />
                    {selectedRequest.service_types?.name}
                  </div>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">
                    Keterangan Warga
                  </span>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 italic border border-gray-100">
                    "{selectedRequest.notes || "Tidak ada keterangan tambahan."}
                    "
                  </div>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">
                    Lampiran Dokumen
                  </span>
                  {selectedRequest.document_url ? (
                    <a
                      href={selectedRequest.document_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline bg-blue-50 p-2 rounded-lg w-fit"
                    >
                      <FileText size={16} /> Lihat Dokumen
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">
                      Tidak ada lampiran.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedRequest.id, "rejected")
                    }
                    className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedRequest.id, "approved")
                    }
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-105"
                  >
                    Setujui & Buat Surat
                  </button>
                </>
              )}
              {selectedRequest.status !== "pending" && (
                <span className="text-gray-500 italic flex items-center">
                  Status saat ini: {getStatusBadge(selectedRequest.status)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
