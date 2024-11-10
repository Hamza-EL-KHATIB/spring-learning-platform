import React from "react";
import {Link} from "react-router-dom";
import {Github, Menu, Search, X} from "lucide-react";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Spring Learning
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search topics..."
                                className="w-64 px-4 py-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <a
                            href="https://github.com/Hamza-EL-KHATIB/spring-learning-platform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Github className="w-6 h-6" />
                        </a>
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
                    <div className="md:hidden py-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search topics..."
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
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
                )}
            </div>
        </header>
    );
};

export default Header;