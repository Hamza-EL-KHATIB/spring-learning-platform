import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/databases/transactions.json';

const TransactionsPage = () => <TopicPageTemplate data={data} persistKey="databases-transactions" />;

export default TransactionsPage;
