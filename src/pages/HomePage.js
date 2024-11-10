import React from 'react';
import { Book, Database, Activity } from 'lucide-react';
import NavigationStructure from '../components/navigation/NavigationStructure';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300">
                        Spring Framework Learning Platform
                    </h1>
                    <p className="text-xl text-purple-100 mb-8">Master Java, Spring, Software Architecture, and DevOps</p>
                    <div className="flex gap-4">
                        <button className="bg-cyan-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/50">
                            Get Started
                        </button>
                        <button className="border-2 border-pink-400 text-pink-400 px-6 py-2 rounded-lg font-semibold hover:bg-pink-400 hover:text-white transition-colors shadow-lg shadow-pink-500/50">
                            View Topics
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Navigation Structure */}
            <div className="container mx-auto px-4 py-12">
                <NavigationStructure />
            </div>

            {/* Featured Content section remains the same */}
            <div className="container mx-auto px-4 mb-12">
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-purple-500/30">
                    <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                        Featured Content
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors shadow-lg">
                            <div className="text-cyan-400 mb-4">
                                <Book className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Spring Boot Fundamentals</h3>
                            <p className="text-gray-300">Get started with Spring Boot essentials</p>
                        </div>
                        <div className="bg-gray-800 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors shadow-lg">
                            <div className="text-pink-400 mb-4">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Java Collections</h3>
                            <p className="text-gray-300">Master the Java Collections Framework</p>
                        </div>
                        <div className="bg-gray-800 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors shadow-lg">
                            <div className="text-purple-400 mb-4">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Microservices</h3>
                            <p className="text-gray-300">Build scalable applications with microservices</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;