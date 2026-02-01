import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayoutWrapper } from "@/components/layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.user_role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <AdminLayoutWrapper
      user={{
        name: user.full_name || user.email || "Admin",
        email: user.email,
        avatar: user.avatar,
      }}
    >
      {children}
    </AdminLayoutWrapper>
  );
}
