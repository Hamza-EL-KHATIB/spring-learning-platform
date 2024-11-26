import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ChevronRight,
    Database,
    Server,
    Box,
    GitBranch,
    Users,
    Code,
    Activity,
    FileText,
    Cpu,
    Layers,
    RefreshCw
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const section = currentPath.split('/')[1];

    const navigationGroups = {
        java: {
            title: "Java Core",
            icon: <Code className="w-5 h-5" />,
            items: [
                { path: '/java/collections', title: 'Collections Framework', icon: <Layers className="w-4 h-4" /> },
                { path: '/java/concurrency', title: 'Concurrency & Multithreading', icon: <Activity className="w-4 h-4" /> },
                { path: '/java/definitions', title: 'Java Definitions', icon: <FileText className="w-4 h-4" /> },
                { path: '/java/exceptions', title: 'Exception Handling', icon: <Box className="w-4 h-4" /> },
                { path: '/java/features', title: 'Java Features', icon: <Cpu className="w-4 h-4" /> },
                { path: '/java/gc', title: 'Garbage Collection', icon: <RefreshCw className="w-4 h-4" /> },
                { path: '/java/internals', title: 'Java Internals', icon: <Layers className="w-4 h-4" /> }
            ]
        },
        spring: {
            title: "Spring Framework",
            icon: <Server className="w-5 h-5" />,
            items: [
                { path: '/spring/core', title: 'Spring Core' },
                { path: '/spring/boot', title: 'Spring Boot' },
                { path: '/spring/data', title: 'Spring Data' },
                { path: '/spring/rest', title: 'REST APIs' }
            ]
        },
        databases: {
            title: "Database Technologies",
            icon: <Database className="w-5 h-5" />,
            items: [
                { path: '/databases/sql', title: 'SQL Fundamentals' },
                { path: '/databases/hibernate', title: 'Hibernate ORM' },
                { path: '/databases/transactions', title: 'Transactions' },
                { path: '/databases/redis', title: 'Redis' }
            ]
        },
        architecture: {
            title: "Architecture",
            icon: <Box className="w-5 h-5" />,
            items: [
                { path: '/architecture/design-patterns', title: 'Design Patterns' },
                { path: '/architecture/solid', title: 'SOLID Principles' }
            ]
        },
        devops: {
            title: "DevOps",
            icon: <GitBranch className="w-5 h-5" />,
            items: [
                { path: '/devops/git', title: 'Git' }
            ]
        },
        agile: {
            title: "Agile",
            icon: <Users className="w-5 h-5" />,
            items: [
                { path: '/agile/scrum', title: 'Scrum' }
            ]
        },
        "best-practices": {
            title: "Best Practices",
            icon: <Code className="w-5 h-5" />,
            items: [
                { path: '/best-practices/code-reviews', title: 'Code Reviews' }
            ]
        }
    };

    const currentGroup = navigationGroups[section];

    if (!currentGroup) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4">
            {/* Section Title */}
            <div className="flex items-center space-x-3 mb-6">
                {currentGroup.icon}
                <h2 className="text-lg font-semibold text-white">{currentGroup.title}</h2>
            </div>

            {/* Related Topics Section */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Topics</h3>
                <nav className="space-y-1">
                    {currentGroup.items.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                                currentPath === item.path
                                    ? 'bg-purple-500/10 text-purple-400'
                                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`}
                        >
                            {item.icon ? (
                                <span className="mr-3">{item.icon}</span>
                            ) : (
                                <ChevronRight className={`w-4 h-4 mr-2 ${
                                    currentPath === item.path ? 'text-purple-400' : 'text-gray-500'
                                }`} />
                            )}
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Quick Links Section */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Related Sections</h3>
                <nav className="space-y-1">
                    {Object.entries(navigationGroups)
                        .filter(([key]) => key !== section)
                        .slice(0, 3)
                        .map(([key, group]) => (
                            <Link
                                key={key}
                                to={group.items[0].path}
                                className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors"
                            >
                                {group.icon}
                                <span className="ml-3">{group.title}</span>
                            </Link>
                        ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;