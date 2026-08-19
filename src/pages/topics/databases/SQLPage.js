import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/databases/sql.json';

const SQLPage = () => <TopicPageTemplate data={data} persistKey="databases-sql" language="sql" />;

export default SQLPage;
