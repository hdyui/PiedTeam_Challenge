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
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/recruiments", label: "Recruiting", icon: Briefcase },
];

const MainLayout = () => {
  // const navigate = useNavigate();
  const token = useAuthStore((state) => !!state.accessToken);
  //const token = localStorage.getItem("accessToken");
  // const [render, setRender] = useState(false);
  // const clearTokens = useAuthStore((state) => state.clearTokens);
  const useHandleLogout = useLogoutMutation();
  const handleLogout = async () => {
    useHandleLogout.mutate();
  };

  // const [renderLogin, setRenderLogin] = useState(false);
  // const handleLogin = () => {
  //   localStorage.setItem("accessToken", "fake-token-1234567"); // Simulate storing a token after login
  //   setRender(!renderLogin); // Cách 1: Cập nhật state để trigger re-render
  //   navigate("/"); // Navigate to the home page after login
  // };

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

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.to}
                key={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 ${
                    isActive ? "bg-primary/10 font-medium" : ""
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

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

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center px-4 md:px-6">
          <div className="flex items-center gap-3 md:hidden">
            <Button variant="ghost" className="p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 gap-2 w-1/3">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                placeholder="Search employees, news..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div className="ml-auto flex items-center gap-3">
              <Button variant="ghost" className="p-2">
                <Bell className="w-5 h-5" />
              </Button>

              {token ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-sm text-gray-600">
                    Admin
                  </div>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <NavLink to="/login">
                  {({ isActive }) => (
                    <Button
                      variant="ghost"
                      className={
                        isActive ? "bg-white/10 underline" : "text-white/80"
                      }
                    >
                      Login
                    </Button>
                  )}
                </NavLink>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
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
