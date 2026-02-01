import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { agentApi } from "../api/staff.api";

export function useApplyExemption() {
  return useMutation({
    mutationFn: (data: any) => agentApi.applyExemption(data),
    onSuccess: () => {
      toast.success("Exemption request submitted successfully!");
    },
    onError: (error: any) => {},
  });
}

export function useReportViolation() {
  return useMutation({
    mutationFn: (data: { plate_number: string; reason: string }) =>
      agentApi.reportViolation(data.plate_number, { reason: data.reason }),
    onSuccess: () => {
      toast.success("Violation reported successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to report violation.");
    },
  });
}
