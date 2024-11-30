import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isVocabulary = location.pathname === '/vocabulary';
    const isKonjugation = location.pathname === '/konjugation';

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {isHomePage || isVocabulary || isKonjugation ? (
                    children
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <Sidebar />
                        </div>
                        <div className="md:col-span-3">
                            {children}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;