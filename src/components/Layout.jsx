import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Users, Home, List } from 'lucide-react';

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: 'メインページ', path: '/', icon: <Home size={18} /> },
        { name: '本文を読む', path: '/reader', icon: <Book size={18} /> },
        { name: '登場人物', path: '/characters', icon: <Users size={18} /> },
        { name: '用語集', path: '/terms', icon: <List size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Wikipedia-style Header */}
            <header className="bg-white border-b border-wiki-borderLight">
                <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-wiki-text">
                            夜蘭アーカイブ
                        </h1>
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-[1600px] mx-auto flex">
                {/* Sidebar Navigation */}
                {isSidebarOpen && (
                    <aside className="w-64 bg-wiki-sidebar border-r border-wiki-borderLight p-4 min-h-screen">
                        <nav className="space-y-1">
                            <div className="text-xs font-bold text-wiki-textLight uppercase tracking-wider mb-2 px-2">
                                ナビゲーション
                            </div>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${isActive
                                                ? 'bg-blue-50 text-wiki-link font-medium'
                                                : 'text-wiki-text hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-8 pt-4 border-t border-wiki-borderLight">
                            <div className="text-xs font-bold text-wiki-textLight uppercase tracking-wider mb-2 px-2">
                                ツール
                            </div>
                            <div className="text-xs text-wiki-textLight px-3 py-2">
                                <div className="mb-1">総行数: 7,069行</div>
                                <div>追跡エンティティ: 7個</div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 bg-white min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
