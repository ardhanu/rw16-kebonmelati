import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  Home,
  Users,
  Briefcase,
  MapPin,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  { label: "Dokumen", value: "file-text", icon: FileText },
  { label: "Rumah", value: "home", icon: Home },
  { label: "Orang", value: "users", icon: Users },
  { label: "Bisnis", value: "briefcase", icon: Briefcase },
  { label: "Lokasi", value: "map-pin", icon: MapPin },
  { label: "Gedung", value: "building", icon: Building },
];

const getIconComponent = (iconName) => {
  const found = ICON_OPTIONS.find(
    (opt) => opt.value === iconName || opt.value === iconName?.toLowerCase()
  );
  const Icon = found ? found.icon : FileText;
  return <Icon size={20} className="text-blue-500" />;
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null); // ID of service being edited
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    requirements: "",
    icon: "file-text", // Default icon value
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_types")
      .select("*")
      .order("id");
    if (error) toast.error("Gagal load data");
    else setServices(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Hapus layanan ini?")) return;

    const { error } = await supabase
      .from("service_types")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Gagal hapus: " + error.message);
    } else {
      toast.success("Layanan dihapus");
      setServices(services.filter((s) => s.id !== id));
    }
  }

  async function handleAdd(e) {
    e.preventDefault();

    // Convert comma-separated string to array
    const requirementsArray = newService.requirements
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload = { ...newService, requirements: requirementsArray };

    const { data, error } = await supabase
      .from("service_types")
      .insert([payload])
      .select();
    if (error) {
      toast.error("Gagal tambah: " + error.message);
    } else {
      toast.success("Layanan berhasil ditambah");
      setServices([...services, data[0]]);
      setNewService({
        name: "",
        description: "",
        requirements: "",
        icon: "file-text",
      });
    }
  }

  async function handleUpdate(id, updatedData) {
    // If requirements is a string, convert to array
    if (typeof updatedData.requirements === "string") {
      updatedData.requirements = updatedData.requirements
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);
    }

    const { error } = await supabase
      .from("service_types")
      .update(updatedData)
      .eq("id", id);
    if (error) {
      toast.error("Gagal update: " + error.message);
    } else {
      toast.success("Update berhasil");
      setServices(
        services.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
      );
      setIsEditing(null);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manajemen Layanan
      </h2>

      {/* Add New Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          {" "}
          <Plus size={20} /> Tambah Layanan Baru
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            required
            placeholder="Nama Layanan (e.g. Surat Keterangan Usaha)"
            className="border p-2 rounded"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />

          <div className="flex items-center gap-2 border p-2 rounded bg-white">
            {getIconComponent(newService.icon)}
            <select
              className="w-full bg-transparent outline-none"
              value={newService.icon}
              onChange={(e) =>
                setNewService({ ...newService, icon: e.target.value })
              }
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Deskripsi Singkat"
            required
            className="border p-2 rounded md:col-span-2"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <textarea
            placeholder="Syarat (Pisahkan dengan koma)"
            required
            className="border p-2 rounded md:col-span-2"
            value={newService.requirements}
            onChange={(e) =>
              setNewService({ ...newService, requirements: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 md:col-span-2"
          >
            Simpan Layanan
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nama Layanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Syarat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">
                  {isEditing === s.id ? (
                    <input
                      className="border p-1 w-full"
                      defaultValue={s.name}
                      id={`edit-name-${s.id}`}
                    />
                  ) : (
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {getIconComponent(s.icon || "file-text")}
                      {s.name}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {s.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {isEditing === s.id ? (
                    <textarea
                      className="border p-1 w-full"
                      defaultValue={s.requirements}
                      id={`edit-req-${s.id}`}
                    />
                  ) : Array.isArray(s.requirements) ? (
                    s.requirements.join(", ")
                  ) : (
                    s.requirements
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {isEditing === s.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdate(s.id, {
                            name: document.getElementById(`edit-name-${s.id}`)
                              .value,
                            requirements: document.getElementById(
                              `edit-req-${s.id}`
                            ).value,
                          })
                        }
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(s.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
