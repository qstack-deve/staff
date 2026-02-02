"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Navbar } from "@/components/layout/Navbar";

interface AdminNavbarProps {
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

export function AdminNavbar({ user }: AdminNavbarProps) {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <Navbar
      isSidebarOpen={isOpen}
      onToggleSidebar={toggleSidebar}
      onCloseSidebar={closeSidebar}
      logo={{
        text: "",
        href: "/admin",
      }}
      user={user}
      showNotifications={true}
      showThemeSwitcher={false}
    />
  );
}
