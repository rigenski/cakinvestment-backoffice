export type WithdrawalStatus = "pending" | "approved" | "rejected";
export type BankType = "BCA" | "BNI" | "BRI" | "Mandiri" | "CIMB" | "Other";

export interface Withdrawal {
  id: string;
  date: Date;
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  amount: number;
  bankType: BankType;
  accountNumber: string;
  accountName: string;
  status: WithdrawalStatus;
  rejectionReason?: string;
  paymentProofUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}







