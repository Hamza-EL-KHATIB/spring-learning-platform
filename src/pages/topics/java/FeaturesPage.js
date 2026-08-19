import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/java-8-plus-features.json';

const FeaturesPage = () => <TopicPageTemplate data={data} persistKey="java-features" />;

export default FeaturesPage;
