import React from 'react';
import Layout from '../components/Layout';
import { useParams, Link } from 'react-router-dom';
import wikiData from '../data/wiki-data.json';
import { ArrowLeft, MessageSquare, info } from 'lucide-react';
import { motion } from 'framer-motion';

const WikiDetail = () => {
    const { name } = useParams();
    const term = wikiData.terms.find(t => t.name === name);

    if (!term) return (
        <Layout>
            <div className="flex h-full items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl text-red-400 font-bold">404: File Not Found</h1>
                    <Link to="/" className="text-slate-400 hover:text-white underline">Return to Dashboard</Link>
                </div>
            </div>
        </Layout>
    );

    const snippets = term.mentions.slice(0, 15).map(lineNum => {
        const lineIndex = lineNum - 1;
        const line = wikiData.content[lineIndex];
        const parts = line.split(term.name);
        return { lineNum, parts };
    });

    return (
        <Layout>
            <div className="relative min-h-full">
                {/* Header Background */}
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-900 to-transparent z-0 pointer-events-none" />

                <div className="p-8 lg:p-12 max-w-6xl mx-auto relative z-10 w-full">
                    <Link to={term.type === 'Character' ? '/characters' : '/terms'} className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to {term.type === 'Character' ? 'Database' : 'Index'}
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Info */}
                        <div className="lg:col-span-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <span className="inline-block px-3 py-1 mb-4 rounded-full bg-yelan-primary/20 border border-yelan-primary/30 text-yelan-glow text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                    {term.type} / CLASS-S
                                </span>
                                <h1 className="text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">{term.name}</h1>

                                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12 shadow-2xl">
                                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                                        {term.description}
                                    </p>
                                </div>

                                <div className="mb-8 flex items-center gap-4">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <MessageSquare className="text-yelan-accent" />
                                        Key Mentions
                                    </h2>
                                    <div className="h-px flex-1 bg-white/10"></div>
                                </div>

                                <div className="space-y-4">
                                    {snippets.map((snippet, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group bg-slate-900/30 hover:bg-slate-800/50 border border-white/5 hover:border-yelan-primary/30 p-5 rounded-xl transition-all duration-200"
                                        >
                                            <div className="flex items-start gap-4">
                                                <span className="text-xs text-slate-500 font-mono pt-1 min-w-[3rem]">L-{snippet.lineNum}</span>
                                                <p className="text-slate-300 leading-relaxed">
                                                    {snippet.parts.map((part, i) => (
                                                        <React.Fragment key={i}>
                                                            {part}
                                                            {i < snippet.parts.length - 1 && (
                                                                <span className="bg-yelan-primary/20 text-yelan-glow px-1 rounded font-medium border border-yelan-primary/20">
                                                                    {term.name}
                                                                </span>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {term.mentions.length > 15 && (
                                        <div className="text-center py-8">
                                            <span className="text-slate-500 italic">...total {term.mentions.length} mentions found in archive.</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="sticky top-8 space-y-6"
                            >
                                <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Analysis Data</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Occurrence Count</div>
                                            <div className="text-3xl font-bold text-white font-mono">{term.count}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">First Detected</div>
                                            <div className="text-lg text-slate-300 font-mono">Line {term.mentions[0]}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Relevance Score</div>
                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                                                <div
                                                    className="bg-gradient-to-r from-yelan-primary to-yelan-accent h-full rounded-full"
                                                    style={{ width: `${Math.min(100, Math.max(5, (term.count / 400) * 100))}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WikiDetail;
