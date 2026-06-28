import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "@/shared/components/guards/RequireAuth";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";

// --- CÁC LAYOUT ---
import MainLayout from "@/shared/layouts/MainLayout";
import AdminMainLayout from "@/shared/layouts/AdminMainLayout";
import EmployeeProfileLayout from "@/features/employees/components/layout/EmployeeProfileLayout";

// --- PUBLIC & AUTH ---
import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// --- ADMIN & EMPLOYEE (QUẢN LÝ) ---
import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";

export const router = createBrowserRouter([
  // ==========================================
  // 1. AUTH ROUTES (Đứng độc lập, không bọc Layout nào để màn hình login trắng tinh)
  // ==========================================
  {
    element: <RequireUnAuth />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  // ==========================================
  // 2. PUBLIC ROUTES (Dành cho khách vãng lai, có Header chung)
  // ==========================================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "news", element: <div>Trang hiển thị news (Public)</div> },
    ],
  },

  // ==========================================
  // 3. ADMIN ROUTES (Giao diện full màn hình có Sidebar)
  // ==========================================
  {
    path: "/admin",
    element: <RequireAuth allowedRoles={["Admin"]} />,
    children: [
      {
        element: <AdminMainLayout />, // <-- Layout vỏ Admin
        children: [
          { index: true, element: <div>Trang dashboard của Admin</div> },

          // --- TRANG CÁ NHÂN CỦA ADMIN ---
          { path: "profile", element: <EmployeeProfileLayout /> },
          // { path: "profile/change-password", element: <ChangePasswordPage /> },

          // --- QUẢN LÝ NHÂN VIÊN ---
          { path: "employees", element: <EmployeeListPage /> },
          { path: "employees/create", element: <EmployeeCreatePage /> },
          { path: "employees/update/:id", element: <EmployeeEditPage /> },
          { path: "employees/:id", element: <EmployeeDetailPage /> },

          // --- QUẢN LÝ NỘI DUNG ---
          { path: "news", element: <div>Admin News List</div> },
          { path: "news/create", element: <div>Admin Create News</div> },
          { path: "news/update/:id", element: <div>Admin Update News</div> },
          { path: "news/:id", element: <div>Admin Detail News</div> },

          { path: "recruitments", element: <div>Admin Recruitments List</div> },
          {
            path: "recruitments/create",
            element: <div>Admin Create Recruitment</div>,
          },
          {
            path: "recruitments/update/:id",
            element: <div>Admin Update Recruitment</div>,
          },
          {
            path: "recruitments/:id",
            element: <div>Admin Detail Recruitment</div>,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 4. EMPLOYEE ROUTES (Giao diện kẹp giữa: Header MainLayout + Sidebar ProfileLayout)
  // ==========================================
  {
    path: "/employee",
    element: <RequireAuth allowedRoles={["Employee", "Admin"]} />,
    children: [
      {
        element: <EmployeeProfileLayout />, // Tạm dùng MainLayout, nếu có EmployeeLayout riêng thì thay vào
        children: [
          { index: true, element: <div>Trang Dashboard Employee</div> },

          // KHU VỰC CÁ NHÂN CỦA NHÂN VIÊN (Có menu dọc bên trái)
          {
            element: <EmployeeProfileLayout />, // <-- Lớp vỏ thứ hai: Menu doc
            children: [
              // Bác thấy chưa? Cùng là <ProfilePage/> nhưng lại được nhét ở đây!
              { path: "profile", element: <EmployeeProfileLayout /> },
              // { path: "profile/change-password", element: <ChangePasswordPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
