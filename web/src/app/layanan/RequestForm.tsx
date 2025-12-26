"use client";

import { useState, useEffect } from "react";
import { requestService, RequestItem } from "@/services/requestService";
import { User } from "@supabase/supabase-js";
import {
  Loader2,
  Upload,
  X,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Swal from "sweetalert2";

interface RequestFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface ServiceType {
  id: number;
  name: string;
  requirements: string;
}

export default function RequestForm({ onCancel, onSuccess }: RequestFormProps) {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceTypeId: "",
    notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Fetch Service Types
    requestService.getServiceTypes().then((data: any) => {
      // Adapt supabase response if needed, assumed matching interface
      setServiceTypes(data);
    });
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    // Validation
    const validFiles: File[] = [];
    for (const file of newFiles) {
      // Max 2MB
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire(
          "File Terlalu Besar",
          `File "${file.name}" melebihi 2MB.`,
          "warning"
        );
        continue;
      }
      // Type Check
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        Swal.fire(
          "Format Salah",
          `File "${file.name}" harus berupa JPG, PNG, atau PDF.`,
          "warning"
        );
        continue;
      }
      validFiles.push(file);
    }
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceTypeId) {
      Swal.fire(
        "Pilih Layanan",
        "Silakan pilih jenis layanan terlebih dahulu.",
        "warning"
      );
      return;
    }

    setLoading(true);
    try {
      await requestService.createRequest(
        Number(formData.serviceTypeId),
        formData.notes,
        files
      );
      Swal.fire({
        title: "Berhasil!",
        text: "Pengajuan surat Anda telah dikirim dan menunggu verifikasi.",
        icon: "success",
      }).then(() => {
        onSuccess();
      });
    } catch (error: any) {
      Swal.fire(
        "Gagal",
        error.message || "Terjadi kesalahan saat mengirim pengajuan.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-border shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Buat Pengajuan Baru</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Layanan
          </label>
          <select
            value={formData.serviceTypeId}
            onChange={(e) =>
              setFormData({ ...formData, serviceTypeId: e.target.value })
            }
            className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            required
          >
            <option value="">-- Pilih Layanan --</option>
            {serviceTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (Syarat: {t.requirements})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catatan / Keterangan
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows={3}
            className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            placeholder="Contoh: Untuk keperluan melamar kerja"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Dokumen (KTP, KK, dll)
          </label>
          <div
            className={`mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer relative ${
              dragActive
                ? "border-accent bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <Upload
                className={`mx-auto h-12 w-12 ${
                  dragActive ? "text-accent" : "text-gray-400"
                }`}
              />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-transparent rounded-md font-medium text-accent hover:text-accent-hover focus-within:outline-none"
                >
                  <span>Upload file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileInput}
                  />
                </label>
                <p className="pl-1">atau drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 2MB</p>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="text-accent shrink-0" size={20} />
                    <span className="text-sm text-gray-700 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 bg-white text-gray-700 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-accent-hover transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Kirim Pengajuan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
