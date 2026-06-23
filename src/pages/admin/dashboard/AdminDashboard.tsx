import { SectionCards } from "@/components/admimDashboard/section-cards";
import { SiteHeader } from "@/components/admimDashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { AppSidebar } from "@/components/admimDashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/admimDashboard/chart-area-interactive";
import { DataTable } from "@/components/admimDashboard/data-table";
import { columns } from "@/components/admimDashboard/columns";
import { Button } from "@base-ui/react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";

export default function AdminDashboard() {
  const limitedData = data.slice(0, 5);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="text-xl pl-5 pt-5">
                Recent Listings
                <span className="block text-xs  text-gray-300 pt-2">
                  Latest marketplace records
                </span>
              </div>
              <div className="w-full flex justify-end pr-5">
                <Link to="/admin-dashboard/manage-listings">
                  <Button className="-mt-8 rounded-md cursor-pointer flex items-center gap-2 border-2 bg-white px-4 py-2 text-black hover:bg-zinc-100">
                    <span>See More</span>
                    <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="p-5 pt-0">
                <DataTable columns={columns} data={limitedData} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
