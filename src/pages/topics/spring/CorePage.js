import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/core-concepts.json';

const CorePage = () => <TopicPageTemplate data={data} persistKey="spring-core" />;

export default CorePage;
