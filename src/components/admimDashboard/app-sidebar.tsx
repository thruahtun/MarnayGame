import * as React from "react"

import { NavMain } from "@/components/admimDashboard/nav-main"
import { NavSecondary } from "@/components/admimDashboard/nav-secondary"
import { NavUser } from "@/components/admimDashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon,  CommandIcon, FilePlusCorner, User } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Manage Listing",
      url: "manage-listings",
      icon: <ListIcon />,
    },
    {
      title: "Add Listing",
      url: "add-listing",
      icon: <FilePlusCorner />,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: "profile",
      icon: <User />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Deno & Marnay</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
