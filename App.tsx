
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QRScanner from './components/QRScanner';
import PaymentScreen from './components/PaymentScreen';
import TransactionStatus from './components/TransactionStatus';
import { View } from './types';
import type { Student, Transaction, Tenant, PaymentResult } from './types';
import { getFinancialTip } from './services/geminiService';

const MOCK_STUDENT: Student = {
    id: 'student-001',
    name: 'Jonathan Christie',
    balance: 500000
};

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'tx-1', tenantName: 'Kantin Sehat Bu Tini', amount: 25000, date: 'Hari ini, 12:30', type: 'debit'},
    { id: 'tx-2', tenantName: 'Warung Jus SKAB', amount: 15000, date: 'Kemarin, 12:35', type: 'debit' },
    { id: 'tx-3', tenantName: 'Top Up Saldo', amount: 200000, date: '2 hari lalu', type: 'credit' },
];

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.Dashboard);
    const [student, setStudent] = useState<Student>(MOCK_STUDENT);
    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [scannedTenant, setScannedTenant] = useState<Tenant | null>(null);
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
    const [financialTip, setFinancialTip] = useState<string>('Memuat tips keuangan...');

    const fetchTip = useCallback(async () => {
      const tip = await getFinancialTip();
      setFinancialTip(tip);
    }, []);

    useEffect(() => {
      fetchTip();
    }, [fetchTip]);
    
    const handleScanSuccess = (tenant: Tenant) => {
        setScannedTenant(tenant);
        setCurrentView(View.Payment);
    };

    const handleConfirmPayment = (amount: number) => {
        // Simulate API call
        setTimeout(() => {
            if (student.balance >= amount) {
                const newTransaction: Transaction = {
                    id: `tx-${Date.now()}`,
                    tenantName: scannedTenant!.name,
                    amount: amount,
                    date: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    type: 'debit',
                };
                setStudent(prev => ({ ...prev, balance: prev.balance - amount }));
                setTransactions(prev => [newTransaction, ...prev]);
                setPaymentResult({ success: true, message: `Pembayaran ke ${scannedTenant!.name} sebesar ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)} berhasil.` });
            } else {
                setPaymentResult({ success: false, message: 'Transaksi gagal karena saldo tidak mencukupi.' });
            }
            setCurrentView(View.Status);
        }, 1000);
    };

    const navigateTo = (view: View) => {
        setCurrentView(view);
    };

    const renderContent = () => {
        switch (currentView) {
            case View.Dashboard:
                return <Dashboard student={student} transactions={transactions} financialTip={financialTip} onScanClick={() => navigateTo(View.QRScanner)} />;
            case View.QRScanner:
                return <QRScanner onScanSuccess={handleScanSuccess} onCancel={() => navigateTo(View.Dashboard)} />;
            case View.Payment:
                if (scannedTenant) {
                    return <PaymentScreen tenant={scannedTenant} balance={student.balance} onConfirmPayment={handleConfirmPayment} onCancel={() => navigateTo(View.Dashboard)} />;
                }
                return null;
            case View.Status:
                if (paymentResult) {
                    return <TransactionStatus result={paymentResult} onDone={() => navigateTo(View.Dashboard)} />;
                }
                return null;
            default:
                return <Dashboard student={student} transactions={transactions} financialTip={financialTip} onScanClick={() => navigateTo(View.QRScanner)} />;
        }
    };
    
    const isFullScreenView = currentView === View.QRScanner || currentView === View.Status || currentView === View.Payment;

    return (
        <div className="max-w-md mx-auto h-screen bg-slate-100 flex flex-col font-sans">
             {!isFullScreenView && <Header title="Dompet Digital SKAB" />}
            <main className="flex-grow overflow-y-auto pb-24">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
