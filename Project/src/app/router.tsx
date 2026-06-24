import RequireAuth from "@/features/auth/components/guards/RequireAuth";
import RequireUnauth from "@/features/auth/components/guards/RequireUnauth";
import MainLayout from "@/shared/layouts/MainLayout";
import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/auth/pages/ProfilePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import SettingPage from "@/features/auth/pages/SettingPage";
import { createBrowserRouter } from "react-router-dom";

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
        element: <RequireAuth />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingPage /> },
        ],
      },
      {
        element: <RequireUnauth />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },
]);
