import React, {useState, useRef, useEffect, useCallback, memo} from 'react';
import {Search, ChevronDown, X, ChevronLeft, ChevronRight} from 'lucide-react';

// Main component that enhances the Interview FAQs experience
const EnhancedInterviewFAQs = ({section, language}) => {
    if (!section?.categories?.length) return null;

    return (
        <div className="space-y-8">
            {/* Visually engaging header */}
            <div
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20 shadow-lg"
            >
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
                    {language === 'en' ? 'Interview Roadmap 🗺️' : 'Guide d\'entretien 🗺️'}
                </h2>
                <p className="text-gray-300">{section.description}</p>
            </div>

            {/* Interactive FAQ experience */}
            <FAQExperience categories={section.categories} language={language}/>
        </div>
    );
};

// The searchable, interactive FAQ component
const FAQExperience = memo(({categories, language}) => {
    const [searchText, setSearchText] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);
    const [expandedId, setExpandedId] = useState(null);

    // Filter function for search
    const searchFilter = useCallback((q, a) => {
        if (!searchText) return true;
        const text = searchText.toLowerCase();
        return q.toLowerCase().includes(text) || a.toLowerCase().includes(text);
    }, [searchText]);

    // Toggle question expansion
    const toggleQuestion = useCallback(id => {
        setExpandedId(current => current === id ? null : id);
    }, []);

    // Category icons to make navigation more visual
    const categoryIcons = ["💡", "🧠", "🔑", "⚡", "📦", "🔮", "🛠️", "🔄", "🏗️", "📝"];

    // Check if there are any search results
    const hasSearchResults = categories.some(c =>
        c.questions.some(q => searchFilter(q.question, q.answer))
    );

    return (
        <>
            {/* Search bar */}
            <div className="relative mb-8">
                <div
                    className="flex items-center bg-gray-800/70 rounded-full border border-gray-700 focus-within:border-cyan-500 transition-all shadow-md overflow-hidden">
                    <div className="pl-5">
                        <Search className="w-5 h-5 text-gray-400"/>
                    </div>
                    <input
                        type="text"
                        placeholder={language === 'en'
                            ? "What Java concept are you curious about?"
                            : "Quel concept Java vous intéresse ?"}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent text-white focus:outline-none placeholder-gray-400"
                    />
                    {searchText && (
                        <button
                            className="pr-5 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setSearchText('')}
                        >
                            <X className="w-4 h-4"/>
                        </button>
                    )}
                </div>
            </div>

            {!searchText ? (
                // Standard category view when not searching
                <>
                    {/* Visual category tabs */}
                    <CategoryTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categoryIcons={categoryIcons}
                        language={language}
                    />

                    {/* Questions for the active category */}
                    <div className="space-y-4">
                        {categories[activeCategory].questions.map((qa, j) => {
                            const questionId = `q-${activeCategory}-${j}`;
                            const isExpanded = expandedId === questionId;

                            return (
                                <QuestionCard
                                    key={j}
                                    qa={qa}
                                    isExpanded={isExpanded}
                                    toggleQuestion={() => toggleQuestion(questionId)}
                                    searchTerm=""
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                // Search results view
                <>
                    <div className="mb-4 px-1">
                        <h3 className="text-lg font-medium text-white">
                            {hasSearchResults
                                ? (language === 'en' ? 'Search Results' : 'Résultats de recherche')
                                : (language === 'en' ? 'No results found' : 'Aucun résultat trouvé')}
                        </h3>
                    </div>

                    {hasSearchResults ? (
                        <div className="space-y-6">
                            {categories.map((category, i) => {
                                const filteredQuestions = category.questions.filter(q =>
                                    searchFilter(q.question, q.answer)
                                );

                                if (filteredQuestions.length === 0) return null;

                                return (
                                    <div key={i} className="space-y-3">
                                        <div className="flex items-center mb-2">
                                            <span
                                                className="text-xl mr-2">{categoryIcons[i % categoryIcons.length]}</span>
                                            <h3 className="text-md font-medium text-cyan-300">{category.category}</h3>
                                        </div>

                                        {filteredQuestions.map((qa, j) => {
                                            const questionId = `sq-${i}-${j}`;
                                            const isExpanded = expandedId === questionId;

                                            return (
                                                <QuestionCard
                                                    key={j}
                                                    qa={qa}
                                                    isExpanded={isExpanded}
                                                    toggleQuestion={() => toggleQuestion(questionId)}
                                                    searchTerm={searchText}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-gray-800/40 rounded-xl p-8 text-center border border-gray-700/50">
                            <span className="text-4xl mb-4 block">🔍</span>
                            <p className="text-gray-300 mb-2">
                                {language === 'en' ? 'No matching questions found' : 'Aucune question correspondante trouvée'}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {language === 'en'
                                    ? 'Try different keywords or browse by category'
                                    : 'Essayez d\'autres mots-clés ou parcourez par catégorie'}
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    );
});

FAQExperience.displayName = 'FAQExperience';

// Component for rendering question cards with highlight capability
const QuestionCard = memo(({qa, isExpanded, toggleQuestion, searchTerm}) => {
    return (
        <div
            className={`bg-gray-800/60 rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 ${
                isExpanded ? 'shadow-lg border-cyan-500/30' : 'hover:border-gray-600'
            }`}
        >
            <button
                onClick={toggleQuestion}
                className="w-full text-left p-5 flex justify-between items-start"
            >
                <h4 className="text-md font-medium text-cyan-300 pr-6">
                    {searchTerm ? highlightSearchTerm(qa.question, searchTerm) : qa.question}
                </h4>
                <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isExpanded ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                >
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                    />
                </div>
            </button>

            {isExpanded && (
                <div className="p-5 pt-1 border-t border-gray-700/30 bg-gray-800/80">
                    <AnswerContent
                        answer={qa.answer}
                        searchTerm={searchTerm}
                    />
                </div>
            )}
        </div>
    );
});

QuestionCard.displayName = 'QuestionCard';

// Component for formatting answers with code blocks and highlighting
const AnswerContent = memo(({answer, searchTerm}) => {
    // Process the answer for code blocks and formatting
    if (!answer.includes('```') && !answer.includes('`')) {
        return (
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {searchTerm ? highlightSearchTerm(answer, searchTerm) : answer}
            </p>
        );
    }

    // Handle answers with code blocks and inline code
    if (answer.includes('```')) {
        return (
            <div className="space-y-3">
                {answer.split(/(```[\s\S]*?```)/g).map((part, idx) => {
                    if (part.startsWith('```')) {
                        // Extract clean code without backticks and language marker
                        const code = part.replace(/```(?:\w+)?\n|```/g, '');
                        return (
                            <div key={idx}
                                 className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                                {code}
                            </div>
                        );
                    }

                    // Skip empty parts
                    if (!part.trim()) return null;

                    // Format plain text with possible inline code
                    return (
                        <p key={idx} className="text-gray-300 leading-relaxed">
                            {part.split(/`([^`]+)`/).map((text, textIdx) => (
                                textIdx % 2 === 0 ? (
                                    <span key={textIdx}>
                    {searchTerm ? highlightSearchTerm(text, searchTerm) : text}
                  </span>
                                ) : (
                                    <code key={textIdx}
                                          className="bg-gray-800/70 px-1 py-0.5 rounded text-pink-300 font-mono">
                                        {text}
                                    </code>
                                )
                            ))}
                        </p>
                    );
                })}
            </div>
        );
    }

    // Handle answers with only inline code
    return (
        <p className="text-gray-300 leading-relaxed">
            {answer.split(/`([^`]+)`/).map((part, idx) => (
                idx % 2 === 0 ? (
                    <span key={idx}>{searchTerm ? highlightSearchTerm(part, searchTerm) : part}</span>
                ) : (
                    <code key={idx} className="bg-gray-800/70 px-1 py-0.5 rounded text-pink-300 font-mono">
                        {part}
                    </code>
                )
            ))}
        </p>
    );
});

AnswerContent.displayName = 'AnswerContent';

// Highlights search terms in text
const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;

    try {
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ?
                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-1 rounded">{part}</span> :
                        part
                )}
            </>
        );
    } catch (e) {
        // Fallback if regex fails
        return text;
    }
};

// Scrollable category tabs with visual indicators
const CategoryTabs = memo(({categories, activeCategory, setActiveCategory, categoryIcons, language}) => {
    const scrollRef = useRef(null);
    const [scrollState, setScrollState] = useState({canScrollLeft: false, canScrollRight: false});

    // Update scroll shadows based on scroll position
    const updateScrollShadows = useCallback(() => {
        if (!scrollRef.current) return;

        const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
        setScrollState({
            canScrollLeft: scrollLeft > 10,
            canScrollRight: scrollLeft < scrollWidth - clientWidth - 10
        });
    }, []);

    // Initialize and attach scroll event listener
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            updateScrollShadows();
            scrollElement.addEventListener('scroll', updateScrollShadows);
            window.addEventListener('resize', updateScrollShadows);

            return () => {
                scrollElement.removeEventListener('scroll', updateScrollShadows);
                window.removeEventListener('resize', updateScrollShadows);
            };
        }
    }, [updateScrollShadows]);

    // Scroll category into view when selected
    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            // The active button is inside the child div that contains all buttons
            const buttonsContainer = container.firstChild;
            const activeButton = buttonsContainer?.children?.[activeCategory];

            if (activeButton) {
                // Get visible area width
                const containerWidth = container.offsetWidth;
                // Get position of the button relative to the container
                const buttonLeft = activeButton.offsetLeft;
                const buttonWidth = activeButton.offsetWidth;

                // Calculate the ideal scroll position to center the button
                const idealScrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

                // Apply smooth scrolling
                container.scrollTo({
                    left: idealScrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeCategory]);

    // Scroll handlers
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -200, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: 200, behavior: 'smooth'});
        }
    };

    return (
        <div className="relative mb-8">
            {/* Navigation buttons */}
            {scrollState.canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-cyan-300 shadow-lg hover:bg-gray-700 transition-all"
                    aria-label={language === 'en' ? "Scroll categories left" : "Faire défiler les catégories vers la gauche"}
                >
                    <ChevronLeft className="w-5 h-5"/>
                </button>
            )}

            {scrollState.canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-cyan-300 shadow-lg hover:bg-gray-700 transition-all"
                    aria-label={language === 'en' ? "Scroll categories right" : "Faire défiler les catégories vers la droite"}
                >
                    <ChevronRight className="w-5 h-5"/>
                </button>
            )}

            {/* Scroll container with gradient indicators */}
            <div className="relative">
                {/* Left shadow gradient */}
                {scrollState.canScrollLeft && (
                    <div
                        className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                )}

                {/* Right shadow gradient */}
                {scrollState.canScrollRight && (
                    <div
                        className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
                )}

                {/* Scrollable tabs */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto py-2 px-2 no-scrollbar"
                    style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                >
                    <div className="flex space-x-3 px-4">
                        {categories.map((category, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(i)}
                                className={`px-4 py-2.5 rounded-full transition-all whitespace-nowrap flex items-center ${
                                    activeCategory === i
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105 font-medium'
                                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span className="mr-2">{categoryIcons[i % categoryIcons.length]}</span>
                                {category.category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

CategoryTabs.displayName = 'CategoryTabs';

export default EnhancedInterviewFAQs;
