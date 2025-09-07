
import React, { useRef, useEffect, useState } from 'react';
import type { Tenant } from '../types';

interface QRScannerProps {
  onScanSuccess: (tenant: Tenant) => void;
  onCancel: () => void;
}

const MOCK_TENANTS: Tenant[] = [
    { id: 'tenant-01', name: 'Kantin Sehat Bu Tini', imageUrl: 'https://picsum.photos/seed/kantin1/100/100' },
    { id: 'tenant-02', name: 'Warung Jus SKAB', imageUrl: 'https://picsum.photos/seed/kantin2/100/100' },
    { id: 'tenant-03', name: 'SKAB Kopi & Roti', imageUrl: 'https://picsum.photos/seed/kantin3/100/100' }
];

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
            setError("Kamera tidak didukung di browser ini.");
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Tidak dapat mengakses kamera. Mohon izinkan akses kamera di pengaturan browser Anda.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
        const randomTenant = MOCK_TENANTS[Math.floor(Math.random() * MOCK_TENANTS.length)];
        onScanSuccess(randomTenant);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-20">
      <div className="relative w-full h-full">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
            <h2 className="text-white text-xl font-bold mb-2">Arahkan Kamera ke Kode QR</h2>
            <p className="text-slate-300 text-center mb-4">Posisikan kode QR di dalam area yang ditandai untuk melakukan pembayaran.</p>
            <div className="w-64 h-64 border-4 border-dashed border-white rounded-lg animate-pulse" />
            
            {error && <p className="text-red-400 mt-4 text-center bg-black bg-opacity-50 p-2 rounded">{error}</p>}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 flex flex-col space-y-3">
        <button
          onClick={handleSimulateScan}
          disabled={isScanning}
          className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors ${
            isScanning 
              ? 'bg-yellow-600 cursor-not-allowed' 
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {isScanning ? 'Memindai...' : 'Simulasikan Pindai QR'}
        </button>
        <button
            onClick={onCancel}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
            Batal
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
