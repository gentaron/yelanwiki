import React from 'react';
import Layout from '../components/Layout';
import wikiData from '../data/wiki-data.json';
import { Book, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const totalLines = wikiData.meta.totalLines;
    const termCount = wikiData.terms.length;
    const topTerm = [...wikiData.terms].sort((a, b) => b.count - a.count)[0];

    return (
        <Layout>
            <div className="p-8 max-w-5xl">
                <h1 className="text-3xl font-bold border-b-2 border-wiki-border pb-2 mb-6 text-wiki-text">
                    メインページ
                </h1>

                <div className="mb-8 p-6 bg-wiki-bgAlt border border-wiki-borderLight rounded">
                    <h2 className="text-xl font-bold mb-4 text-wiki-text">夜蘭アーカイブへようこそ</h2>
                    <p className="text-wiki-text leading-relaxed mb-4">
                        このサイトは「夜蘭」の物語に関する包括的なデータベースです。登場人物や用語の詳細な情報を提供し、
                        本文中で自動的にリンクされる機能を備えています。
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <div className="p-4 bg-white border border-wiki-borderLight rounded">
                            <div className="text-2xl font-bold text-wiki-link">{totalLines.toLocaleString()}</div>
                            <div className="text-sm text-wiki-textLight">総行数</div>
                        </div>
                        <div className="p-4 bg-white border border-wiki-borderLight rounded">
                            <div className="text-2xl font-bold text-wiki-link">{termCount}</div>
                            <div className="text-sm text-wiki-textLight">追跡エンティティ</div>
                        </div>
                        <div className="p-4 bg-white border border-wiki-borderLight rounded">
                            <div className="text-lg font-bold text-wiki-link">{topTerm?.name}</div>
                            <div className="text-sm text-wiki-textLight">{topTerm?.count}回出現</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-wiki-borderLight rounded p-6 bg-white hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-wiki-text">
                            <Book size={20} className="text-wiki-link" />
                            本文を読む
                        </h3>
                        <p className="text-wiki-textLight text-sm mb-4 leading-relaxed">
                            物語の本文を読むことができます。文中の人物名や用語は自動的にリンクされており、
                            クリックすることで詳細情報を確認できます。
                        </p>
                        <Link to="/reader" className="text-wiki-link hover:underline text-sm font-medium">
                            本文ページへ →
                        </Link>
                    </div>

                    <div className="border border-wiki-borderLight rounded p-6 bg-white hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-wiki-text">
                            <Users size={20} className="text-wiki-link" />
                            登場人物一覧
                        </h3>
                        <p className="text-wiki-textLight text-sm mb-4 leading-relaxed">
                            物語に登場するすべての人物の詳細なプロフィールを閲覧できます。
                            各人物の出現回数や関連する場面も確認できます。
                        </p>
                        <Link to="/characters" className="text-wiki-link hover:underline text-sm font-medium">
                            登場人物ページへ →
                        </Link>
                    </div>
                </div>

                <div className="border border-wiki-borderLight rounded p-6 bg-wiki-bgAlt">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-wiki-text">
                        <FileText size={20} className="text-wiki-link" />
                        用語集
                    </h3>
                    <p className="text-wiki-textLight text-sm mb-4 leading-relaxed">
                        物語に登場する組織、魔法体系、アイテムなどの用語の詳細な説明を提供しています。
                    </p>
                    <Link to="/terms" className="text-wiki-link hover:underline text-sm font-medium">
                        用語集ページへ →
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
