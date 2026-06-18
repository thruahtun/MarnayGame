import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";

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
]);
