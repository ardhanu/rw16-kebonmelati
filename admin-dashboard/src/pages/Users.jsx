import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Trash2, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null); // Stores user obj to delete

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    // Fetch profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");

    if (error) {
      toast.error("Gagal load users");
    } else {
      setUsers(profiles || []);
    }
    setLoading(false);
  }

  async function toggleRole(id, currentRole) {
    const newRole = currentRole === "admin" ? "citizen" : "admin";
    // We can also replace this confirm with a finer interaction inside the toast or a modal,
    // but for now focusing on the Delete Request as per user instruction.
    if (!confirm(`Ubah role user ini menjadi ${newRole}?`)) return;

    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);

    if (error) {
      toast.error("Gagal update role: " + error.message);
    } else {
      toast.success(`Role user diubah menjadi ${newRole}`);
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    }
  }

  // Trigger Modal
  function handleDeleteRequest(user) {
    setDeleteModal(user);
  }

  // Actual Delete Logic
  async function confirmDeleteUser() {
    if (!deleteModal) return;

    const { error } = await supabase.rpc("delete_user_by_admin", {
      target_user_id: deleteModal.id,
    });

    if (error) {
      toast.error("Gagal hapus: " + error.message);
    } else {
      toast.success("User berhasil dihapus permanen");
      setUsers(users.filter((u) => u.id !== deleteModal.id));
      setDeleteModal(null); // Close modal
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone_number?.includes(search) ||
      u.rt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Warga</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari warga (Nama, RT, HP)..."
          className="w-full border p-3 rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kontak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {u.full_name || "Belum ada nama"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{u.rt}</div>
                    <div>{u.phone_number}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRole(u.id, u.role)}
                        className="text-blue-600 hover:text-blue-900 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 text-xs"
                      >
                        {u.role === "admin" ? "Turunkan" : "Jadikan Admin"}
                      </button>

                      <button
                        onClick={() => handleDeleteRequest(u)}
                        className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded transition-colors"
                        title="Hapus User Permanen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filteredUsers.length === 0 && !loading && (
          <div className="p-4 text-center text-gray-500">
            Tidak ada data ditemukan
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              Hapus User Ini?
            </h3>
            <p className="text-center text-gray-500 text-sm mb-6">
              Anda akan menghapus user{" "}
              <strong>"{deleteModal.full_name}"</strong>.
              <br />
              Data login dan profil akan hilang permanen dan tidak bisa
              dikembalikan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-lg shadow-red-200"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
