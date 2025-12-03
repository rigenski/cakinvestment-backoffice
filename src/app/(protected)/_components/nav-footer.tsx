"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function NavFooter() {
  const { open } = useSidebar();

  if (!open) return null;

  const handleLogout = async () => {
    redirect("/api/logout");
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button
            variant="outline"
            className="hover:bg-destructive/10 hover:text-destructive w-full"
            onClick={handleLogout}
          >
            <Icon icon="lucide:log-out" className="size-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
