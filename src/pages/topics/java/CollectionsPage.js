import React from 'react';
import { Info, Clock } from 'lucide-react';
import collectionsJson from '../../../data/java/collections.json';

const CollectionsPage = () => {
    const renderImplementation = (impl) => (
        <div key={impl.name} className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <h4 className="text-lg font-medium text-purple-300 mb-2">{impl.name}</h4>
            <ul className="list-disc list-inside space-y-1">
                {impl.characteristics.map((char, idx) => (
                    <li key={idx} className="text-gray-300">{char}</li>
                ))}
            </ul>
        </div>
    );

    const renderCollectionType = (type) => (
        <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-3">{type.type}</h3>
            <p className="text-gray-300 mb-4">{type.description}</p>
            <div className="space-y-4">
                {type.implementations.map((impl) => renderImplementation(impl))}
            </div>
        </div>
    );

    const renderPerformanceRow = (data) => (
        <div key={data.type} className="grid grid-cols-5 gap-4 py-3 border-b border-gray-700">
            <div className="text-purple-300 font-medium">{data.type}</div>
            <div className="text-gray-300">{data.accessTime}</div>
            <div className="text-gray-300">{data.insertTime}</div>
            <div className="text-gray-300">{data.deleteTime}</div>
            <div className="text-gray-300">{data.memoryOverhead}</div>
        </div>
    );

    const renderPerformanceTable = (performanceData) => (
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
            <div className="grid grid-cols-5 gap-4 mb-4 text-sm font-medium text-gray-400">
                <div>Collection Type</div>
                <div>Access Time</div>
                <div>Insert Time</div>
                <div>Delete Time</div>
                <div>Memory Overhead</div>
            </div>
            {performanceData.map(renderPerformanceRow)}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{collectionsJson.title}</h1>
            </div>

            {/* Collection Types Section */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Info className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{collectionsJson.topics[0].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{collectionsJson.topics[0].description}</p>
                <div className="grid grid-cols-1 gap-6">
                    {collectionsJson.topics[0].types.map((type) => renderCollectionType(type))}
                </div>
            </div>

            {/* Performance Section */}
            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Clock className="w-6 h-6 mr-2 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">{collectionsJson.topics[1].title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{collectionsJson.topics[1].description}</p>
                {renderPerformanceTable(collectionsJson.topics[1].performance)}
            </div>
        </div>
    );
};

export default CollectionsPage;