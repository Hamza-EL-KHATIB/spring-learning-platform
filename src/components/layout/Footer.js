import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center text-gray-400">
                    <p>© 2024 HELK's Learning Platform. All rights reserved.</p>
                    <p className="mt-2">
                        Built with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                            ❤
                        </span>{' '}
                        using React and Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;