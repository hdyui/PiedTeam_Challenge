import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "@/shared/components/guards/RequireAuth";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";

// --- CÁC LAYOUT ---
import MainLayout from "@/shared/layouts/MainLayout";
import AdminMainLayout from "@/shared/layouts/AdminMainLayout";
import EmployeeProfileLayout from "@/features/employees/components/layout/EmployeeProfileLayout";

import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// --- ADMIN & EMPLOYEE (QUẢN LÝ) ---

import { ProfilePage } from "@/features/employees/pages/AccountProfilePage";

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
import { AccountListPage } from "@/features/employees/pages/AccountListPage";
import { AccountCreatePage } from "@/features/employees/pages/AccountCreatePage";
import { AccountEditPage } from "@/features/employees/pages/AccountEditPage";
import AccountDetailPage from "@/features/employees/pages/AccountDetailPage";
import { DepartmentListPage } from "@/features/departments/pages/DepartmentListPage";
import { DepartmentCreatePage } from "@/features/departments/pages/DepartmentCreatePage";
import { DepartmentEditPage } from "@/features/departments/pages/DepartmentEditPage";
import { DepartmentDetailPage } from "@/features/departments/pages/DepartmentDetailPage";

export const router = createBrowserRouter([
  // ==========================================
  // 1. AUTH ROUTES (Đứng độc lập, không bọc Layout nào để màn hình login trắng tinh)
  // ==========================================
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

  {
    path: "/admin",
    element: <RequireAuth allowedRoles={["Admin"]} />,
    children: [
      {
        element: <AdminMainLayout />, // <-- Layout vỏ Admin
        children: [
          { index: true, element: <AdminDashboardPage /> },

          // --- TRANG CÁ NHÂN CỦA ADMIN ---
          { path: "profile", element: <ProfilePage /> },
          // { path: "profile/change-password", element: <ChangePasswordPage /> },

          // --- QUẢN LÝ NHÂN VIÊN ---
          // Employees
          { path: "accounts", element: <AccountListPage /> },
          { path: "accounts/create", element: <AccountCreatePage /> },
          { path: "accounts/update/:id", element: <AccountEditPage /> },
          { path: "accounts/:id", element: <AccountDetailPage /> },

          // Departments (Thêm cục này vào)
          { path: "departments", element: <DepartmentListPage /> },
          { path: "departments/create", element: <DepartmentCreatePage /> },
          { path: "departments/update/:id", element: <DepartmentEditPage /> },
          { path: "departments/:id", element: <DepartmentDetailPage /> },

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

  // ==========================================
  // 4. EMPLOYEE ROUTES (Giao diện kẹp giữa: Header MainLayout + Sidebar ProfileLayout)
  // ==========================================
  {
    path: "/employee",
    element: <RequireAuth allowedRoles={["Employee", "Admin"]} />,
    children: [
      {
        // element: <MainLayout />, // <-- Lớp vỏ thứ nhất: Header chung
        element: <EmployeeProfileLayout />, // Tạm dùng MainLayout, nếu có EmployeeLayout riêng thì thay vào
        children: [
          { index: true, element: <div>Trang Dashboard Employee</div> },

          // KHU VỰC CÁ NHÂN CỦA NHÂN VIÊN (Có menu dọc bên trái)
          {
            element: <EmployeeProfileLayout />, // <-- Lớp vỏ thứ hai: Menu doc
            children: [
              // Bác thấy chưa? Cùng là <ProfilePage/> nhưng lại được nhét ở đây!
              { path: "profile", element: <ProfilePage /> },
              // { path: "profile/change-password", element: <ChangePasswordPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
