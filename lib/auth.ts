import { getAccessToken } from "@/lib/actions/auth.actions";

export async function getCurrentUser() {
  const token = await getAccessToken();

  if (!token) return null;
  console.log("Safe Auth Check:", token);

  try {
    const res = await fetch(
      `${process.env.NEXT_BACKEND_API_URL}/api/staff/user/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    return res.ok ? res.json() : null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
