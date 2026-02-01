"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Sidebar, SidebarMenuGroup } from "@/components/layout/Sidebar";
import {
  LayoutDashboard,
  User,
  Settings,
  Briefcase,
  Code2,
} from "lucide-react";

const staffMenuGroups: SidebarMenuGroup[] = [
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
    label: "Work",
    items: [
      {
        label: "My Jobs",
        href: "/jobs",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function StaffSidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={closeSidebar}
      menuGroups={staffMenuGroups}
      logo={{
        text: "QStack",
        href: "/dashboard",
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </div>
        ),
      }}
    />
  );
}
