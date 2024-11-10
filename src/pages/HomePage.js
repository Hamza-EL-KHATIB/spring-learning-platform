import React from 'react';
import { Activity, Sparkles, Clock, Star } from 'lucide-react';
import NavigationStructure from '../components/navigation/NavigationStructure';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Featured Content as Hero Section */}
            <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Popular Track */}
                        <div className="bg-gray-900/90 backdrop-blur rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Star className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Most Popular</h2>
                            </div>
                            <h3 className="text-lg font-semibold text-purple-300 mb-2">Spring Boot Essentials</h3>
                            <p className="text-gray-300 mb-4">Master core Spring Boot concepts and build your first application</p>
                            <a href="/spring/boot" className="inline-flex items-center text-purple-400 hover:text-purple-300">
                                Start Learning <Sparkles className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        {/* Latest Content */}
                        <div className="bg-gray-900/90 backdrop-blur rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Clock className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Latest Update</h2>
                            </div>
                            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Microservices Architecture</h3>
                            <p className="text-gray-300 mb-4">Learn to build scalable applications with microservices</p>
                            <a href="/architecture/design-patterns" className="inline-flex items-center text-cyan-400 hover:text-cyan-300">
                                Explore Now <Sparkles className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        {/* Quick Start */}
                        <div className="bg-gray-900/90 backdrop-blur rounded-lg p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-pink-500/20 rounded-lg">
                                    <Activity className="w-6 h-6 text-pink-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Quick Start</h2>
                            </div>
                            <h3 className="text-lg font-semibold text-pink-300 mb-2">Java Collections</h3>
                            <p className="text-gray-300 mb-4">Essential Java collections framework concepts and usage</p>
                            <a href="/java/collections" className="inline-flex items-center text-pink-400 hover:text-pink-300">
                                Get Started <Sparkles className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Paths Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-white mb-8">Learning Paths</h2>
                <NavigationStructure />
            </div>

        </div>
    );
};

export default HomePage;