import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, X, BookOpen, GraduationCap, Book } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                            HELK's Learning
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Main Navigation Links */}
                        <Link to="/java/collections" className="text-gray-300 hover:text-white transition-colors">
                            Java
                        </Link>
                        <Link to="/spring/core" className="text-gray-300 hover:text-white transition-colors">
                            Spring
                        </Link>
                        <Link to="/databases/sql" className="text-gray-300 hover:text-white transition-colors">
                            Databases
                        </Link>
                        <Link to="/architecture/design-patterns" className="text-gray-300 hover:text-white transition-colors">
                            Architecture
                        </Link>

                        {/* Utility Links */}
                        <div className="flex items-center space-x-4 pl-2 border-l border-gray-700">
                            <Link
                                to="/learn/german"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                                title="Learning Portal"
                            >
                                <div className="relative">
                                    <GraduationCap className="w-6 h-6" />
                                    <span className="absolute -top-2 -right-2 bg-purple-500/80 text-white text-[10px] font-medium px-1 rounded">
      DE
    </span>
                                </div>
                            </Link>

                            {/* Github Link */}
                            <a
                                href="https://github.com/Hamza-EL-KHATIB"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                title="GitHub Repository"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <Link
                            to="/java/collections"
                            className="block py-2 text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Java
                        </Link>
                        <Link
                            to="/spring/core"
                            className="block py-2 text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Spring
                        </Link>
                        <Link
                            to="/databases/sql"
                            className="block py-2 text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Databases
                        </Link>
                        <Link
                            to="/architecture/design-patterns"
                            className="block py-2 text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Architecture
                        </Link>

                        {/* Utility Links for Mobile */}
                        <div className="pt-2 mt-2 border-t border-gray-700">
                            {/* German Learning Links */}
                            <div className="space-y-2">
                                <Link
                                    to="/vocabulary"
                                    className="block py-2 text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="w-5 h-5" />
                                        <span>German Vocabulary</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/konjugation"
                                    className="block py-2 text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Book className="w-5 h-5" />
                                        <span>German Conjugation</span>
                                    </div>
                                </Link>
                            </div>

                            <a
                                href="https://github.com/Hamza-EL-KHATIB/spring-learning-platform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <Github className="w-5 h-5" />
                                    <span>GitHub</span>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;