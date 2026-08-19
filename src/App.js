import React, { lazy, Suspense } from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
const TopicPage = lazy(() => import('./pages/TopicPage'));
// Java imports
const CollectionsPage = lazy(() => import('./pages/topics/java/CollectionsPage'));
const ConcurrencyPage = lazy(() => import('./pages/topics/java/ConcurrencyPage'));
const ExceptionsPage = lazy(() => import('./pages/topics/java/ExceptionsPage'));
const FeaturesPage = lazy(() => import('./pages/topics/java/FeaturesPage'));
const UnitTestingPage = lazy(() => import('./pages/topics/java/UnitTestingPage'));

// Spring imports
const SpringBootPage = lazy(() => import('./pages/topics/spring/BootPage'));
const SpringCorePage = lazy(() => import('./pages/topics/spring/CorePage'));
const SpringDataPage = lazy(() => import('./pages/topics/spring/DataPage'));
const SecurityPage = lazy(() => import('./pages/topics/spring/SecurityPage'));
const SpringRestPage = lazy(() => import('./pages/topics/spring/RestPage'));
const SpringGraphQLPage = lazy(() => import('./pages/topics/spring/GraphQLPage'));
const SpringDefinitionsPage = lazy(() => import('./pages/topics/spring/DefinitionsPage'));

// Database imports
const SQLPage = lazy(() => import('./pages/topics/databases/SQLPage'));
const HibernatePage = lazy(() => import('./pages/topics/databases/HibernatePage'));
const TransactionsPage = lazy(() => import('./pages/topics/databases/TransactionsPage'));
const RedisPage = lazy(() => import('./pages/topics/databases/RedisPage'));
const NoSQLPage = lazy(() => import('./pages/topics/databases/NoSQLPage'));

// Architecture imports
const DesignPatternsPage = lazy(() => import('./pages/topics/architecture/DesignPatternsPage'));
const SolidPage = lazy(() => import('./pages/topics/architecture/SolidPage'));
const PrinciplesPage = lazy(() => import('./pages/topics/architecture/PrinciplesPage'));
const MicroservicesPage = lazy(() => import('./pages/topics/architecture/MicroservicesPage'));
const KafkaPage = lazy(() => import('./pages/topics/architecture/KafkaPage'));
const SystemDesignPage = lazy(() => import('./pages/topics/architecture/SystemDesignPage'));
const PerformancePage = lazy(() => import('./pages/topics/architecture/PerformancePage'));

// DevOps imports
const GitPage = lazy(() => import('./pages/topics/devops/GitPage'));
const CicdPage = lazy(() => import('./pages/topics/devops/CicdPage'));
const ContainersPage = lazy(() => import('./pages/topics/devops/ContainersPage'));
const PracticesPage = lazy(() => import('./pages/topics/devops/PracticesPage'));
const CloudPage = lazy(() => import('./pages/topics/devops/CloudPage'));

// Agile imports
const ScrumPage = lazy(() => import('./pages/topics/agile/ScrumPage'));

const VocabularyPage = lazy(() => import('./pages/topics/german/VocabularyPage'));

const KonjugationPage = lazy(() => import('./pages/topics/german/KonjugationPage'));

const CodeReviewsPage = lazy(() => import('./pages/topics/bestPractices/CodeReviewsPage'));
const QuestionBankPage = lazy(() => import('./pages/topics/practice/QuestionBankPage'));
const QaByLevelPage = lazy(() => import('./pages/topics/practice/QaByLevelPage'));
const DsaPatternsPage = lazy(() => import('./pages/topics/practice/DsaPatternsPage'));
const ScenariosPage = lazy(() => import('./pages/topics/practice/ScenariosPage'));
const BehavioralPage = lazy(() => import('./pages/topics/practice/BehavioralPage'));

const LearningPortal = lazy(() => import('./pages/LearningPortal'));

const GermanCasesPage = lazy(() => import('./pages/topics/german/GermanCasesPage'));
const ArticlesPage = lazy(() => import('./pages/topics/german/ArticlesPage'));
const AdjectivesPage = lazy(() => import('./pages/topics/german/AdjectivesPage'));
const CasesPage = lazy(() => import('./pages/topics/german/CasesPage'));
const JavaFundamentalsPage = lazy(() => import('./pages/topics/java/JavaFundamentalsPage'));
const FunctionalProgrammingPage = lazy(() => import('./pages/topics/java/FunctionalProgrammingPage'));
const JvmInternalsPage = lazy(() => import('./pages/topics/java/JvmInternalsPage'));
const ModernJavaPage = lazy(() => import('./pages/topics/java/ModernJavaPage'));

// Shown while a route's chunk (and its content JSON) downloads.
const PageLoading = () => (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading">
        <div className="w-6 h-6 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
    </div>
);

const App = () => {
    return (
        <Router>
            <Layout>
                <Suspense fallback={<PageLoading />}>
                <Routes>
                        <Route path="/" element={<HomePage/>}/>

                        {/*German Routes*/}
                        <Route path="/learn/vocabulary" element={<VocabularyPage/>}/>
                        <Route path="/learn/konjugation" element={<KonjugationPage/>}/>
                        <Route path="/learn/german" element={<LearningPortal/>}/>
                        <Route path="/learn/german-cases" element={<GermanCasesPage/>}/>
                        <Route path="/german/articles" element={<ArticlesPage/>}/>
                        <Route path="/german/adjectives" element={<AdjectivesPage/>}/>
                        <Route path="/german/cases" element={<CasesPage/>}/>


                        {/* Java Routes */}
                        <Route path="/java/collections" element={<CollectionsPage/>}/>
                        <Route path="/java/concurrency" element={<ConcurrencyPage/>}/>
                        <Route path="/java/exceptions" element={<ExceptionsPage/>}/>
                        <Route path="/java/features" element={<FeaturesPage/>}/>
                        <Route path="/java/fundamentals" element={<JavaFundamentalsPage/>}/>
                        <Route path="/java/testing" element={<UnitTestingPage/>}/>
                        <Route path="/java/functional-programming" element={<FunctionalProgrammingPage/>}/>
                        <Route path="/java/jvm" element={<JvmInternalsPage/>}/>
                        <Route path="/java/modern" element={<ModernJavaPage/>}/>

                        {/* Spring Routes */}
                        <Route path="/spring/boot" element={<SpringBootPage/>}/>
                        <Route path="/spring/core" element={<SpringCorePage/>}/>
                        <Route path="/spring/data" element={<SpringDataPage/>}/>
                        <Route path="/spring/security" element={<SecurityPage/>}/>
                        <Route path="/spring/rest" element={<SpringRestPage/>}/>
                        <Route path="/spring/graphql" element={<SpringGraphQLPage/>}/>
                        <Route path="/spring/definitions" element={<SpringDefinitionsPage/>}/>

                        {/* Database Routes */}
                        <Route path="/databases/sql" element={<SQLPage/>}/>
                        <Route path="/databases/hibernate" element={<HibernatePage/>}/>
                        <Route path="/databases/transactions" element={<TransactionsPage/>}/>
                        <Route path="/databases/redis" element={<RedisPage/>}/>
                        <Route path="/databases/nosql" element={<NoSQLPage/>}/>

                        {/* Architecture Routes */}
                        <Route path="/architecture/design-patterns" element={<DesignPatternsPage/>}/>
                        <Route path="/architecture/solid" element={<SolidPage/>}/>
                        <Route path="/architecture/principles" element={<PrinciplesPage/>}/>
                        <Route path="/architecture/microservices" element={<MicroservicesPage/>}/>
                        <Route path="/architecture/kafka" element={<KafkaPage/>}/>
                        <Route path="/architecture/system-design" element={<SystemDesignPage/>}/>
                        <Route path="/architecture/performance" element={<PerformancePage/>}/>

                        {/* DevOps Routes */}
                        <Route path="/devops/git" element={<GitPage/>}/>
                        <Route path="/devops/cicd" element={<CicdPage/>}/>
                        <Route path="/devops/containers" element={<ContainersPage/>}/>
                        <Route path="/devops/practices" element={<PracticesPage/>}/>
                        <Route path="/devops/cloud" element={<CloudPage/>}/>

                        {/* Agile Routes */}
                        <Route path="/agile/scrum" element={<ScrumPage/>}/>

                        {/* Practice Routes */}
                        <Route path="/practice/questions" element={<QuestionBankPage/>}/>
                        <Route path="/practice/by-level" element={<QaByLevelPage/>}/>
                        <Route path="/practice/dsa" element={<DsaPatternsPage/>}/>
                        <Route path="/practice/scenarios" element={<ScenariosPage/>}/>
                        <Route path="/practice/behavioral" element={<BehavioralPage/>}/>

                        {/* Best Practices Routes */}
                        <Route path="/best-practices/code-reviews" element={<CodeReviewsPage/>}/>

                        {/* Fallback Route for any topic that doesn't need special handling */}
                        <Route path="/:section/:topic" element={<TopicPage/>}/>

                        {/* 404 Route */}
                        <Route path="*" element={
                            <div className="text-center py-16">
                                <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                                <p className="text-gray-400">The page you're looking for doesn't exist.</p>
                            </div>
                        }/>
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
};

export default App;
