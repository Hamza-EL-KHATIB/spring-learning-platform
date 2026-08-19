import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/modern-java.json';

const ModernJavaPage = () => (
    <TopicPageTemplate data={data} persistKey="java-modern" />
);

export default ModernJavaPage;
