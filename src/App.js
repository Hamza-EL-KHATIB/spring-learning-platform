import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
// Java imports
import CollectionsPage from './pages/topics/java/CollectionsPage';
import ConcurrencyPage from './pages/topics/java/ConcurrencyPage';
import ExceptionsPage from './pages/topics/java/ExceptionsPage';
import FeaturesPage from './pages/topics/java/FeaturesPage';
import UnitTestingPage from './pages/topics/java/UnitTestingPage';

// Spring imports
import SpringBootPage from './pages/topics/spring/BootPage';
import SpringCorePage from './pages/topics/spring/CorePage';
import SpringDataPage from './pages/topics/spring/DataPage';
import SecurityPage from './pages/topics/spring/SecurityPage';
import SpringRestPage from './pages/topics/spring/RestPage';
import SpringGraphQLPage from './pages/topics/spring/GraphQLPage';
import SpringDefinitionsPage from './pages/topics/spring/DefinitionsPage';

// Database imports
import SQLPage from './pages/topics/databases/SQLPage';
import HibernatePage from './pages/topics/databases/HibernatePage';
import TransactionsPage from './pages/topics/databases/TransactionsPage';
import RedisPage from './pages/topics/databases/RedisPage';
import NoSQLPage from './pages/topics/databases/NoSQLPage';

// Architecture imports
import DesignPatternsPage from './pages/topics/architecture/DesignPatternsPage';
import SolidPage from './pages/topics/architecture/SolidPage';
import PrinciplesPage from './pages/topics/architecture/PrinciplesPage';
import MicroservicesPage from './pages/topics/architecture/MicroservicesPage';
import KafkaPage from './pages/topics/architecture/KafkaPage';
import SystemDesignPage from './pages/topics/architecture/SystemDesignPage';

// DevOps imports
import GitPage from './pages/topics/devops/GitPage';
import CicdPage from './pages/topics/devops/CicdPage';
import ContainersPage from './pages/topics/devops/ContainersPage';
import PracticesPage from './pages/topics/devops/PracticesPage';
import CloudPage from './pages/topics/devops/CloudPage';

// Agile imports
import ScrumPage from './pages/topics/agile/ScrumPage';

import VocabularyPage from './pages/topics/german/VocabularyPage';

import KonjugationPage from "./pages/topics/german/KonjugationPage";

import CodeReviewsPage from "./pages/topics/bestPractices/CodeReviewsPage";
import QuestionBankPage from "./pages/topics/practice/QuestionBankPage";
import QaByLevelPage from "./pages/topics/practice/QaByLevelPage";
import DsaPatternsPage from "./pages/topics/practice/DsaPatternsPage";
import ScenariosPage from "./pages/topics/practice/ScenariosPage";
import BehavioralPage from "./pages/topics/practice/BehavioralPage";

import LearningPortal from './pages/LearningPortal';

import GermanCasesPage from "./pages/topics/german/GermanCasesPage";
import ArticlesPage from "./pages/topics/german/ArticlesPage";
import AdjectivesPage from "./pages/topics/german/AdjectivesPage";
import CasesPage from "./pages/topics/german/CasesPage";
import JavaFundamentalsPage from "./pages/topics/java/JavaFundamentalsPage";
import FunctionalProgrammingPage from "./pages/topics/java/FunctionalProgrammingPage";
import JvmInternalsPage from "./pages/topics/java/JvmInternalsPage";
import ModernJavaPage from "./pages/topics/java/ModernJavaPage";

const App = () => {
    return (
        <Router>
            <Layout>
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
            </Layout>
        </Router>
    );
};

export default App;
