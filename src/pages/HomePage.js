import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Server,
    Database,
    Activity,
    Box,
    Folder,
    FolderTree,
    Binary,
    Cpu,
    Users,
    RefreshCw,
    FileCode,
    XSquare,
    BookOpenCheck,
    LayoutGrid
} from 'lucide-react';

const CategorySection = ({ title, items }) => (
    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="grid gap-2">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                    <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-gray-700">
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                    </div>
                    <div>
                        <div className="text-gray-200 group-hover:text-white">{item.title}</div>
                        {item.description && (
                            <div className="text-sm text-gray-400">{item.description}</div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HomePage = () => {
    const categories = {
        java: {
            title: "Java Core",
            items: [
                { title: "Collections Framework", path: "/java/collections", icon: Folder, description: "Lists, Sets, Maps, and more" },
                { title: "Concurrency & Multithreading", path: "/java/concurrency", icon: Activity, description: "Threads, executors, synchronization" },
                { title: "Definitions", path: "/java/definitions", icon: BookOpen, description: "Core Java concepts and terminology" },
                { title: "Exception Handling", path: "/java/exceptions", icon: Box, description: "Error handling and management" },
                { title: "Java Features", path: "/java/features", icon: Cpu, description: "Modern Java capabilities" },
                { title: "Garbage Collection", path: "/java/gc", icon: RefreshCw, description: "Memory management" },
                { title: "Java Internals", path: "/java/internals", icon: Binary, description: "JVM and internal mechanics" }
            ]
        },
        spring: {
            title: "Spring Framework",
            items: [
                { title: "Spring Core", path: "/spring/core", icon: Server, description: "IoC, DI, and core concepts" },
                { title: "Spring Boot", path: "/spring/boot", icon: XSquare, description: "Auto-configuration and features" },
                { title: "Spring Data", path: "/spring/data", icon: Database, description: "Data access and repositories" },
                { title: "REST APIs", path: "/spring/rest", icon: FileCode, description: "RESTful web services" }
            ]
        },
        databases: {
            title: "Database Technologies",
            items: [
                { title: "SQL Fundamentals", path: "/databases/sql", icon: Database, description: "SQL basics and advanced queries" },
                { title: "Hibernate", path: "/databases/hibernate", icon: FolderTree, description: "ORM and entity management" },
                { title: "Transactions", path: "/databases/transactions", icon: RefreshCw, description: "Transaction management" },
                { title: "Redis", path: "/databases/redis", icon: Binary, description: "In-memory data structure store" }
            ]
        },
        architecture: {
            title: "Software Architecture",
            items: [
                { title: "Design Patterns", path: "/architecture/design-patterns", icon: LayoutGrid, description: "Common software patterns" },
                { title: "SOLID Principles", path: "/architecture/solid", icon: BookOpenCheck, description: "Design principles" }
            ]
        },
        processes: {
            title: "Processes & Methodologies",
            items: [
                { title: "Scrum Framework", path: "/agile/scrum", icon: Users, description: "Agile project management with Scrum" }
            ]
        }
    };

    return (
        <div className="space-y-8">

            {/* All Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.values(categories).map((category, index) => (
                    <CategorySection
                        key={index}
                        title={category.title}
                        items={category.items}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;