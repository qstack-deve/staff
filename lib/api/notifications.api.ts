import { apiService } from "../services/apiService";

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  type?: "info" | "warning" | "success" | "error";
  link?: string;
}

export const notificationsApi = {
  getNotifications: async () => {
    const res = await apiService.get("/notifications/");
    return res;
  },

  markAsRead: async (id: string) => {
    const res = await apiService.patch(`/notifications/${id}/read/`, {});
    return res;
  },

  markAllAsRead: async () => {
    const res = await apiService.post("/notifications/read-all/", {});
    return res;
  },
};
