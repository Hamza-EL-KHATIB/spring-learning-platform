import React, { useState } from 'react';
import codeReviewsJson from '../../../data/bestPractices/codeReviews.json';
import {
    FileCode,
    CheckSquare,
    AlertTriangle,
    Users,
    Clock,
    BookOpen,
    Shield,
    Settings,
    FileCheck,
    GitPullRequest,
    Scale,
    CheckCircle2
} from 'lucide-react';

const TopicCard = ({ title, icon: Icon, children }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
                <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        {children}
    </div>
);

const DescriptionCard = ({ title, description, points }) => (
    <div className="bg-gray-800/60 rounded-lg p-4">
        <h4 className="text-lg font-medium text-purple-300 mb-2">{title}</h4>
        {description && <p className="text-gray-300 mb-3">{description}</p>}
        {points && (
            <ul className="space-y-2">
                {points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const CodeReviewsPage = () => {
    const [activeSection, setActiveSection] = useState(1);

    const sectionIcons = {
        1: <FileCheck className="w-5 h-5" />,
        2: <CheckSquare className="w-5 h-5" />,
        3: <BookOpen className="w-5 h-5" />,
        4: <AlertTriangle className="w-5 h-5" />
    };

    const renderSection = (section) => {
        switch (section.number) {
            case 1: // Code Review Protocol
                return (
                    <div className="grid gap-6">
                        <TopicCard title="Roles" icon={Users}>
                            <div className="grid gap-4">
                                <DescriptionCard
                                    title="Observers"
                                    description={section.content["Additions and Corrections"].Roles.Observers.description}
                                />
                                <DescriptionCard
                                    title="Secondary Reviewers"
                                    description={section.content["Additions and Corrections"].Roles["Secondary Reviewers"].description}
                                />
                            </div>
                        </TopicCard>

                        <TopicCard title="Submission Guidelines" icon={FileCode}>
                            <div className="grid gap-4">
                                {Object.entries(section.content["Additions and Corrections"]["Submission Guidelines"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Review Timeline" icon={Clock}>
                            <DescriptionCard
                                title="Prioritization"
                                points={section.content["Additions and Corrections"]["Review Timeline"].Prioritization.points}
                            />
                        </TopicCard>
                    </div>
                );

            case 2: // Steps for Reviewing Code
                const additions = section.content["Additions and Corrections"];
                return (
                    <div className="grid gap-6">
                        <TopicCard title="Context and Requirements" icon={BookOpen}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Understand the Context"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Breaking Changes" icon={AlertTriangle}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Check for Breaking Changes"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Test Coverage" icon={CheckSquare}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Test Coverage"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="API Changes" icon={Settings}>
                            <div className="grid gap-4">
                                <DescriptionCard
                                    title="API Documentation"
                                    points={additions["API Changes"].Documentation.points}
                                />
                            </div>
                        </TopicCard>

                        <TopicCard title="Logic and Performance" icon={Settings}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Logic and Performance"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Code Quality" icon={FileCode}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Code Modularity and Readability"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Git and CI/CD" icon={GitPullRequest}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Git and CI/CD Checks"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Tools and Automation" icon={Settings}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Tools and Automation"]).map(([category, content]) => (
                                    <div key={category}>
                                        <h4 className="text-lg font-medium text-purple-300 mb-3">{category}</h4>
                                        <div className="grid gap-3">
                                            {Object.entries(content).map(([subKey, subValue]) => (
                                                <DescriptionCard
                                                    key={subKey}
                                                    title={subKey}
                                                    description={typeof subValue === 'object' ? subValue.description : subValue}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Security" icon={Shield}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Security Considerations"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard title="Legal and Compliance" icon={Scale}>
                            <div className="grid gap-4">
                                {Object.entries(additions["Legal and Compliance"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>
                    </div>
                );

            case 3: // Things to Look For
                return (
                    <div className="grid gap-6">
                        <TopicCard title="Code Quality Checklist" icon={CheckSquare}>
                            <div className="grid gap-4">
                                {Object.entries(section.content["New Section"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>
                    </div>
                );

            case 4: // Things to Avoid
                return (
                    <div className="grid gap-6">
                        <TopicCard title="Common Pitfalls" icon={AlertTriangle}>
                            <div className="grid gap-4">
                                {Object.entries(section.content["Additions"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={key}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center gap-3">
                    <GitPullRequest className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-white">Code Review Best Practices</h1>
                </div>
            </div>

            {/* Navigation */}
            <div className="mb-8 flex flex-wrap gap-4">
                {codeReviewsJson.sections.map((section) => (
                    <button
                        key={section.number}
                        onClick={() => setActiveSection(section.number)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeSection === section.number
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                        }`}
                    >
                        {sectionIcons[section.number]}
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
                {codeReviewsJson.sections.map((section) => (
                    activeSection === section.number && (
                        <div key={section.number}>
                            {renderSection(section)}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default CodeReviewsPage;