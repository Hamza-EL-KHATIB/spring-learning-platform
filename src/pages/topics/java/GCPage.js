import React from 'react';
import gcJson from '../../../data/java/gc.json';
import { Zap, Settings, Info, Wrench } from 'lucide-react';

const GCPage = () => {

    // Render steps for the Garbage Collection Process
    const renderSteps = (steps) => (
        steps.map((step, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <p className="text-gray-300">{step}</p>
            </div>
        ))
    );

    // Render different types of Garbage Collectors
    const renderCollectors = (collectors) => (
        collectors.map((collector, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{collector.name}</h4>
                <p className="text-gray-300">{collector.description}</p>
            </div>
        ))
    );

    // Render phases of Garbage Collection
    const renderPhases = (phases) => (
        phases.map((phase, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <h4 className="text-lg font-medium text-purple-300 mb-2">{phase.phase}</h4>
                <p className="text-gray-300">{phase.description}</p>
            </div>
        ))
    );

    // Helper function to highlight commands within text
    const highlightCommands = (text) => {
        return text.replace(/`([^`]+)`/g, '<span style="color: #c678dd">$1</span>'); // purple color for commands
    };

// Render tuning tips for Garbage Collection
    const renderTuningTips = (tips) => (
        tips.map((tip, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/20">
                <div
                    className="text-gray-300 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightCommands(tip) }}
                />
            </div>
        ))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{gcJson.title}</h1>
            </div>

            {/* Overview of Garbage Collection */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Info className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{gcJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{gcJson.topics[0].description}</p>
            </div>

            {/* Garbage Collection Process */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Zap className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{gcJson.topics[1].title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {renderSteps(gcJson.topics[1].steps)}
                </div>
            </div>

            {/* Types of Garbage Collectors */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Settings className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{gcJson.topics[2].title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {renderCollectors(gcJson.topics[2].collectors)}
                </div>
            </div>

            {/* Phases of Garbage Collection */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Wrench className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{gcJson.topics[3].title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {renderPhases(gcJson.topics[3].phases)}
                </div>
            </div>

            {/* Tuning Garbage Collection */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Settings className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{gcJson.topics[4].title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {renderTuningTips(gcJson.topics[4].tips)}
                </div>
            </div>
        </div>
    );
};

export default GCPage;
