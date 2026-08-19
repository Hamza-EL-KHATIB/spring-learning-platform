import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import QuickSearch, { useQuickSearch } from './QuickSearch';

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const search = useQuickSearch();

    // Most pages get the sidebar. The hubs and the two master-detail tools go
    // full-width — vocabulary and conjugation carry their own list sidebar, and
    // two side-by-side sidebars leave the content column too narrow to read.
    const showSidebar = !['/', '/learn/german', '/learn/vocabulary', '/learn/konjugation'].includes(pathname);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Header onOpenSearch={search.open} />
            <main className="flex-grow container mx-auto px-4 py-8">
                {showSidebar ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                        <Sidebar />
                        <div className="min-w-0">{children}</div>
                    </div>
                ) : (
                    children
                )}
            </main>
            <Footer />
            <QuickSearch isOpen={search.isOpen} onClose={search.close} />
        </div>
    );
};

export default Layout;
