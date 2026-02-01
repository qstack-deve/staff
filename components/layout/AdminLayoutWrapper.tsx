"use client";

import { SidebarProvider } from "@/contexts/SidebarContext";
import { AdminSidebar } from "./AdminSidebar";
import { AdminNavbar } from "./AdminNavbar";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
}

export function AdminLayoutWrapper({
  children,
  user,
}: AdminLayoutWrapperProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/20">
        <AdminSidebar />
        <AdminNavbar user={user} />

        {/* Main Content */}
        <main className="lg:pl-64 pt-16 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
