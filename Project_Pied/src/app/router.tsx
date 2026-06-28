import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "@/shared/components/guards/RequireAuth";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";
import MainLayout from "@/shared/layouts/MainLayout";

import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";
import AdminMainLayout from "@/shared/layouts/AdminMainLayout";

// ─── News ────────────────────────────────────────────────────────────────────
import {
  NewsListPage,
  NewsCreatePage,
  NewsEditPage,
  NewsDetailPage,
} from "@/features/news";
import PublicNewsPage from "@/features/publicNews/pages/PublicNewsPage";
import PublicNewsDetailPage from "@/features/publicNews/pages/PublicNewsDetailPage";
import { AdminDashboardPage } from "@/features/dashBoard";

export const router = createBrowserRouter([
  // --- PUBLIC & USER ROUTES ---
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "news", element: <PublicNewsPage /> },
      { path: "news/:slug", element: <PublicNewsDetailPage /> }, // ← thêm dòng này
      {
        element: <RequireUnAuth />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },

  // --- ADMIN ROUTES ---
  {
    path: "/admin",
    element: <RequireAuth allowedRoles={["Admin"]} />,
    children: [
      {
        element: <AdminMainLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },

          // Employees
          { path: "employees", element: <EmployeeListPage /> },
          { path: "employees/create", element: <EmployeeCreatePage /> },
          { path: "employees/update/:id", element: <EmployeeEditPage /> },
          { path: "employees/:id", element: <EmployeeDetailPage /> },

          // News
          { path: "news", element: <NewsListPage /> },
          { path: "news/create", element: <NewsCreatePage /> },
          { path: "news/update/:id", element: <NewsEditPage /> },
          { path: "news/:id", element: <NewsDetailPage /> },

          // Recruitments (chưa implement)
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

  // --- EMPLOYEE ROUTES ---
  {
    path: "/employee",
    element: <RequireAuth allowedRoles={["Employee"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <div>Trang dashboard của nhân viên</div> },
          {
            path: "profile",
            element: <div>Trang hiển thị profile nhân viên</div>,
          },
          {
            path: "profile/update",
            element: <div>Trang cập nhật profile nhân viên</div>,
          },
        ],
      },
    ],
  },
]);
