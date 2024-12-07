import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const showSidebar = ![
        '/',
        '/learn/vocabulary',
        '/learn/konjugation',
        '/learn/german',
        '/learn/german-cases',
        '/learn/german-case-rules'
    ].includes(pathname);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {showSidebar ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                        <Sidebar />
                        <div className="min-w-0">
                            {children}
                        </div>
                    </div>
                ) : (
                    children
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;