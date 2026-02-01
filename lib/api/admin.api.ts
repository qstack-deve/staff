import { apiService } from "../services/apiService";

export const adminApi = {
  getMembers: async () => {
    const res = await apiService.get("/admin/members/");
    return res;
  },

  getMember: async (memberId: string) => {
    const res = await apiService.get(`/admin/members/${memberId}/`);
    return res;
  },

  activateMember: async (memberId: string) => {
    const res = await apiService.post(`/admin/members/${memberId}/activate/`);
    return res;
  },

  suspendMember: async (memberId: string) => {
    const res = await apiService.post(`/admin/members/${memberId}/suspend/`);
    return res;
  },

  updateMember: async (memberId: string, data: any) => {
    const res = await apiService.patch(`/admin/members/${memberId}/`, data);
    return res;
  },

  deleteMember: async (memberId: string) => {
    const res = await apiService.delete(`/admin/members/${memberId}/`);
    return res;
  },

  createMember: async (data: any) => {
    const res = await apiService.post(`/admin/members/`, data);
    return res;
  },
};
