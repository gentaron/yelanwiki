import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import wikiData from '../data/wiki-data.json';

const WikiList = ({ type }) => {
    const items = wikiData.terms.filter(t => t.type === type);
    const sortedItems = [...items].sort((a, b) => b.count - a.count);
    const title = type === 'Character' ? '登場人物一覧' : '用語集';

    return (
        <Layout>
            <div className="p-8 max-w-5xl">
                <h1 className="text-3xl font-bold border-b-2 border-wiki-border pb-2 mb-6 text-wiki-text">
                    {title}
                </h1>

                <p className="text-wiki-textLight mb-6">
                    {type === 'Character'
                        ? '物語に登場するすべての人物のリストです。'
                        : '物語に登場する用語、組織、概念のリストです。'}
                </p>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-wiki-bgAlt border-b-2 border-wiki-border">
                            <th className="text-left p-3 font-bold text-wiki-text">名称</th>
                            <th className="text-left p-3 font-bold text-wiki-text">説明</th>
                            <th className="text-right p-3 font-bold text-wiki-text w-32">出現回数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.map((item, index) => (
                            <tr
                                key={item.name}
                                className={`border-b border-wiki-borderLight hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : ''}`}
                            >
                                <td className="p-3">
                                    <Link
                                        to={type === 'Character' ? `/characters/${item.name}` : `/terms/${item.name}`}
                                        className="text-wiki-link hover:underline font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                </td>
                                <td className="p-3 text-sm text-wiki-textLight">
                                    {item.description}
                                </td>
                                <td className="p-3 text-right text-sm text-wiki-textLight font-mono">
                                    {item.count}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default WikiList;
