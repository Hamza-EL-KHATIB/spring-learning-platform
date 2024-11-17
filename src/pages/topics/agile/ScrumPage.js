import React from 'react';
import scrumJson from '../../../data/scrum/scrum.json';
import {
    Users,
    Clock,
    Box,
    BarChart,
    AlertTriangle,
    Calendar,
    CheckCircle2,
    Target,
    ListChecks,
    Layers
} from 'lucide-react';

const RoleCard = ({ role }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{role.name}</h3>
        <ul className="space-y-2">
            {role.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-400" />
                    {responsibility}
                </li>
            ))}
        </ul>
    </div>
);

const EventCard = ({ event }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                <p className="text-sm text-gray-400">{event.duration}</p>
            </div>
        </div>

        <p className="text-gray-300 mb-4">{event.purpose}</p>

        {event.key_points && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Key Points:</h4>
                <ul className="space-y-1">
                    {event.key_points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {event.outcomes && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Outcomes:</h4>
                <ul className="space-y-1">
                    {event.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <Target className="w-4 h-4 text-cyan-400" />
                            {outcome}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {event.key_questions && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Key Questions:</h4>
                <ul className="space-y-1">
                    {event.key_questions.map((question, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                            {question}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {event.activities && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Activities:</h4>
                <ul className="space-y-1">
                    {event.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <ListChecks className="w-4 h-4 text-green-400" />
                            {activity}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {event.focus_areas && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Focus Areas:</h4>
                <ul className="space-y-1">
                    {event.focus_areas.map((area, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <Target className="w-4 h-4 text-yellow-400" />
                            {area}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const ArtifactCard = ({ artifact }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{artifact.name}</h3>
        <p className="text-gray-300 mb-4">{artifact.description}</p>

        {artifact.characteristics && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Characteristics:</h4>
                <ul className="space-y-1">
                    {artifact.characteristics.map((characteristic, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                            {characteristic}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {artifact.elements && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Elements:</h4>
                <ul className="space-y-1">
                    {artifact.elements.map((element, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <Layers className="w-4 h-4 text-purple-400" />
                            {element}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {artifact.requirements && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Requirements:</h4>
                <ul className="space-y-1">
                    {artifact.requirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            {requirement}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const MetricCard = ({ metric }) => (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-4">
        <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-5 h-5 text-cyan-400" />
            <h4 className="font-medium text-white">{metric.name}</h4>
        </div>
        <p className="text-gray-300">{metric.description}</p>
    </div>
);

const ScrumPage = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{scrumJson.title}</h1>
                <p className="text-gray-300">{scrumJson.description}</p>
            </div>

            {/* Core Components */}
            <div className="space-y-12">
                {/* Roles Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Core Roles</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {scrumJson.core_components.roles.map((role, idx) => (
                            <RoleCard key={idx} role={role} />
                        ))}
                    </div>
                </div>

                {/* Events Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Scrum Events</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {scrumJson.core_components.events.map((event, idx) => (
                            <EventCard key={idx} event={event} />
                        ))}
                    </div>
                </div>

                {/* Artifacts Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Box className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Artifacts</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {scrumJson.core_components.artifacts.map((artifact, idx) => (
                            <ArtifactCard key={idx} artifact={artifact} />
                        ))}
                    </div>
                </div>

                {/* Key Concepts Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Target className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Key Concepts</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {Object.entries(scrumJson.key_concepts).map(([key, value], idx) => (
                            <div key={idx} className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
                                <h3 className="text-lg font-medium text-white capitalize mb-2">{key}</h3>
                                <p className="text-gray-300">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Practices Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <CheckCircle2 className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Best Practices</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {Object.entries(scrumJson.best_practices).map(([category, practices], idx) => (
                            <div key={idx} className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6">
                                <h3 className="text-lg font-medium text-white capitalize mb-4">
                                    {category.replace(/_/g, ' ')}
                                </h3>
                                <ul className="space-y-2">
                                    {practices.map((practice, practiceIdx) => (
                                        <li key={practiceIdx} className="flex items-center gap-2 text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                                            {practice}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-2xl font-bold text-white">Common Pitfalls</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {scrumJson.common_pitfalls.map((pitfall, idx) => (
                            <div key={idx} className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                    {pitfall}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Key Metrics</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {scrumJson.metrics.map((metric, idx) => (
                            <MetricCard key={idx} metric={metric} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrumPage;