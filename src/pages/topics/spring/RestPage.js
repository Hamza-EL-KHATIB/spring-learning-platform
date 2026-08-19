import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/rest-apis.json';

const RestPage = () => <TopicPageTemplate data={data} persistKey="spring-rest" />;

export default RestPage;
