import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/shared/components/ui/button";
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

  // const [renderLogin, setRenderLogin] = useState(false);
  // const handleLogin = () => {
  //   localStorage.setItem("accessToken", "fake-token-1234567"); // Simulate storing a token after login
  //   setRender(!renderLogin); // Cách 1: Cập nhật state để trigger re-render
  //   navigate("/"); // Navigate to the home page after login
  // };
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HEADER - Tường nhà (Cố định) ===== */}
      <header className="bg-primary text-white px-4 py-4 sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            Company CMS
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
    </div>
  );
};

export default MainLayout;
