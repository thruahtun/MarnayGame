import Footer from "@/components/layouts/Footer";
import Header  from "@/components/layouts/Header";
import { Outlet } from "react-router";
import { StoreProvider } from "@/context/StoreContext";
import CartDrawer from "@/components/cart/CartDrawer";

const RootLayout = () => {
    return ( 
        <StoreProvider>
            <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
                <Header />
                <main className="flex-grow">
                    {/* Main content will go here */}
                    <Outlet />
                </main>
                <Footer />
                <CartDrawer />
            </div>
        </StoreProvider>
     );
}
 
export default RootLayout;