import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StaffLayoutWrapper } from "@/components/layout";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.user_role !== "staff") {
    redirect("/admin/dashboard");
  }

  return (
    <StaffLayoutWrapper
      user={{
        name: user.full_name || user.email || "Staff",
        email: user.email,
        avatar: user.avatar,
      }}
    >
      {children}
    </StaffLayoutWrapper>
  );
}
