"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertTriangle, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReportViolation } from "@/lib/hooks/exemptions.hooks";

// --- Validation Schema ---
const violationSchema = z.object({
  reason: z
    .string()
    .min(5, "Please provide a reason/observation (min 5 chars)."),
});

type ViolationFormValues = z.infer<typeof violationSchema>;

interface ReportViolationDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  plateNumber: string;
}

export const ReportViolationDialog = ({
  open,
  onOpenChange,
  plateNumber,
}: ReportViolationDialogProps) => {
  const { mutateAsync: reportViolation, isPending } = useReportViolation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ViolationFormValues>({
    resolver: zodResolver(violationSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data: ViolationFormValues) => {
    try {
      await reportViolation({
        plate_number: plateNumber,
        reason: data.reason,
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Failed to report violation", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2 w-full sm:w-auto">
          <AlertTriangle className="h-4 w-4" /> Report Exemption Violation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" /> Report Limitation Violation
          </DialogTitle>
          <DialogDescription>
            You are reporting that{" "}
            <span className="font-mono font-bold text-foreground">
              {plateNumber}
            </span>{" "}
            is operating on the road despite having an active exemption.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm flex gap-2">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            This action will flag the vehicle for review by admins. If
            confirmed, the exemption may be revoked.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Observation / Reason</Label>
            <Textarea
              {...register("reason")}
              id="reason"
              placeholder="e.g. Vehicle found carrying passengers at Main Market..."
              className="resize-none h-24"
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} variant="destructive">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Confirm Report"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
