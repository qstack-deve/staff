"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Sidebar, SidebarMenuGroup } from "@/components/layout/Sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  User,
  Code2,
} from "lucide-react";

const adminMenuGroups: SidebarMenuGroup[] = [
  {
    label: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Admin",
    items: [
      {
        label: "Staff Management",
        href: "/admin/staff",
        icon: Users,
      },
      {
        label: "Jobs & Postings",
        href: "/admin/jobs",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/admin/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={closeSidebar}
      menuGroups={adminMenuGroups}
      logo={{
        text: "Quantum Dashboard",
        href: "/admin",
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </div>
        ),
      }}
    />
  );
}
