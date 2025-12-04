"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/stores/auth";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ChangePasswordDialog from "./dialog/change-password-dialog";
import { Button } from "@/components/ui/button";

export default function AppBar() {
  const { user } = useAuth();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.fullName || "User";
  const userRole = user?.status || "User";

  return (
    <header className="border-sidebar-border flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between pr-6">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <h2 className="-mb-0.5 text-lg font-semibold">CAK INVESTMENT CLUB</h2>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none focus:outline-none">
                <Avatar>
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm leading-none font-semibold">
                    {userName}
                  </span>
                  <span className="text-muted-foreground mt-1 text-xs leading-none">
                    {userRole}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Button
                variant="ghost"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                <Icon icon="lucide:key-round" className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onClose={setIsChangePasswordOpen}
      />
    </header>
  );
}
