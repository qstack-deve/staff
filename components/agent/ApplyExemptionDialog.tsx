"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarIcon, AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/FormInput"; // Your custom input component
import { useApplyExemption } from "@/lib/hooks/exemptions.hooks";

// --- Validation Schema ---
const exemptionSchema = z
  .object({
    reason: z.enum(
      ["sickness", "mechanical", "theft", "accident", "other"] as const,
      {
        message: "Please select a reason.",
      },
    ),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    description: z.string().optional(),
    // vehicle: z.string().min(1, "Vehicle is required"),
  })
  .refine((data) => new Date(data.start_date) <= new Date(data.end_date), {
    message: "End date cannot be before start date",
    path: ["end_date"],
  });

type ExemptionFormValues = z.infer<typeof exemptionSchema>;

interface ApplyExemptionDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  vehicle: string;
  disabled?: boolean;
}

export const ApplyExemptionDialog = ({
  open,
  onOpenChange,
  vehicle,
  disabled,
}: ApplyExemptionDialogProps) => {
  // Hook for API call (You need to implement this based on the view I gave you)
  const { mutateAsync: applyExemption, isPending } = useApplyExemption();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExemptionFormValues>({
    resolver: zodResolver(exemptionSchema),
    defaultValues: {
      description: "",
      // Default start/end to today if you want
    },
  });

  const onSubmit = async (data: ExemptionFormValues) => {
    try {
      await applyExemption({
        vehicle: vehicle,
        ...data,
      });
      onOpenChange(false);
      reset(); // Clear form on success
    } catch (error) {
      console.error("Failed to submit exemption", error);
    }
  };

  // Watch reason to conditionally show description placeholder or helper text
  const reason = watch("reason");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {disabled ? (
          <Button variant="outline" className="gap-2" disabled>
            <AlertTriangle className="h-4 w-4" /> Apply Exemption
          </Button>
        ) : (
          <Button variant="outline" className="gap-2">
            <AlertTriangle className="h-4 w-4" /> Apply Exemption
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for Exemption</DialogTitle>
          <DialogDescription>
            Request a tax exemption for{" "}
            <span className="font-mono font-bold text-foreground">
              {vehicle}
            </span>
            . This will stop tax accumulation for the specified dates.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* 1. Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Exemption</Label>
            <Select
              onValueChange={(val) => setValue("reason", val as any)}
              defaultValue={reason}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sickness">
                  Medical Issue / Sickness
                </SelectItem>
                <SelectItem value="mechanical">Mechanical Breakdown</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
                <SelectItem value="theft">Vehicle Stolen</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          {/* 2. Date Range Grid */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              register={register}
              name="start_date"
              label="Start Date"
              type="date"
              rules={{ required: true }}
              // error={errors.start_date?.message}
            />

            <FormInput
              register={register}
              name="end_date"
              label="End Date"
              type="date"
              rules={{ required: true }}
              // error={errors.end_date?.message}
            />
          </div>

          {/* 3. Description / Notes */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              {...register("description")}
              id="description"
              placeholder={
                reason === "sickness"
                  ? "e.g. Admitted to FMC Yola..."
                  : reason === "mechanical"
                    ? "e.g. Engine knock, at mechanic shop..."
                    : "Provide details about the situation..."
              }
              className="resize-none h-24"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
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
            <Button
              type="submit"
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
