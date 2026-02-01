"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

import { useAuth } from "@/contexts/AuthContext";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const signOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // Clear client state
      logout();

      // Force a hard refresh so server components re-evaluate auth
      router.replace("/scanner");
      // router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button variant={"destructive"} onClick={signOut} type="button">
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
