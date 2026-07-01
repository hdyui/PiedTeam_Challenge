import { NavLink, Outlet } from "react-router-dom";
import { User, Settings, Key } from "lucide-react"; // Lấy icon cho đẹp giống Admin

const EmployeeProfileLayout = () => {
  return (
    <div className="flex gap-8 max-w-5xl mx-auto w-full">
      {/* ===== SIDEBAR NHỎ BÊN TRÁI ===== */}
      <aside className="w-64 bg-slate-800 p-4 rounded-xl h-fit flex flex-col gap-2 shadow-md">
        <div className="mb-4 pb-4 border-b border-slate-600 text-center">
          <h2 className="text-lg font-bold text-white">Cài đặt tài khoản</h2>
        </div>

        <NavLink
          to="/employee/profile"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`
          }
        >
          <User className="w-4 h-4" />
          Hồ sơ của tôi
        </NavLink>

        <NavLink
          to="/employee/profile/update"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`
          }
        >
          <Settings className="w-4 h-4" />
          Cập nhật thông tin
        </NavLink>
      </aside>

      {/* ===== VÙNG CHỨA FORM BÊN PHẢI ===== */}
      <main className="flex-1 bg-slate-800 p-6 rounded-xl shadow-md text-white">
        {/* Nội dung form xem/sửa sẽ tự động chui vào đây */}
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeProfileLayout;
