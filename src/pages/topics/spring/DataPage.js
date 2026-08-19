import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/spring/spring-data.json';

const DataPage = () => <TopicPageTemplate data={data} persistKey="spring-data" />;

export default DataPage;
