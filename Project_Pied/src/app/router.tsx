// import { HomePage } from "@/features/auth/pages/HomePage";
// import { LoginPage } from "@/features/auth/pages/LoginPage";
// import ProfilePage from "@/features/auth/pages/ProfilePage";
// import { RegisterPage } from "@/features/auth/pages/RegisterPage";
// import SettingPage from "@/features/auth/pages/SettingPage";
// import { createBrowserRouter } from "react-router-dom";
// import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";
// import RequireAuth from "@/shared/components/guards/RequireAuth";
// import MainLayout from "@/features/auth/components/layouts/MainLayout";
// import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
// import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
// import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";
// import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
// import AdminMainLayout from "@/features/employees/components/layout/AdminMainLayout";

// export const router = createBrowserRouter([
//   {
//     path: "/", // Đường dẫn gốc
//     element: <MainLayout />, // Layout bọc ngoài (Cái nhà)
//     children: [
//       // Các trang con (Nội thất)
//       {
//         index: true, // Trang mặc định khi vào "/"
//         element: <HomePage />,
//       },
//       {
//         element: <RequireUnAuth />, // Guard bọc ở đây
//         children: [{ path: "login", element: <LoginPage /> }],
//       },
//     ],
//   },

//   {
//     path: "/admin", // Đường dẫn gốc
//     element: <AdminMainLayout />, // Layout bọc ngoài (Cái nhà)
//     children: [
//       // Các trang con (Nội thất)
//       {
//         index: true, // Trang mặc định khi vào "/"
//         element: <EmployeeListPage />,
//       },
//       {
//         element: <RequireAuth />, // Guard bọc ở đây
//         children: [
//           { path: "create", element: <EmployeeCreatePage /> },
//           { path: "detail", element: <EmployeeDetailPage /> },
//           { path: "edit", element: <EmployeeEditPage /> },
//           { path: "list", element: <EmployeeListPage /> },
//         ],
//       },

//       {
//         element: <RequireUnAuth />, // Guard bọc ở đây
//         children: [{ path: "login", element: <LoginPage /> }],
//       },
//     ],
//   },
// ]);
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/features/auth/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/auth/pages/ProfilePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import SettingPage from "@/features/auth/pages/SettingPage";
import RequireUnAuth from "@/shared/components/guards/RequireUnAuth";
import RequireAuth from "@/shared/components/guards/RequireAuth";
import MainLayout from "@/features/auth/components/layouts/MainLayout";
import AdminMainLayout from "@/features/employees/components/layout/AdminMainLayout";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";
import EmployeeListPage from "@/features/employees/pages/EmployeeListPage";
import { NewsListPage } from "@/features/news/pages/NewsListPage";
import { NewsDetailPage } from "@/features/news/pages/NewsDetailPage";
import { NewsCreatePage } from "@/features/news/pages/NewsCreatePage";
import { NewsEditPage } from "@/features/news/pages/NewsEditPage";

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
      // Các route KHÔNG yêu cầu đăng nhập (đã log in thì không được vào)
      {
        element: <RequireUnAuth />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      // Các route BẮT BUỘC đăng nhập mới được xem
      {
        element: <RequireAuth />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "setting", element: <SettingPage /> },
          {
            path: "news",
            children: [
              { index: true, element: <NewsListPage /> },
              { path: "create", element: <NewsCreatePage /> },
              { path: ":id", element: <NewsDetailPage /> },
              { path: ":id/edit", element: <NewsEditPage /> },
            ],
          },
        ],
      },
    ],
  },

  // --- ADMIN ROUTES ---
  {
    path: "/admin",
    // Bọc Guard ngay từ ngoài cùng để bảo vệ luôn cả Layout của Admin
    element: <AdminMainLayout />,
    children: [
      {
        // Gom nhóm toàn bộ tính năng của employees vào một path
        path: "employees",
        children: [
          { index: true, element: <EmployeeListPage /> }, // Đường dẫn: /admin/employees
          { path: "create", element: <EmployeeCreatePage /> }, // Đường dẫn: /admin/employees/create
          { path: ":id", element: <EmployeeDetailPage /> }, // Đường dẫn: /admin/employees/123
          { path: ":id/edit", element: <EmployeeEditPage /> }, // Đường dẫn: /admin/employees/123/edit
        ],
      },
    ],
  },
]);
