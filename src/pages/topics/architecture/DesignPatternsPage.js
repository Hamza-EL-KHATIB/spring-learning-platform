import React from 'react';
import TopicPageTemplate, { SectionPanel } from '../../../components/template/TopicPageTemplate';
import renderContent from '../../../components/template/ContentRenderer';
import data from '../../../data/architecture/design-patterns.json';

// UML diagrams referenced by filename in the JSON
import singletonImg from '../../../data/images/Singleton.png';
import factoryMethodImg from '../../../data/images/Factory Method.png';
import abstractFactoryImg from '../../../data/images/Abstract Factory.png';
import builderImg from '../../../data/images/Builder.png';
import prototypeImg from '../../../data/images/Prototype.png';
import adapterImg from '../../../data/images/Adapter.png';
import bridgeImg from '../../../data/images/Bridge.png';
import compositeImg from '../../../data/images/Composite.png';
import decoratorImg from '../../../data/images/Decorator.png';
import facadeImg from '../../../data/images/Facade.png';
import flyweightImg from '../../../data/images/Flyweight.png';
import proxyImg from '../../../data/images/Proxy.png';
import observerImg from '../../../data/images/Observer.png';
import stateImg from '../../../data/images/State.png';
import strategyImg from '../../../data/images/Strategy.png';
import templateMethodImg from '../../../data/images/Template Method.png';
import visitorImg from '../../../data/images/Visitor.png';

const images = {
    'Singleton.png': singletonImg,
    'Factory Method.png': factoryMethodImg,
    'Abstract Factory.png': abstractFactoryImg,
    'Builder.png': builderImg,
    'Prototype.png': prototypeImg,
    'Adapter.png': adapterImg,
    'Bridge.png': bridgeImg,
    'Composite.png': compositeImg,
    'Decorator.png': decoratorImg,
    'Facade.png': facadeImg,
    'Flyweight.png': flyweightImg,
    'Proxy.png': proxyImg,
    'Observer.png': observerImg,
    'State.png': stateImg,
    'Strategy.png': strategyImg,
    'Template Method.png': templateMethodImg,
    'Visitor.png': visitorImg,
};

// design-patterns.json groups patterns under categories[]; one tab per category.
const pageData = {
    title: data.title,
    topics: (data.categories || []).map((category) => ({
        id: category.name,
        title: category.name,
        description: category.description,
        patterns: category.patterns,
    })),
};

const footerSections = [
    ['Best Practices', data.best_practices],
    ['Pattern Relationships', data.relationships],
].filter(([, value]) => value);

const DesignPatternsPage = () => (
    <TopicPageTemplate
        data={pageData}
        persistKey="architecture-design-patterns"
        images={images}
        header={data.description && <p className="text-gray-400 mt-2 text-sm">{data.description}</p>}
        footer={footerSections.map(([title, value]) => (
            <SectionPanel key={title} title={title}>
                {renderContent(value)}
            </SectionPanel>
        ))}
    />
);

export default DesignPatternsPage;
