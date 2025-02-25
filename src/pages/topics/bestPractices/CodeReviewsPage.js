import React, { useState, useEffect } from 'react';
import codeReviewsJsonEn from '../../../data/bestPractices/codeReviews.json';
import codeReviewsJsonFr from '../../../data/bestPractices/codeReviews-fr.json';
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
    CheckCircle2,
    Globe
} from 'lucide-react';

// Language Selector Component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-purple-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
                <button
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'en'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => onLanguageChange('fr')}
                    className={`px-3 py-1.5 text-sm ${
                        currentLanguage === 'fr'
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    Français
                </button>
            </div>
        </div>
    );
};

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
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('codeReviewsPageLanguage') || 'en';
    });

    const [activeSection, setActiveSection] = useState(1);
    const [codeReviewsJson, setCodeReviewsJson] = useState(
        language === 'en' ? codeReviewsJsonEn : codeReviewsJsonFr
    );

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('codeReviewsPageLanguage', lang);
    };

    useEffect(() => {
        // Update content based on selected language
        setCodeReviewsJson(language === 'en' ? codeReviewsJsonEn : codeReviewsJsonFr);
    }, [language]);

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
                        <TopicCard title={language === 'en' ? "Roles" : "Rôles"} icon={Users}>
                            <div className="grid gap-4">
                                <DescriptionCard
                                    title={language === 'en' ? "Observers" : "Observateurs"}
                                    description={section.content["Additions and Corrections"].Roles.Observers.description}
                                />
                                <DescriptionCard
                                    title={language === 'en' ? "Secondary Reviewers" : "Relecteurs Secondaires"}
                                    description={section.content["Additions and Corrections"].Roles["Secondary Reviewers"].description}
                                />
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Submission Guidelines" : "Directives de Soumission"}
                            icon={FileCode}
                        >
                            <div className="grid gap-4">
                                {Object.entries(section.content["Additions and Corrections"]["Submission Guidelines"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Review Timeline" : "Calendrier des Revues"}
                            icon={Clock}
                        >
                            <DescriptionCard
                                title={language === 'en' ? "Prioritization" : "Priorisation"}
                                points={section.content["Additions and Corrections"]["Review Timeline"].Prioritization.points}
                            />
                        </TopicCard>
                    </div>
                );

            case 2: // Steps for Reviewing Code
                const additions = section.content["Additions and Corrections"];
                return (
                    <div className="grid gap-6">
                        <TopicCard
                            title={language === 'en' ? "Context and Requirements" : "Contexte et Exigences"}
                            icon={BookOpen}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Understand the Context"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Breaking Changes" : "Changements Majeurs"}
                            icon={AlertTriangle}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Check for Breaking Changes"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Test Coverage" : "Couverture des Tests"}
                            icon={CheckSquare}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Test Coverage"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "API Changes" : "Modifications d'API"}
                            icon={Settings}
                        >
                            <div className="grid gap-4">
                                <DescriptionCard
                                    title={language === 'en' ? "API Documentation" : "Documentation d'API"}
                                    points={additions["API Changes"].Documentation.points}
                                />
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Logic and Performance" : "Logique et Performance"}
                            icon={Settings}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Logic and Performance"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Code Quality" : "Qualité du Code"}
                            icon={FileCode}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Code Modularity and Readability"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title="Git & CI/CD"
                            icon={GitPullRequest}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Git and CI/CD Checks"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Tools and Automation" : "Outils et Automatisation"}
                            icon={Settings}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Tools and Automation"]).map(([category, content]) => (
                                    <div key={category}>
                                        <h4 className="text-lg font-medium text-purple-300 mb-3">
                                            {getTranslatedKey(category, language)}
                                        </h4>
                                        <div className="grid gap-3">
                                            {Object.entries(content).map(([subKey, subValue]) => (
                                                <DescriptionCard
                                                    key={subKey}
                                                    title={getTranslatedKey(subKey, language)}
                                                    description={typeof subValue === 'object' ? subValue.description : subValue}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Security" : "Sécurité"}
                            icon={Shield}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Security Considerations"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
                                        description={value.description}
                                    />
                                ))}
                            </div>
                        </TopicCard>

                        <TopicCard
                            title={language === 'en' ? "Legal and Compliance" : "Légal et Conformité"}
                            icon={Scale}
                        >
                            <div className="grid gap-4">
                                {Object.entries(additions["Legal and Compliance"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
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
                        <TopicCard
                            title={language === 'en' ? "Code Quality Checklist" : "Liste de Contrôle de Qualité du Code"}
                            icon={CheckSquare}
                        >
                            <div className="grid gap-4">
                                {Object.entries(section.content["New Section"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
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
                        <TopicCard
                            title={language === 'en' ? "Common Pitfalls" : "Pièges Courants"}
                            icon={AlertTriangle}
                        >
                            <div className="grid gap-4">
                                {Object.entries(section.content["Additions"]).map(([key, value]) => (
                                    <DescriptionCard
                                        key={key}
                                        title={getTranslatedKey(key, language)}
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

    // Helper function to translate key names based on selected language
    const getTranslatedKey = (key, lang) => {
        const translations = {
            // Section 1
            "Up-to-date Branches": "Branches à jour",
            "PR Size": "Taille des PR",
            "Automated Checklists": "Listes de vérification automatisées",

            // Section 2
            "Business Requirements": "Exigences métier",
            "Related Modules": "Modules associés",
            "Backward Compatibility": "Compatibilité ascendante",
            "Deprecation Notices": "Avis de dépréciation",
            "Quality of Tests": "Qualité des tests",
            "Integration Tests": "Tests d'intégration",
            "Algorithm Efficiency": "Efficacité des algorithmes",
            "Resource Utilization": "Utilisation des ressources",
            "Design Patterns": "Patrons de conception",
            "Comments and Documentation": "Commentaires et documentation",
            "Commit Messages": "Messages de commit",
            "No Sensitive Data": "Absence de données sensibles",
            "GitHub Actions": "Actions GitHub",
            "Automated Code Reviews": "Revues de code automatisées",
            "Security Scans": "Analyses de sécurité",
            "Code Quality Tools": "Outils de qualité du code",
            "IDE Integration": "Intégration IDE",
            "Custom Rulesets": "Ensembles de règles personnalisées",
            "Static Code Analysis": "Analyse statique du code",
            "Performance Profiling": "Profilage de performance",
            "Thread Safety Checks": "Vérifications de sécurité des threads",
            "Input Validation": "Validation des entrées",
            "Authentication and Authorization": "Authentification et autorisation",
            "Data Privacy": "Confidentialité des données",
            "Dependency Management": "Gestion des dépendances",
            "Licensing": "Licences",
            "Regulatory Compliance": "Conformité réglementaire",

            // Section 3
            "Small, Focused Commits": "Commits petits et ciblés",
            "Consistent Coding Style": "Style de codage cohérent",
            "Documentation": "Documentation",
            "Error Handling": "Gestion des erreurs",

            // Section 4
            "Nitpicking": "Pinaillage",
            "Bias": "Préjugés",
            "Approval Without Review": "Approbation sans revue"
        };

        if (lang === 'fr' && translations[key]) {
            return translations[key];
        }
        return key;
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Title Section */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center gap-3">
                    <GitPullRequest className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-white">
                        {language === 'en' ? 'Code Review Best Practices' : 'Meilleures Pratiques de Revue de Code'}
                    </h1>
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