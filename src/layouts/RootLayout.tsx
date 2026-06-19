import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import NetworkLoading from "@/components/layouts/NetworkLoading";
import { Outlet, useLocation, useNavigation } from "react-router";
import { StoreProvider } from "@/context/StoreContext";
import { Suspense, useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    //
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <StoreProvider>
        {" "}
        <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-slate-950 text-slate-100 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
          <Header />{" "}
          <main className="w-full md:pt-20 pt-32 xs:pt-40  max-w-full flex-grow overflow-x-hidden">
            {/* Main content will go here */}
            <Outlet />{" "}
          </main>
          <Footer />
          <NetworkLoading isRouteLoading={navigation.state !== "idle"} />{" "}
        </div>{" "}
      </StoreProvider>
    </Suspense>
  );
};

export default RootLayout;
