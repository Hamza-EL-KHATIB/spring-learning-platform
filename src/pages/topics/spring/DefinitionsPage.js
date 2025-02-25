import React, { useState, useEffect } from 'react';
import { Book, Search, Globe, Info } from 'lucide-react';

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

const DefinitionCard = ({ definition }) => {
    return (
        <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400">
                    <Book className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{definition.term}</h3>
            </div>
            <p className="text-gray-300">{definition.definition}</p>
        </div>
    );
};

const DefinitionsPage = () => {
    // Get the language preference from localStorage if available, otherwise default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('definitionsPageLanguage') || 'en';
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDefinitions, setFilteredDefinitions] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [title, setTitle] = useState('Spring Definitions');

    // Change the language and save the preference
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('definitionsPageLanguage', lang);
    };

    // Load the definitions based on language
    useEffect(() => {
        const loadDefinitions = async () => {
            try {
                // This approach directly references the uploaded files from your documents
                // Using dynamic import to get the right file based on language
                let definitionsData;

                if (language === 'en') {
                    definitionsData = {
                        title: "Spring Interview Definitions",
                        definitions: [
                            {
                                term: "Inversion of Control (IoC)",
                                definition: "A design principle where the control of object creation and dependency management is delegated to an external container, enhancing modularity and testability."
                            },
                            {
                                term: "Dependency Injection (DI)",
                                definition: "A pattern in which an object's dependencies are provided by an external source (usually the IoC container) rather than the object instantiating them itself, promoting loose coupling."
                            },
                            {
                                term: "IoC Container",
                                definition: "The core component of the Spring framework that manages the lifecycle, configuration, and dependency injection of beans. It instantiates and wires application objects based on configuration metadata."
                            },
                            {
                                term: "Bean",
                                definition: "An object that is instantiated, configured, and managed by the Spring IoC container. Beans can be defined using XML, annotations, or Java configuration."
                            },
                            {
                                term: "Bean Lifecycle",
                                definition: "The complete process a Spring bean undergoes—from instantiation and dependency injection to initialization and eventual destruction—with opportunities for custom behavior at various stages."
                            },
                            {
                                term: "ApplicationContext vs BeanFactory",
                                definition: "BeanFactory provides basic dependency injection capabilities, whereas ApplicationContext adds enterprise features like event propagation, internationalization, and resource management."
                            },
                            {
                                term: "Autowiring",
                                definition: "A feature in Spring that automatically resolves and injects bean dependencies by type, name, or constructor, reducing the need for explicit configuration."
                            },
                            {
                                term: "Bean Scopes",
                                definition: "Defines the lifecycle and visibility of a bean within the container. Common scopes include singleton, prototype, request, session, and application."
                            },
                            {
                                term: "Aspect-Oriented Programming (AOP)",
                                definition: "A programming paradigm that separates cross-cutting concerns (like logging, security, or transaction management) from business logic using aspects, advices, join points, and pointcuts."
                            },
                            {
                                term: "Spring Boot",
                                definition: "An opinionated framework built on top of Spring that simplifies application development by providing auto-configuration, starter dependencies, and embedded servers, significantly reducing boilerplate configuration."
                            },
                            {
                                term: "Transaction Management in Spring",
                                definition: "A mechanism for managing transactions declaratively or programmatically to ensure data consistency and integrity, integrating with various transaction managers like JTA, JDBC, or Hibernate."
                            }
                        ]
                    };
                } else {
                    // This would be your French definitions - using the same content for now
                    definitionsData = {
                        title: "Définitions pour Entretiens Spring",
                        definitions: [
                            {
                                term: "Inversion of Control (IoC)",
                                definition: "Un principe de conception où le contrôle de la création d'objets et de la gestion des dépendances est délégué à un conteneur externe, améliorant la modularité et la testabilité."
                            },
                            {
                                term: "Dependency Injection (DI)",
                                definition: "Un modèle dans lequel les dépendances d'un objet sont fournies par une source externe (généralement le conteneur IoC) plutôt que l'objet les instanciant lui-même, favorisant un couplage faible."
                            },
                            {
                                term: "Conteneur IoC",
                                definition: "Le composant central du framework Spring qui gère le cycle de vie, la configuration et l'injection de dépendances des beans. Il instancie et relie les objets d'application en fonction des métadonnées de configuration."
                            },
                            {
                                term: "Bean",
                                definition: "Un objet qui est instancié, configuré et géré par le conteneur IoC de Spring. Les beans peuvent être définis à l'aide de XML, d'annotations ou de configuration Java."
                            },
                            {
                                term: "Cycle de vie d'un Bean",
                                definition: "Le processus complet qu'un bean Spring subit, de l'instanciation et l'injection de dépendances à l'initialisation et à la destruction éventuelle, avec des opportunités de comportement personnalisé à différentes étapes."
                            },
                            {
                                term: "ApplicationContext vs BeanFactory",
                                definition: "BeanFactory fournit des capacités d'injection de dépendances de base, tandis qu'ApplicationContext ajoute des fonctionnalités d'entreprise comme la propagation d'événements, l'internationalisation et la gestion des ressources."
                            },
                            {
                                term: "Autowiring",
                                definition: "Une fonctionnalité de Spring qui résout et injecte automatiquement les dépendances des beans par type, nom ou constructeur, réduisant la nécessité d'une configuration explicite."
                            },
                            {
                                term: "Portées des Beans",
                                definition: "Définit le cycle de vie et la visibilité d'un bean dans le conteneur. Les portées courantes incluent singleton, prototype, request, session et application."
                            },
                            {
                                term: "Programmation Orientée Aspect (AOP)",
                                definition: "Un paradigme de programmation qui sépare les préoccupations transversales (comme la journalisation, la sécurité ou la gestion des transactions) de la logique métier en utilisant des aspects, des conseils, des points de jonction et des pointcuts."
                            },
                            {
                                term: "Spring Boot",
                                definition: "Un framework basé sur Spring qui simplifie le développement d'applications en fournissant une auto-configuration, des dépendances de démarrage et des serveurs intégrés, réduisant considérablement la configuration répétitive."
                            },
                            {
                                term: "Gestion des Transactions dans Spring",
                                definition: "Un mécanisme pour gérer les transactions de manière déclarative ou programmatique afin d'assurer la cohérence et l'intégrité des données, s'intégrant à divers gestionnaires de transactions comme JTA, JDBC ou Hibernate."
                            }
                        ]
                    };
                }

                setTitle(definitionsData.title);
                setDefinitions(definitionsData.definitions);
            } catch (error) {
                console.error('Error loading definitions:', error);
                setDefinitions([]);
            }
        };

        loadDefinitions();
    }, [language]);

    // Filter definitions based on search term
    useEffect(() => {
        if (definitions && Array.isArray(definitions)) {
            setFilteredDefinitions(
                definitions.filter(def =>
                    def.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    def.definition.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [definitions, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Language Selector */}
            <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
            />

            {/* Header */}
            <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                <p className="text-gray-300">
                    {language === 'en'
                        ? 'Key Spring Framework concepts and definitions for interviews and reference'
                        : 'Concepts et définitions clés de Spring Framework pour les entretiens et référence'}
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={language === 'en' ? "Search definitions..." : "Rechercher des définitions..."}
                    className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                )}
            </div>

            {/* Definitions Grid */}
            {filteredDefinitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDefinitions.map((definition, index) => (
                        <DefinitionCard key={index} definition={definition} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Info className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium text-gray-400 mb-2">
                        {language === 'en' ? 'No definitions found' : 'Aucune définition trouvée'}
                    </h3>
                    <p className="text-gray-500">
                        {language === 'en'
                            ? 'Try another search term or clear the search'
                            : 'Essayez un autre terme de recherche ou effacez la recherche'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DefinitionsPage;