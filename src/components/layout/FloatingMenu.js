import React, { useState } from 'react';
import { Menu, X, ChevronLeft } from 'lucide-react';

const FloatingMenu = ({ tabs, activeTab, onTabChange, streamOperations, onStreamCategorySelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showStreamCategories, setShowStreamCategories] = useState(false);

    const handleTabClick = (tabId) => {
        if (tabId === 'streams') {
            setShowStreamCategories(true);
        } else {
            onTabChange(tabId);
            setIsOpen(false);
        }
    };

    const handleStreamCategorySelect = (category) => {
        onStreamCategorySelect(category);
        setShowStreamCategories(false);
        setIsOpen(false);
    };

    const handleBackClick = () => {
        setShowStreamCategories(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end lg:hidden">
            {/* Menu Content */}
            {isOpen && (
                <div className="mb-4 bg-gray-800/95 backdrop-blur rounded-lg shadow-xl border border-gray-700">
                    {!showStreamCategories ? (
                        <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-purple-500/20 text-purple-300'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {tab.icon && <span className="mr-3">{tab.icon}</span>}
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-2">
                            <button
                                onClick={handleBackClick}
                                className="flex items-center text-gray-300 hover:text-white mb-2 px-4 py-2"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back to Menu
                            </button>
                            <div className="space-y-1">
                                {streamOperations?.map((op, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleStreamCategorySelect(op)}
                                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg"
                                    >
                                        {op.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Single Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20
               hover:from-purple-500/30 hover:to-pink-500/30
               text-purple-300 hover:text-purple-200
               rounded-lg border border-purple-500/20
               hover:border-purple-500/40
               transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
                {isOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
            </button>
        </div>
    );
};

export default FloatingMenu;