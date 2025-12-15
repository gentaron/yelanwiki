import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import wikiData from '../data/wiki-data.json';
import { Users, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const WikiList = ({ type }) => {
    const items = wikiData.terms.filter(t => t.type === type);
    const sortedItems = [...items].sort((a, b) => b.count - a.count);

    return (
        <Layout>
            <div className="p-8 lg:p-12 max-w-7xl mx-auto min-h-full">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-5 mb-6"
                    >
                        <div className="p-4 bg-gradient-to-br from-yelan-primary to-blue-600 rounded-2xl shadow-lg shadow-blue-900/50 text-white">
                            {type === 'Character' ? <Users size={32} /> : <FileText size={32} />}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{type === 'Character' ? 'Identify Personnel' : 'Classified Terminology'}</h1>
                            <p className="text-slate-400 text-lg">
                                {type === 'Character' ? 'Dossiers on all known individuals.' : 'Database of organizations, artifacts, and phenomena.'}
                            </p>
                        </div>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={type === 'Character' ? `/characters/${item.name}` : `/terms/${item.name}`} className="block h-full group">
                                <div className="h-full bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-slate-800/60 hover:border-yelan-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yelan-primary/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Activity size={16} className="text-yelan-accent" />
                                    </div>

                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-xl font-bold text-white group-hover:text-yelan-glow transition-colors truncate pr-4">{item.name}</h2>
                                    </div>

                                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">{item.description}</p>

                                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                        <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Mentions</span>
                                        <span className="text-sm font-bold text-white bg-slate-800 px-2 py-1 rounded-md min-w-[3rem] text-center group-hover:bg-yelan-primary/20 group-hover:text-yelan-glow transition-colors">
                                            {item.count}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WikiList;
