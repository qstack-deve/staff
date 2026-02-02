"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Navbar } from "@/components/layout/Navbar";

interface StaffNavbarProps {
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

export function StaffNavbar({ user }: StaffNavbarProps) {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <Navbar
      isSidebarOpen={isOpen}
      onToggleSidebar={toggleSidebar}
      onCloseSidebar={closeSidebar}
      logo={{
        text: "",
        href: "/dashboard",
      }}
      user={user}
      showNotifications={true}
      showThemeSwitcher={false}
    />
  );
}
