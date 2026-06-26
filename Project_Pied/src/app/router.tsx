import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/auth/pages/ProfilePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import SettingPage from "@/features/auth/pages/SettingPage";
import { createBrowserRouter } from "react-router-dom";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";
import RequireAuth from "@/shared/components/guards/RequireAuth";
import MainLayout from "@/features/auth/components/layouts/MainLayout";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";
import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
import AdminMainLayout from "@/features/employees/components/layout/AdminMainLayout";

export const router = createBrowserRouter([
  {
    path: "/", // Đường dẫn gốc
    element: <MainLayout />, // Layout bọc ngoài (Cái nhà)
    children: [
      // Các trang con (Nội thất)
      {
        index: true, // Trang mặc định khi vào "/"
        element: <HomePage />,
      },
      {
        element: <RequireAuth />, // Guard bọc ở đây
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },

      {
        element: <RequireUnAuth />, // Guard bọc ở đây
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },

  {
    path: "admin", // Đường dẫn gốc
    element: <AdminMainLayout />, // Layout bọc ngoài (Cái nhà)
    children: [
      // Các trang con (Nội thất)
      {
        index: true, // Trang mặc định khi vào "/"
        element: <EmployeeListPage />,
      },
      {
        element: <RequireAuth />, // Guard bọc ở đây
        children: [
          { path: "create", element: <EmployeeCreatePage /> },
          { path: "detail", element: <EmployeeDetailPage /> },
          { path: "edit", element: <EmployeeEditPage /> },
          { path: "list", element: <EmployeeListPage /> },
        ],
      },

      {
        element: <RequireUnAuth />, // Guard bọc ở đây
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
