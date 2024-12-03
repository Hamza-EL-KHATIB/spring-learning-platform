import React from 'react';
import { Clock, Home, User, Heart, Book, MapPin, Activity, Cloud, Box } from 'lucide-react';

const tabGroups = {
    basics: {
        title: 'Basics',
        icon: Book,
        categories: [
            'Kardinalzahlen (Cardinal Numbers)',
            'Ordinalzahlen (Ordinal Numbers)',
            'Farben (Colors)',
            'Formen (Shapes and Forms)',
            'Formular (Form)'
        ]
    },
    timeAndLocation: {
        title: 'Time & Location',
        icon: Clock,
        categories: [
            'Zeitangaben (Time Expressions)',
            'Kalender (Calendar)',
            'Uhrzeit (Time of Day)',
            'Himmelsrichtungen (Cardinal Directions)',
            'Die Wegbeschreibung (Giving Directions)'
        ]
    },
    people: {
        title: 'People & Personal',
        icon: User,
        categories: [
            'Familie (Family)',
            'Familienstand (Marital Status)',
            'Freunde und Bekannte (Friends and Acquaintances)',
            'Körperteile (Body Parts)',
            'Gefühle und Emotionen (Feelings and Emotions)'
        ]
    },
    living: {
        title: 'Living',
        icon: Home,
        categories: [
            'Haushalt (Household Items)',
            'Wohnen/Zimmersuche (Living/Room Search)',
            'Materialien (Materials)',
            'Waschen (Washing)',
            'Kleidung (Clothing)'
        ]
    },
    foodAndShopping: {
        title: 'Food & Shopping',
        icon: Box,
        categories: [
            'Essen und Trinken (Food and Drinks)',
            'Im Restaurant (At the Restaurant)',
            'Verpackungen (Packaging)',
            'Einkaufen und Dienstleistungen (Shopping and Services)'
        ]
    },
    education: {
        title: 'Education & Work',
        icon: Book,
        categories: [
            'Bildung (Education)',
            'Arbeit und Beruf (Work and Profession)',
            'Technik/Geräte (Technology/Devices)'
        ]
    },
    travel: {
        title: 'Travel & Places',
        icon: MapPin,
        categories: [
            'Verkehrsmittel (Transportation)',
            'Durch die Stadt (Around the City)',
            'Länder und Sprachen (Countries and Languages)',
            'Kontinente (Continents)'
        ]
    },
    leisure: {
        title: 'Leisure & Activities',
        icon: Activity,
        categories: [
            'Freizeit und Hobbys (Leisure and Hobbies)',
            'Sport und Sportarten (Sports and Sports Activities)',
            'Malerei/Kunst (Painting/Art)'
        ]
    },
    healthAndSafety: {
        title: 'Health & Safety',
        icon: Heart,
        categories: [
            'Gesundheit (Health)',
            'Notfälle und Erste Hilfe (Emergencies and First Aid)'
        ]
    },
    natureAndEnvironment: {
        title: 'Nature & Environment',
        icon: Cloud,
        categories: [
            'Natur und Landschaft (Nature and Landscape)',
            'Wetter und Klima (Weather and Climate)'
        ]
    }
};

const TabButton = ({ active, icon: Icon, title, onClick }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium 
            transition-all duration-300 ease-in-out
            ${active
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
        }
            border border-gray-700/50 hover:border-purple-500/30
        `}
    >
        <Icon className="w-4 h-4" />
        <span>{title}</span>
    </button>
);

const VocabularyTabs = ({ activeTab, setActiveTab, onSelectCategory, totalWords = 0, currentWords = 0 }) => {
    return (
        <div>
            {/* Navigation Section */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 mb-6">
                <div className="flex flex-wrap gap-3">
                    {Object.entries(tabGroups).map(([key, group]) => (
                        <TabButton
                            key={key}
                            active={activeTab === key}
                            icon={group.icon}
                            title={group.title}
                            onClick={() => setActiveTab(key)}
                        />
                    ))}
                </div>
            </div>

            {/* Categories Section in Sidebar */}
            {activeTab && (
                <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-4">
                    <div className="flex flex-col gap-2">
                        {tabGroups[activeTab].categories.map((category) => {
                            const [german, english] = category.split(' (');
                            return (
                                <button
                                    key={category}
                                    onClick={() => onSelectCategory(category)}
                                    className="group relative p-3 rounded-lg transition-all duration-300
                                             bg-transparent hover:bg-gray-800/80 text-left w-full
                                             border-l-2 border-transparent hover:border-l-purple-500
                                             pl-4"
                                >
                                    <div className="flex flex-col">
                                        <h3 className="text-base font-medium flex items-center gap-2">
                                            <span className="text-purple-400/70 group-hover:text-purple-400 transition-colors">
                                                {german}
                                            </span>
                                        </h3>
                                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors mt-0.5">
                                            ({english}
                                        </p>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-500/0
                                                  group-hover:to-purple-500/5 transition-opacity opacity-0 group-hover:opacity-100
                                                  rounded-lg pointer-events-none" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VocabularyTabs;