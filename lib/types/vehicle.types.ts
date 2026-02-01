export interface ExemptionData {
  id: string;
  reason: string;
  reason_display: string;
  start_date: string;
  end_date: string;
  status: string;
  is_active_exemption: boolean;
}

export interface VehicleData {
  id: string;
  plate_number: string;
  owner_name: string;
  phone_number: string;
  current_balance: number;
  daily_rate: number;
  balance_without_fine: number;
  fine: number; // This is separate
  compliance_status: string;
  recent_payments: RecentPayment[];
  created_at: string;
  unpaid_days: number;
  current_exemption: ExemptionData;
  qr_code: string;
  // Financial Transparency
  fine_waivers: FineWaiver[];
  debt_adjustments: DebtAdjustment[];
  manual_exemptions: ManualExemption[];
}

export interface FineWaiver {
  id: string;
  waived_amount: string;
  reason: string;
  created_at: string;
  admin: string;
}

export interface DebtAdjustment {
  id: string;
  amount: string;
  reason: string;
  created_at: string;
  admin: string;
}

export interface ManualExemption {
  id: string;
  vehicle: string;
  reason: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  admin: string;
}

export interface RecentPayment {
  id: string;
  transaction_id: string;
  amount: string;
  timestamp: string;
  payment_method?: string;
}

export interface ReceiptData {
  id: string;
  transaction_id: string;
  amount: number;
  date: string;
  paymentMethod: string;
  payerName: string;
  plateNumber: string;
  status: "success" | "pending" | "failed";
}

// History page types
export interface HistoryExemption {
  id: number;
  vehicle: string;
  start_date: string;
  end_date: string;
  reason: string;
  reason_display: string;
  description: string;
  is_approved: boolean;
  created_at: string;
}

export interface HistoryPayment {
  id: string;
  transaction_id?: string;
  amount: string;
  payment_method: string;
  timestamp: string;
  notes?: string;
}

export interface VehicleHistoryData {
  id: string;
  fine_waivers: FineWaiver[];
  debt_adjustments: DebtAdjustment[];
  exemptions: HistoryExemption[];
  payments: HistoryPayment[];
  manual_exemptions: ManualExemption[];
}
