import React from 'react';
import Layout from '../components/Layout';
import { useParams, Link } from 'react-router-dom';
import wikiData from '../data/wiki-data.json';
import { ArrowLeft } from 'lucide-react';

const WikiDetail = () => {
    const { name } = useParams();
    const term = wikiData.terms.find(t => t.name === name);

    if (!term) {
        return (
            <Layout>
                <div className="p-8">
                    <h1 className="text-2xl text-red-600">ページが見つかりません</h1>
                    <Link to="/" className="text-wiki-link hover:underline mt-4 block">メインページに戻る</Link>
                </div>
            </Layout>
        );
    }

    const snippets = term.mentions.slice(0, 15).map(lineNum => {
        const lineIndex = lineNum - 1;
        const line = wikiData.content[lineIndex];
        const parts = line.split(term.name);
        return { lineNum, parts };
    });

    return (
        <Layout>
            <div className="p-8 max-w-5xl">
                <Link
                    to={term.type === 'Character' ? '/characters' : '/terms'}
                    className="inline-flex items-center text-wiki-link hover:underline mb-4 text-sm"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    {term.type === 'Character' ? '登場人物一覧' : '用語集'}に戻る
                </Link>

                <h1 className="text-4xl font-bold border-b-2 border-wiki-border pb-3 mb-6 text-wiki-text">
                    {term.name}
                </h1>

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-8 p-6 bg-wiki-bgAlt border border-wiki-borderLight rounded">
                            <p className="text-wiki-text leading-relaxed">
                                {term.description}
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold border-b border-wiki-border pb-2 mb-4 text-wiki-text">
                            本文中の出現
                        </h2>

                        <div className="space-y-4">
                            {snippets.map((snippet, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gray-50 border-l-4 border-wiki-link rounded-r"
                                >
                                    <div className="text-xs text-wiki-textLight mb-2 font-mono">
                                        {snippet.lineNum}行目
                                    </div>
                                    <p className="text-wiki-text leading-relaxed">
                                        {snippet.parts.map((part, i) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < snippet.parts.length - 1 && (
                                                    <span className="bg-yellow-200 font-medium px-0.5">
                                                        {term.name}
                                                    </span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            ))}
                            {term.mentions.length > 15 && (
                                <p className="text-center text-wiki-textLight italic text-sm py-4">
                                    ... 他 {term.mentions.length - 15} 件の出現があります
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-wiki-bgAlt border border-wiki-borderLight rounded p-4 sticky top-4">
                            <h3 className="font-bold text-sm mb-3 pb-2 border-b border-wiki-borderLight text-wiki-text">
                                統計情報
                            </h3>
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="text-wiki-textLight mb-1">出現回数</dt>
                                    <dd className="font-bold text-2xl text-wiki-text">{term.count}</dd>
                                </div>
                                <div>
                                    <dt className="text-wiki-textLight mb-1">初出</dt>
                                    <dd className="font-mono text-wiki-text">{term.mentions[0]}行目</dd>
                                </div>
                                <div>
                                    <dt className="text-wiki-textLight mb-1">カテゴリ</dt>
                                    <dd className="text-wiki-text">{term.type === 'Character' ? '登場人物' : '用語'}</dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </div>
        </Layout>
    );
};

export default WikiDetail;
