import React from 'react';
import Layout from '../components/Layout';
import SmartText from '../components/SmartText';
import wikiData from '../data/wiki-data.json';

const StoryReader = () => {
    return (
        <Layout>
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold font-serif border-b-2 border-wiki-border pb-3 mb-8 text-wiki-text">
                    夜蘭クロニクル
                </h1>

                <div className="prose prose-lg max-w-none">
                    <div className="text-wiki-text font-serif leading-loose">
                        <SmartText text={wikiData.content} />
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-wiki-borderLight text-center text-wiki-textLight text-sm">
                    文書の終わり
                </div>
            </div>
        </Layout>
    );
};

export default StoryReader;
