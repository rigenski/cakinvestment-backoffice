"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "../_constants/nav";
import NavFooter from "./nav-footer";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <SidebarMenu>
          {open ? (
            <SidebarMenuItem>
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={240}
                  height={240}
                  className="h-8 w-auto"
                />
              </Link>
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
