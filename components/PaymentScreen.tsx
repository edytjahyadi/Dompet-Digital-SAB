
import React, { useState } from 'react';
import type { Tenant } from '../types';
import { ArrowLeftIcon } from './common/Icons';

interface PaymentScreenProps {
  tenant: Tenant;
  balance: number;
  onConfirmPayment: (amount: number) => void;
  onCancel: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({ tenant, balance, onConfirmPayment, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    validateAmount(Number(value));
  };

  const validateAmount = (numAmount: number) => {
    if (numAmount <= 0) {
      setError('Jumlah harus lebih dari 0.');
      return false;
    }
    if (numAmount > balance) {
      setError('Saldo tidak mencukupi.');
      return false;
    }
    setError('');
    return true;
  };

  const handleConfirm = () => {
    const numAmount = Number(amount);
    if (validateAmount(numAmount)) {
      onConfirmPayment(numAmount);
    }
  };
  
  const numAmount = Number(amount);
  const isValid = numAmount > 0 && numAmount <= balance;

  return (
    <div className="p-4 flex flex-col h-screen bg-white">
      <div className="flex-shrink-0">
        <button onClick={onCancel} className="flex items-center space-x-2 text-blue-800 font-semibold mb-6">
          <ArrowLeftIcon />
          <span>Kembali</span>
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-center text-center">
        <div className="flex flex-col items-center mb-6">
          <img src={tenant.imageUrl} alt={tenant.name} className="w-24 h-24 rounded-full shadow-lg mb-4" />
          <p className="text-slate-600">Anda akan membayar ke</p>
          <h2 className="text-2xl font-bold text-blue-900">{tenant.name}</h2>
        </div>

        <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">Masukkan Jumlah Pembayaran</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-2xl font-bold">Rp</span>
                <input
                    type="tel"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    autoFocus
                    className="w-full text-center text-4xl font-bold text-blue-900 border-0 border-b-2 border-blue-300 focus:ring-0 focus:border-blue-600 p-2 pl-12 transition"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="bg-slate-100 p-3 rounded-lg">
          <p className="text-sm text-slate-600">Saldo Anda: <span className="font-bold text-slate-800">{formatCurrency(balance)}</span></p>
        </div>
      </div>
      
      <div className="flex-shrink-0 py-4">
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-800 active:scale-95"
        >
          Konfirmasi & Bayar
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
