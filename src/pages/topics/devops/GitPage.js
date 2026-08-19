import React from 'react';
import TopicPageTemplate from '../../../components/template/TopicPageTemplate';
import data from '../../../data/devops/git.json';

const GitPage = () => <TopicPageTemplate data={data} persistKey="devops-git" language="bash" />;

export default GitPage;
