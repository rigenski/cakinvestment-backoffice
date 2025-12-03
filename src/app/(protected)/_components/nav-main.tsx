"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    isSection?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {items.map((item, index) => {
        // Render section heading
        if (item.isSection && item.items) {
          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="text-muted-foreground px-4 py-2 text-xs font-semibold uppercase">
                {item.title}
              </SidebarGroupLabel>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      tooltip={subItem.title}
                      className="justify-start px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
                      size="lg"
                      isActive={pathname === subItem.url}
                      onClick={() => {
                        router.push(subItem.url);
                      }}
                    >
                      {subItem.icon && <Icon icon={subItem.icon} />}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {subItem.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          );
        }

        // Render regular menu item
        return (
          <SidebarGroup key={item.title}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="justify-start px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
                  size="lg"
                  isActive={pathname === item.url}
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  {item.icon && <Icon icon={item.icon} />}
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
