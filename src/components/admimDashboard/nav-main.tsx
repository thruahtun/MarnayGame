import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Link } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const [activeItem, setActiveItem] = useState<string>(items[0]?.title || "");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {
          items.map((item) => {
            const isActive = activeItem === item.title;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={
                    isActive
                      ? "bg-gray-200 text-black hover:bg-gray-400 hover:text-white"
                      : ""
                  }
                  tooltip={item.title}
                  onClick={() => setActiveItem(item.title)}
                >
                  <Link
                    to={item.url}
                    className="flex items-center gap-2 w-full h-full"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );})}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
