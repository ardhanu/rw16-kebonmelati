import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";
import { supabase } from "./lib/supabase";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Users from "./pages/Users";
import toast, { Toaster } from "react-hot-toast";

// Components for Protection
function PrivateRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminLayout({ children }) {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navClass = (path) =>
    `flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
      location.pathname === path
        ? "bg-gray-800 text-white border-r-4 border-blue-500"
        : ""
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RW.016 Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">Sistem Pelayanan Warga</p>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <Link to="/dashboard" className={navClass("/dashboard")}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/services" className={navClass("/services")}>
            <FileText size={20} />
            Layanan Surat
          </Link>
          <Link to="/users" className={navClass("/users")}>
            <UsersIcon size={20} />
            Data Warga
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Services />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
