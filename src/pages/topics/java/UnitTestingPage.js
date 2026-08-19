import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/java/unit-testing.json';

const UnitTestingPage = () => <TopicPageTemplate data={data} persistKey="java-testing" />;

export default UnitTestingPage;
