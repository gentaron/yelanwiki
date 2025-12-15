import React from 'react';
import Layout from '../components/Layout';
import wikiData from '../data/wiki-data.json';
import { BarChart, BookOpen, Hash, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, sub, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl group hover:bg-slate-800/40 transition-all hover:border-yelan-accent/30 hover:shadow-2xl hover:shadow-yelan-primary/5"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-br from-yelan-primary/20 to-yelan-accent/10 rounded-xl text-yelan-glow group-hover:text-white transition-colors shadow-inner shadow-white/5">
                    {icon}
                </div>
                <span className="text-slate-400 font-medium tracking-wide text-sm uppercase">{label}</span>
            </div>
            <div className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
            {sub && <div className="text-sm text-slate-500 font-medium">{sub}</div>}
        </div>
    </motion.div>
);

const ActionCard = ({ title, desc, link, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <Link to={link} className="block group h-full">
            <div className="h-full bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group-hover:border-yelan-accent/40 group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-yelan-primary/10">
                <div className="absolute inset-0 bg-gradient-to-r from-yelan-primary/0 via-yelan-primary/5 to-yelan-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-yelan-glow transition-colors flex items-center gap-2">
                        {title}
                        <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-yelan-accent" />
                    </h2>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{desc}</p>
                </div>
            </div>
        </Link>
    </motion.div>
);

const Home = () => {
    const totalLines = wikiData.meta.totalLines;
    const termCount = wikiData.terms.length;
    const topTerm = [...wikiData.terms].sort((a, b) => b.count - a.count)[0];

    return (
        <Layout>
            <div className="min-h-full p-8 lg:p-12 max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -top-20 -left-20 w-64 h-64 bg-yelan-accent/20 rounded-full blur-[100px] pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-yelan-primary/20 border border-yelan-primary/30 text-yelan-glow text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={12} />
                                Project Yelan
                            </span>
                            <span className="text-slate-500 text-sm font-mono">v1.2.0</span>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                            Welcome to the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yelan-accent via-blue-400 to-purple-400 drop-shadow-2xl">
                                Yelan Archives
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            A next-generation knowledge base and interactive reader for the Yelan Chronicles.
                            Monitor entity appearances and explore the lore with intelligent context awareness.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<BookOpen size={24} />}
                        label="Total Lines"
                        value={totalLines.toLocaleString()}
                        sub="Full Text Analysis"
                        delay={0.1}
                    />
                    <StatCard
                        icon={<Hash size={24} />}
                        label="Tracked Entities"
                        value={termCount}
                        sub="Characters & Terms"
                        delay={0.2}
                    />
                    <StatCard
                        icon={<BarChart size={24} />}
                        label="Top Entity"
                        value={topTerm?.name}
                        sub={`${topTerm?.count} mentions detected`}
                        delay={0.3}
                    />
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ActionCard
                        title="Enter Reader Mode"
                        desc="Immerse yourself in the story with our Smart Text Reader. Click on highlighted names to instantly access character profiles without losing your place."
                        link="/reader"
                        delay={0.4}
                    />
                    <ActionCard
                        title="Character Database"
                        desc="Access detailed dossiers on all key figures. View comprehensive appearance statistics, context snippets, and relationship maps."
                        link="/characters"
                        delay={0.5}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Home;
