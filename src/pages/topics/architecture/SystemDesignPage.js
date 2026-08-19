import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/architecture/system-design.json';

const SystemDesignPage = () => (
    <TopicPageTemplate data={data} persistKey="architecture-system-design" />
);

export default SystemDesignPage;
