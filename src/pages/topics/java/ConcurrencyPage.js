import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/concurrency.json';

const ConcurrencyPage = () => <TopicPageTemplate data={data} persistKey="java-concurrency" />;

export default ConcurrencyPage;
