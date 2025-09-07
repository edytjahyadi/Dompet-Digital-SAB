
import React from 'react';
import type { PaymentResult } from '../types';
import { CheckCircleIcon, XCircleIcon } from './common/Icons';

interface TransactionStatusProps {
    result: PaymentResult;
    onDone: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ result, onDone }) => {
    const { success, message } = result;

    return (
        <div className={`flex flex-col items-center justify-center h-screen p-6 text-center ${success ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="mb-8">
                {success ? (
                    <CheckCircleIcon className="w-24 h-24 text-green-500" />
                ) : (
                    <XCircleIcon className="w-24 h-24 text-red-500" />
                )}
            </div>
            <h1 className={`text-3xl font-bold ${success ? 'text-green-800' : 'text-red-800'}`}>
                {success ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'}
            </h1>
            <p className="mt-2 text-lg text-slate-600">{message}</p>
            <button
                onClick={onDone}
                className={`w-full max-w-sm mt-12 font-bold py-3 px-6 rounded-lg shadow-md transition-transform active:scale-95 ${
                    success 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
            >
                Kembali ke Beranda
            </button>
        </div>
    );
};

export default TransactionStatus;
