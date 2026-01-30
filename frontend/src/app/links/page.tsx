"use client";

import React, { useState } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Link as LinkIcon, ExternalLink, Copy, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LinksPage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedLinks, setGeneratedLinks] = useState<any[]>([]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newLink = {
                id: Date.now(),
                original: url,
                short: `https://shp.ee/${Math.random().toString(36).substring(7)}`,
                clicks: 0,
                date: new Date().toLocaleDateString('pt-BR'),
                title: "Produto Shopee Exemplo"
            };

            setGeneratedLinks([newLink, ...generatedLinks]);
            setUrl("");
            toast.success("Link gerado com sucesso!");
        } catch (error) {
            toast.error("Erro ao gerar link.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copiado para a área de transferência!");
    };

    return (
        <DashboardShell>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                        <LinkIcon className="w-6 h-6 text-blue-500" />
                        Gerador de Links
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Transforme links normais em links de afiliado rastreáveis
                    </p>
                </div>

                {/* Generator Input */}
                <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE] shadow-sm">
                    <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Cole aqui o link do produto (Shopee, Amazon, Magalu, Shein...)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gerar Link"}
                        </button>
                    </form>
                </div>

                {/* Recent Links */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Links Recentes</h3>

                    {generatedLinks.length === 0 ? (
                        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">Nenhum link gerado ainda.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-[#EEEEEE]">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Produto</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Link Original</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Link Afiliado</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-center">Cliques</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EEEEEE]">
                                    {generatedLinks.map((link) => (
                                        <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{link.title}</td>
                                            <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate" title={link.original}>
                                                {link.original}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-mono text-xs">
                                                    {link.short}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500">{link.clicks}</td>
                                            <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => copyToClipboard(link.short)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Copiar"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={link.short}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Abrir"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardShell>
    );
}
