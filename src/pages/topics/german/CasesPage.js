import React, { useState } from 'react';
import { Book, Info, Table, ClipboardCheck } from 'lucide-react';
import cases from '../../../data/german/cases.json';
import { ActivePanel, PageHeader, PageTabs, useTabs } from '../../../components/template/shell';
import { ContentCard, StyledListItem } from '../../../components/template/primitives';

const TABS = [
    { id: 'introduction', title: 'Introduction', icon: <Info className="w-4 h-4" /> },
    { id: 'cases', title: 'Cases', icon: <Book className="w-4 h-4" /> },
    { id: 'twoWayPrepositions', title: 'Two-Way Prepositions', icon: <Table className="w-4 h-4" /> },
    { id: 'memoryAids', title: 'Memory Aids', icon: <ClipboardCheck className="w-4 h-4" /> },
];

// term + meaning pairs (verbs, prepositions)
const TriggerList = ({ items, type }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, idx) => (
            <div
                key={idx}
                className="bg-gray-800/70 border border-gray-700/50 rounded-md px-3 py-2 flex items-center justify-between gap-2"
            >
                <span className="text-purple-300 text-sm">{item[type]}</span>
                <span className="text-gray-400 text-xs">{item.meaning}</span>
            </div>
        ))}
    </div>
);

const Examples = ({ examples }) => (
    <div className="space-y-2">
        {examples.map((example, idx) => (
            <div key={idx} className="bg-gray-800/70 border border-gray-700/50 rounded-md p-3">
                <p className="text-white mb-1">{example.german}</p>
                <p className="text-gray-300 text-sm mb-1">{example.english}</p>
                <p className="text-gray-500 text-xs">{example.explanation}</p>
            </div>
        ))}
    </div>
);

const CasesPage = () => {
    const [activeCase, setActiveCase] = useState('nominativ');
    const { activeId, select, activeTab } = useTabs(TABS, 'german-cases-rules');
    const current = cases.cases[activeCase];

    return (
        <div>
            <PageHeader title="German Cases (Fälle)" subtitle={cases.introduction.description} />

            <PageTabs tabs={TABS} activeId={activeId} onChange={select} />

            <ActivePanel title={activeTab?.title} icon={activeTab?.icon}>
                {activeId === 'introduction' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {cases.introduction.key_questions.map((item, idx) => (
                            <ContentCard key={idx} title={item.case}>
                                <ul className="space-y-1">
                                    {item.questions.map((q, qIdx) => (
                                        <StyledListItem key={qIdx}>{q}</StyledListItem>
                                    ))}
                                </ul>
                            </ContentCard>
                        ))}
                    </div>
                )}

                {activeId === 'cases' && (
                    <div className="space-y-3">
                        {/* Case selector, styled like the main tab bar */}
                        <div className="flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            {Object.keys(cases.cases).map((caseKey) => (
                                <button
                                    key={caseKey}
                                    onClick={() => setActiveCase(caseKey)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all border ${
                                        activeCase === caseKey
                                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
                                            : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                                    }`}
                                >
                                    {cases.cases[caseKey].name}
                                </button>
                            ))}
                        </div>

                        <ContentCard title={current.name} contentType="definition">
                            <p className="text-gray-300 text-sm">{current.definition}</p>
                        </ContentCard>

                        <ContentCard title="Usage">
                            <ul className="space-y-1">
                                {current.usage.map((use, idx) => (
                                    <StyledListItem key={idx}>{use}</StyledListItem>
                                ))}
                            </ul>
                        </ContentCard>

                        {current.common_triggers.verbs.length > 0 && (
                            <ContentCard title="Common Verbs">
                                <TriggerList items={current.common_triggers.verbs} type="verb" />
                            </ContentCard>
                        )}

                        {current.common_triggers.prepositions.length > 0 && (
                            <ContentCard title="Common Prepositions">
                                <TriggerList items={current.common_triggers.prepositions} type="preposition" />
                            </ContentCard>
                        )}

                        <ContentCard title="Examples" contentType="example">
                            <Examples examples={current.examples} />
                        </ContentCard>
                    </div>
                )}

                {activeId === 'twoWayPrepositions' && (
                    <div className="space-y-3">
                        <p className="text-gray-300 text-sm">{cases.two_way_prepositions.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <ContentCard title="Akkusativ (Motion)" contentType="features">
                                <p className="text-gray-300 text-sm">{cases.two_way_prepositions.rule.motion_akkusativ}</p>
                            </ContentCard>
                            <ContentCard title="Dativ (Location)" contentType="types">
                                <p className="text-gray-300 text-sm">{cases.two_way_prepositions.rule.location_dativ}</p>
                            </ContentCard>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {cases.two_way_prepositions.list.map((prep, idx) => (
                                <div key={idx} className="bg-gray-800/70 border border-gray-700/50 rounded-md p-3">
                                    <p className="text-purple-300 font-medium text-sm">{prep.preposition}</p>
                                    <p className="text-gray-400 text-xs">{prep.meaning}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeId === 'memoryAids' && (
                    <div className="space-y-3">
                        <ContentCard title="Logic">
                            <ul className="space-y-1">
                                {cases.memory_aids.logic.map((item, idx) => (
                                    <StyledListItem key={idx}>{item}</StyledListItem>
                                ))}
                            </ul>
                        </ContentCard>

                        <ContentCard title="Quick Tests" contentType="benefits">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {cases.memory_aids.quick_tests.map((test, idx) => (
                                    <div key={idx} className="bg-gray-800/70 border border-gray-700/50 rounded-md p-3">
                                        <h5 className="text-purple-300 font-medium mb-1 text-sm">{test.name}</h5>
                                        <p className="text-gray-300 text-xs">{test.hint}</p>
                                    </div>
                                ))}
                            </div>
                        </ContentCard>
                    </div>
                )}
            </ActivePanel>
        </div>
    );
};

export default CasesPage;
