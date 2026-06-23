import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import AdminRootLayout from "./layouts/AdminRootLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminAddListing from "./pages/admin/addListing/AdminAddListing";
import AdminManageListing from "./pages/admin/manageListing/AdminManageListing";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, lazy: () => import("./pages/App").then(m => ({ Component: m.default })) },
      { path: "checkout", lazy: () => import("./pages/CheckoutPage").then(m => ({ Component: m.default })) },
      { path: "sell/:gameType", lazy: () => import("./pages/SellAccountPage").then(m => ({ Component: m.default })) },
      { path: "see-more/:gameType", lazy: () => import("./pages/SeeMorePage").then(m => ({ Component: m.default })) },
      { path: "accounts/:accountId", lazy: () => import("./pages/AccountDetailPage").then(m => ({ Component: m.default })) },
      { path: "SeeMore", lazy: () => import("./pages/SeeMorePage").then(m => ({ Component: m.default })) },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin-dashboard",
    Component: AdminRootLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "manage-listings" , Component:  AdminManageListing },
      { path: "add-listing" , Component:  AdminAddListing }
    ]
  }
  
]);
