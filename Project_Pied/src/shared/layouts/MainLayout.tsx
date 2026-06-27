// src/shared/layouts/MainLayout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Trang chủ" },
  { to: "/news", label: "Tin tức" },
  { to: "/recruitments", label: "Tuyển dụng" },
];

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-gray-900"
          >
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              V
            </div>
            VNZ Company
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  pathname === link.to
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Login button */}
          <Link
            to="/login"
            className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* ── Body: Sidebar + Content ── */}
      <div className="flex flex-1 max-w-6xl w-full mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Danh mục
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-sm px-3 py-2 rounded-md transition-colors ${
                  pathname === link.to
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 VNZ Company. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/news" className="hover:text-gray-600">
              Tin tức
            </Link>
            <Link to="/recruitments" className="hover:text-gray-600">
              Tuyển dụng
            </Link>
            <Link to="/login" className="hover:text-gray-600">
              Đăng nhập
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
