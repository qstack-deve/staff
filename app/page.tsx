"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect authenticated users to their dashboard
        if (user.role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/dashboard");
        }
      } else {
        // Redirect unauthenticated users to login
        router.replace("/auth/signin");
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
