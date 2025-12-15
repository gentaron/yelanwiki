import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Users, Home, FileText, Search, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <Home size={22} /> },
        { name: 'Story Reader', path: '/reader', icon: <Book size={22} /> },
        { name: 'Characters', path: '/characters', icon: <Users size={22} /> },
        { name: 'Terminology', path: '/terms', icon: <FileText size={22} /> },
    ];

    return (
        <div className="flex h-screen bg-[#050914] text-gray-100 overflow-hidden font-sans selection:bg-yelan-primary/30 selection:text-yelan-glow">

            {/* Dynamic Background Accents */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yelan-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Glass Sidebar */}
            <motion.aside
                initial={{ width: 260 }}
                animate={{ width: isSidebarOpen ? 260 : 88 }}
                className="relative z-50 flex flex-col h-full border-r border-white/5 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 shadow-2xl"
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yelan-accent to-yelan-primary flex items-center justify-center shadow-lg shadow-yelan-primary/20">
                                <span className="font-bold text-white">Y</span>
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Archive</h1>
                        </motion.div>
                    ) : (
                        <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-yelan-accent to-yelan-primary flex items-center justify-center">
                            <span className="font-bold text-white">Y</span>
                        </div>
                    )}

                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors absolute right-4 top-6"
                        style={{ right: isSidebarOpen ? '16px' : 'auto', left: isSidebarOpen ? 'auto' : '50%', transform: isSidebarOpen ? 'none' : 'translateX(-50%)', top: isSidebarOpen ? '24px' : '80px' }}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative group flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 overflow-hidden ${isActive
                                        ? 'bg-yelan-primary/20 text-white shadow-lg shadow-yelan-primary/10 border border-yelan-primary/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-yelan-primary/20 to-transparent opacity-50" />
                                )}
                                <div className="relative z-10 flex items-center gap-4">
                                    <span className={`${isActive ? 'text-yelan-glow' : 'group-hover:text-white transition-colors'}`}>
                                        {item.icon}
                                    </span>
                                    {isSidebarOpen && (
                                        <span className="font-medium tracking-wide">{item.name}</span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className={`w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors ${!isSidebarOpen && 'justify-center'}`}>
                        <Settings size={20} />
                        {isSidebarOpen && <span>Settings</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
                {children}
            </main>
        </div>
    );
};

export default Layout;
