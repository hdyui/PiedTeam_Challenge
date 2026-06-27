import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/shared/components/ui/button";
<<<<<<< HEAD
<<<<<<< HEAD:Project_Pied/src/features/auth/components/layouts/MainLayout.tsx
import { useLogoutMutation } from "../../hooks/useAuth";
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
=======
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";
>>>>>>> uyen-fe:Project_Pied/src/shared/layouts/MainLayout.tsx
=======
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";
>>>>>>> uyen-fe

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

  // const [renderLogin, setRenderLogin] = useState(false);
  // const handleLogin = () => {
  //   localStorage.setItem("accessToken", "fake-token-1234567"); // Simulate storing a token after login
  //   setRender(!renderLogin); // Cách 1: Cập nhật state để trigger re-render
  //   navigate("/"); // Navigate to the home page after login
  // };
  return (
<<<<<<< HEAD
<<<<<<< HEAD:Project_Pied/src/features/auth/components/layouts/MainLayout.tsx
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              P
            </div>
            <div className="text-lg font-semibold">PiedTeam</div>
=======
=======
>>>>>>> uyen-fe
    <div className="min-h-screen flex flex-col">
      {/* ===== HEADER - Tường nhà (Cố định) ===== */}
      <header className="bg-primary text-white px-4 py-4 sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            Company CMS
<<<<<<< HEAD
>>>>>>> uyen-fe:Project_Pied/src/shared/layouts/MainLayout.tsx
=======
>>>>>>> uyen-fe
          </NavLink>

          <div className="flex gap-4">
            {/* <ModeToggle /> */}
            <div className="flex gap-2">
              <NavLink to="/">
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    className={
                      isActive ? "bg-white/10 underline" : "text-white/80"
                    }
                  >
                    Home
                  </Button>
                )}
              </NavLink>

<<<<<<< HEAD
<<<<<<< HEAD:Project_Pied/src/features/auth/components/layouts/MainLayout.tsx
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
=======
=======
>>>>>>> uyen-fe
              {token && (
                <>
                  {/* Nút bấm dành riêng cho Employee */}
                  {role === "Employee" && (
                    <NavLink to="/employee">
                      {({ isActive }) => (
                        <Button
                          variant="ghost"
                          className={
                            isActive ? "bg-white/10 underline" : "text-white/80"
                          }
                        >
                          Dashboard
                        </Button>
                      )}
                    </NavLink>
                  )}

                  {/* Nút bấm dành riêng cho Admin (Phòng hờ Admin đứng ở trang Home muốn quay lại Admin) */}
                  {role === "Admin" && (
                    <NavLink to="/admin">
                      {({ isActive }) => (
                        <Button
                          variant="ghost"
                          className={
                            isActive ? "bg-white/10 underline" : "text-white/80"
                          }
                        >
                          Admin Panel
                        </Button>
                      )}
                    </NavLink>
                  )}
<<<<<<< HEAD
>>>>>>> uyen-fe:Project_Pied/src/shared/layouts/MainLayout.tsx
=======
>>>>>>> uyen-fe

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    disabled={useHandleLogout.isPending}
                  >
                    Logout
                  </Button>
                </>
              )}

              {!token && (
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
        </div>
      </header>

<<<<<<< HEAD
<<<<<<< HEAD:Project_Pied/src/features/auth/components/layouts/MainLayout.tsx
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
=======
=======
>>>>>>> uyen-fe
      {/* ===== MAIN CONTENT - Outlet (Thay đổi theo URL) ===== */}
      <main className="min-h-screen bg-primary text-white overflow-x-hidden">
        <section className="w-full max-w-6xl mx-auto px-6 py-14">
          <Outlet />
        </section>
      </main>
      {/* ===== FOOTER - Nền nhà (Cố định) ===== */}
      <footer className="mt-auto bg-primary p-6 text-center text-sm text-gray-600 border-t border-white/10">
        © 2026 Company CMS - Piedteam React Course
      </footer>
<<<<<<< HEAD
>>>>>>> uyen-fe:Project_Pied/src/shared/layouts/MainLayout.tsx
=======
>>>>>>> uyen-fe
    </div>
  );
};

export default MainLayout;
