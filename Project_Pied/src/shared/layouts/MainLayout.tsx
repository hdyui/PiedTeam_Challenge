import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/shared/components/ui/button";
import {
  Home,
  Users,
  Newspaper,
  Briefcase,
  Bell,
  LogOut,
  Menu,
  Search,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/recruiments", label: "Recruiting", icon: Briefcase },
];
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";

const MainLayout = () => {
  // const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => !!state.accessToken);
  //const token = localStorage.getItem("accessToken");
  // const [render, setRender] = useState(false);
  // const clearTokens = useAuthStore((state) => state.clearTokens);
  const useHandleLogout = useLogoutMutation();
  const handleLogout = async () => {
    useHandleLogout.mutate();
  };
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              P
            </div>
            <div className="text-lg font-semibold">PiedTeam</div>
          </NavLink>
        </div>

        <div className="px-4 py-4 border-t">
          {token ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                  U
                </div>
                <div>
                  <div className="text-sm font-medium">User</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* ===== HEADER - Tường nhà (Cố định) ===== */}
        <header className="bg-primary text-white px-4 py-4 sticky top-0 z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <NavLink to="/" className="text-xl font-bold">
              Company CMS
            </NavLink>

            <div className="flex flex-wrap items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 underline"
                      : "text-white/80 hover:bg-white/10"
                  }`
                }
              >
                Home
              </NavLink>
              {token && role === "Employee" && (
                <NavLink
                  to="/employee"
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/10 underline"
                        : "text-white/80 hover:bg-white/10"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
              {token && role === "Admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/10 underline"
                        : "text-white/80 hover:bg-white/10"
                    }`
                  }
                >
                  Admin Panel
                </NavLink>
              )}
              {token ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  disabled={useHandleLogout.isPending}
                >
                  Logout
                </Button>
              ) : (
                <NavLink to="/login">
                  <Button>Login</Button>
                </NavLink>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <footer className="bg-white border-t p-4 text-sm text-center text-gray-500">
          © 2026 Business Management — PiedTeam
        </footer>
      </div>
    </div>
  );
};
export default MainLayout;
