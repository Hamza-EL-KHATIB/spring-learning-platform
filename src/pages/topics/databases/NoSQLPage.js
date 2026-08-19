import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/databases/nosql.json';

const NoSQLPage = () => <TopicPageTemplate data={data} persistKey="databases-nosql" />;

export default NoSQLPage;
