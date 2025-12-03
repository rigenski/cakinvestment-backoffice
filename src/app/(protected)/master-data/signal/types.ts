export type SignalType = "short term" | "swing" | "long term";

export interface Signal {
  id: string;
  emitenCode: string;
  emitenName: string;
  type: SignalType;
  stopLoss?: number;
  takeProfit?: number;
  tp1?: number;
  tp2?: number;
  tp3?: number;
  tp4?: number;
  tp5?: number;
  target?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignalFormData {
  emitenCode: string;
  emitenName: string;
  type: SignalType;
  stopLoss?: number;
  takeProfit?: number;
  tp1?: number;
  tp2?: number;
  tp3?: number;
  tp4?: number;
  tp5?: number;
  target?: number;
}

