import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { accountApi } from "../api/account.api";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => accountApi.getUser(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => accountApi.getUserProfile(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: any) => accountApi.updateProfile(data),
    retry: false,
  });
}
