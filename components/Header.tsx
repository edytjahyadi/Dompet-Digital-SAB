
import React from 'react';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBack }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src="https://picsum.photos/seed/skablogo/40/40" alt="SKAB Logo" className="h-10 w-10 rounded-full" />
                    <h1 className="text-xl font-bold text-blue-900">{title}</h1>
                </div>
                {showBackButton && (
                    <button onClick={onBack} className="text-blue-900 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
