"use client";
import React, { useState } from "react";
import { ReceiptDialog } from "../shared/ReceiptDialog";
import {
  RecentPayment,
  ReceiptData,
  VehicleData,
} from "@/lib/types/vehicle.types";

const PaidcardWithReciept = ({
  payment,
  vehicle,
}: {
  payment: RecentPayment;
  vehicle: VehicleData;
}) => {
  // Receipt State
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(
    null,
  );

  const handleViewReceipt = (payment: RecentPayment) => {
    if (!vehicle) return;
    setSelectedReceipt({
      id: payment.id,
      transaction_id: payment.transaction_id,
      amount: parseFloat(payment.amount),
      date: payment.timestamp,
      paymentMethod: payment.payment_method || "Cash",
      payerName: vehicle.owner_name,
      plateNumber: vehicle.plate_number,
      status: "success",
    });
    setShowReceipt(true);
  };
  return (
    <div>
      <div
        key={payment.id}
        className="flex justify-between items-center text-sm p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
        onClick={() => handleViewReceipt(payment)}
        role="button"
        tabIndex={0}
      >
        <div>
          <span className="text-secondary-foreground text-xs block">
            {new Date(payment.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            {payment.id.substring(0, 8)}...
          </span>
        </div>
        <span className="font-bold text-green-700">
          ₦{parseFloat(payment.amount).toLocaleString()}
        </span>
      </div>
      <ReceiptDialog
        open={showReceipt}
        onOpenChange={setShowReceipt}
        data={selectedReceipt as ReceiptData}
      />
    </div>
  );
};

export default PaidcardWithReciept;
