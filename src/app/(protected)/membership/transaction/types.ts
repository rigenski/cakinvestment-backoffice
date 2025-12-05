export type TransactionStatus = "completed" | "pending" | "canceled";
export type PaymentMethod = "Bank Transfer" | "E-Wallet" | "Credit Card" | "Other";

export interface Transaction {
  id: string;
  transactionId: string; // ID transaksi yang ditampilkan ke user
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number; // Jumlah sebelum diskon
  discount: number; // Jumlah diskon
  total: number; // Total setelah diskon
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}







