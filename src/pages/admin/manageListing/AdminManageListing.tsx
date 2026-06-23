import { DataTable } from "@/components/admimDashboard/data-table";
import { columns } from "@/components/admimDashboard/columns";
import data from '../dashboard/data.json'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admimDashboard/app-sidebar";

import { SiteHeader } from "@/components/admimDashboard/site-header";


const AdminManageListing = () => {
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
              <div className="p-5 pt-0">
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminManageListing;
