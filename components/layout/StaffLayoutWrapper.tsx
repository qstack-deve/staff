"use client";

import { SidebarProvider } from "@/contexts/SidebarContext";
import { StaffSidebar } from "./StaffSidebar";
import { StaffNavbar } from "./StaffNavbar";

interface StaffLayoutWrapperProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

export function StaffLayoutWrapper({
  children,
  user,
}: StaffLayoutWrapperProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/20">
        <StaffSidebar />
        <StaffNavbar user={user} />

        {/* Main Content */}
        <main className="lg:pl-64 pt-16 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
