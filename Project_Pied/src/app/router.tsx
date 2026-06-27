import { createBrowserRouter } from "react-router-dom";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";
import RequireAuth from "@/shared/components/guards/RequireAuth";

import MainLayout from "@/shared/layouts/MainLayout"; // Layout chung cho Public & Employee
import AdminMainLayout from "@/shared/layouts/AdminMainLayout";

// public & auth
import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// admin & employee
import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";
import EmployeeProfileLayout from "@/features/employees/components/layout/EmployeeProfileLayout";

export const router = createBrowserRouter([
  // --- PUBLIC & USER ROUTES ---
  {
    path: "/",
    element: <MainLayout />, // Layout bọc ngoài cho User
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "news", element: <div>Trang hiển thị news (Public)</div> }, // Path: /news
      {
        element: <RequireUnAuth />, // Guard bọc ở đây chặn quay về login or regis nếu đã đăng nhập
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },

  // --- ADMIN ROUTES ---
  {
    path: "/admin", // Đường dẫn gốc
    element: <RequireAuth allowedRoles={["Admin"]} />,
    children: [
      {
        element: <AdminMainLayout />,
        children: [
          { index: true, element: <div>Trang dashboard của Admin</div> },

          { path: "employees", element: <EmployeeListPage /> },
          { path: "employees/create", element: <EmployeeCreatePage /> },
          { path: "employees/update/:id", element: <EmployeeEditPage /> },
          { path: "employees/:id", element: <EmployeeDetailPage /> },

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
  {
    path: "/employee",
    element: <RequireAuth allowedRoles={["Employee"]} />,
    children: [
      {
        element: <EmployeeProfileLayout />, // Tạm dùng MainLayout, nếu có EmployeeLayout riêng thì thay vào
        children: [
          { index: true, element: <div>Trang dashboard của nhân viên</div> }, // Path: /employee
          {
            path: "profile",
            element: <div>Trang hiển thị profile nhân viên</div>,
          }, // path: /employee/profile
          {
            path: "profile/update",
            element: <div>Trang cập nhật profile nhân viên</div>,
          }, // path: /employee/profile/update
        ],
      },
    ],
  },
]);
