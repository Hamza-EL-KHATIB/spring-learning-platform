import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, BookText } from 'lucide-react';

const GermanDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800"
            >
                <BookOpen className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                    <div className="py-1">
                        <Link
                            to="/german/vocabulary"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Vocabulary</span>
                        </Link>
                        <Link
                            to="/german/conjugation"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <BookText className="w-4 h-4" />
                            <span>Conjugation</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GermanDropdown;