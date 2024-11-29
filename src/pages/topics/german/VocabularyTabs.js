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

const CategoryCard = ({ category, onClick }) => {
    const [german, english] = category.split(' (');
    return (
        <button
            onClick={() => onClick(category)}
            className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-6 text-left border border-gray-700/50 hover:border-purple-500/50 transition-colors w-full group"
        >
            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-200 group-hover:text-purple-300 transition-colors">
                    {german}
                </h3>
                <p className="text-sm text-gray-500">
                    ({english}
                </p>
            </div>
        </button>
    );
};

const VocabularyTabs = ({ activeTab, setActiveTab, onSelectCategory, selectedWords = [] }) => {
    return (
        <div className="space-y-6">
            {/* Word Count */}
            <div className="flex justify-end">
                <span className="px-4 py-2 bg-gray-800/50 rounded-lg text-gray-400 text-sm">
                    Total Words: <span className="text-purple-400 font-medium">{selectedWords.length}</span>
                </span>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4">
                {Object.entries(tabGroups).map(([key, group]) => {
                    const Icon = group.icon;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeTab === key
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {group.title}
                        </button>
                    );
                })}
            </div>

            {/* Category Cards Grid */}
            {activeTab && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tabGroups[activeTab].categories.map((category) => (
                        <CategoryCard
                            key={category}
                            category={category}
                            onClick={onSelectCategory}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VocabularyTabs;