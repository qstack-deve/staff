"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, ChevronLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface SidebarMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarMenuGroup {
  label: string;
  items: SidebarMenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuGroups: SidebarMenuGroup[];
  logo: {
    text: string;
    icon?: React.ReactNode;
    href: string;
  };
  onLogout?: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  menuGroups,
  logo,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none",
          isOpen
            ? "w-[280px] translate-x-0"
            : "w-[280px] -translate-x-full lg:translate-x-0 lg:w-64",
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-border bg-sidebar-accent/10">
          <Link
            href={logo.href}
            className="font-bold text-xl tracking-tight flex items-center gap-2 text-primary"
          >
            {logo.icon ? (
              logo.icon
            ) : (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
                {logo.text.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden sm:inline">{logo.text}</span>
          </Link>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href + "/"));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border mt-auto">
          {onLogout ? (
            <Button
              variant="ghost"
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors justify-start"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          ) : (
            <Link href="/api/auth/signout">
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors justify-start"
              >
                <LogOut size={18} />
                Sign Out
              </Button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
