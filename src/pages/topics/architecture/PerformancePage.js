import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/architecture/performance.json';

const PerformancePage = () => (
    <TopicPageTemplate data={data} persistKey="architecture-performance" />
);

export default PerformancePage;
