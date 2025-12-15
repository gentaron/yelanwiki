import React from 'react';
import Layout from '../components/Layout';
import SmartText from '../components/SmartText';
import wikiData from '../data/wiki-data.json';
import { motion } from 'framer-motion';

const StoryReader = () => {
    // Add serif font for story text
    // We already added Merriweather in tailwind config, might need to load it in index.css or just fallback
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-16 px-6 lg:px-12">
                <header className="mb-20 text-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                    <span className="relative bg-[#050914] px-6 text-slate-500 font-mono text-sm uppercase tracking-widest">
                        Classified Document
                    </span>
                    <h1 className="mt-8 text-5xl lg:text-6xl font-serif text-white/90 drop-shadow-lg">The Yelan Chronicles</h1>
                </header>

                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="prose prose-invert prose-lg max-w-none prose-p:font-serif prose-p:leading-loose prose-p:text-slate-300 prose-headings:font-sans prose-a:no-underline"
                >
                    <div className="p-8 lg:p-12 bg-slate-900/20 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
                        <SmartText text={wikiData.content} />
                    </div>
                </motion.article>

                <div className="mt-24 pt-12 border-t border-white/5 text-center">
                    <div className="inline-flex items-center gap-2 text-slate-600 font-mono text-sm">
                        <span>END OF FILE</span>
                        <div className="w-2 h-2 bg-yelan-primary rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StoryReader;
