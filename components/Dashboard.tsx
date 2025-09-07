
import React from 'react';
import type { Student, Transaction } from '../types';
import { QrCodeIcon, LightBulbIcon } from './common/Icons';

interface DashboardProps {
  student: Student;
  transactions: Transaction[];
  financialTip: string;
  onScanClick: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isDebit = transaction.type === 'debit';
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-200 last:border-b-0">
      <div>
        <p className="font-semibold text-slate-800">{transaction.tenantName}</p>
        <p className="text-sm text-slate-500">{transaction.date}</p>
      </div>
      <p className={`font-bold ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
        {isDebit ? '-' : '+'} {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ student, transactions, financialTip, onScanClick }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-sm opacity-80">Saldo Anda</p>
        <p className="text-4xl font-bold tracking-tight mt-1">{formatCurrency(student.balance)}</p>
        <p className="mt-2 font-medium">{student.name}</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-lg shadow-sm flex items-start space-x-3">
        <LightBulbIcon className="w-6 h-6 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold">Tips Keuangan Hari Ini</h4>
          <p className="text-sm">{financialTip}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-3">Aktivitas Terakhir</h3>
        <div className="max-h-60 overflow-y-auto">
          {transactions.length > 0 ? (
            transactions.map((tx) => <TransactionItem key={tx.id} transaction={tx} />)
          ) : (
            <p className="text-slate-500 text-center py-4">Belum ada transaksi.</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-100 border-t border-slate-200">
        <button
          onClick={onScanClick}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transform active:scale-95 transition-transform duration-150"
        >
          <QrCodeIcon className="w-6 h-6" />
          <span>Bayar Pakai QRIS</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
