import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";
import { toast } from "sonner";

// users here

export const useAdminGetMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => adminApi.getMembers(),
  });
};

export const useAdminGetMember = (memberId: string) => {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: () => adminApi.getMember(memberId),
    enabled: !!memberId,
  });
};

export const useActivateMember = (memberId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminApi.activateMember(memberId),
    onSuccess: () => {
      toast.success("Member activated successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      toast.error("Failed to activate member");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["member", memberId],
      });
    },
  });
};

export const useSuspendMember = (memberId: string) => {
  return useMutation({
    mutationFn: () => adminApi.suspendMember(memberId),
    onSuccess: () => {
      toast.success("Member suspended successfully");
    },
    onError: () => {
      toast.error("Failed to suspend member");
    },
  });
};

export const useAdminUpdateMember = (memberId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => adminApi.updateMember(memberId, data),
    onSuccess: () => {
      toast.success("Member updated successfully");
      queryClient.invalidateQueries({ queryKey: ["member", memberId] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });
};

export const useAdminDeleteMember = (memberId: string) => {
  return useMutation({
    mutationFn: () => adminApi.deleteMember(memberId),
  });
};

export const useAdminCreateMember = (data: any) => {
  return useMutation({
    mutationFn: () => adminApi.createMember(data),
  });
};
