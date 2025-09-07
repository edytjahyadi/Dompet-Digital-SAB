
export enum View {
  Dashboard,
  QRScanner,
  Payment,
  Status,
}

export interface Student {
  id: string;
  name: string;
  balance: number;
}

export interface Tenant {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Transaction {
  id: string;
  tenantName: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
}

export interface PaymentResult {
  success: boolean;
  message: string;
}
