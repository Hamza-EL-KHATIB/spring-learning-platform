import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/functional-programming.json';

const FunctionalProgrammingPage = () => (
    <TopicPageTemplate data={data} persistKey="java-functional-programming" />
);

export default FunctionalProgrammingPage;
