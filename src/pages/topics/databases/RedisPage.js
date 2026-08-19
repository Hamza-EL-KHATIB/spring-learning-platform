import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/databases/redis.json';

const RedisPage = () => <TopicPageTemplate data={data} persistKey="databases-redis" />;

export default RedisPage;
