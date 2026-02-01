"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  Menu,
  MenuIcon,
  MessageCircleCode,
  MessageCircleDashedIcon,
  MessageCircleReply,
  Plus,
  X,
} from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";
import { NotificationDropdown } from "./NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import AgentAddVehicle from "../agent/AgentAddVehicle";

export function AgentNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-sidebar py-5 px-5 flex justify-between">
      {/* Container to handle padding and max width */}
      <div>
        <div className="flex items-center gap-6">
          <Link href="/agent" className="font-bold text-lg hidden md:block">
            Taxon
          </Link>

          <nav className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
            <Link
              href="/agent"
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                pathname === "/agent"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              Scanner
            </Link>
            <Link
              href="/agent/dashboard"
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                pathname === "/agent/dashboard"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {/* <AgentAddVehicle /> */}
        <NotificationDropdown />
        <AccountDropdown />
      </div>
    </div>
  );
}
