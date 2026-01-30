"use client";

import React, { useState } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Search, Filter, Loader2, ExternalLink, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/app/config/api";

export default function ShopeeSearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);

        try {
            // Real API call
            const res = await fetch(`${API_URL}/marketplace/search?platform=SHOPEE&q=${encodeURIComponent(searchTerm)}`);

            if (!res.ok) throw new Error("Erro na busca");
            const data = await res.json();

            setResults(data);
        } catch (error) {
            toast.error("Erro ao buscar produtos.");
        } finally {
            setLoading(false);
        }
    };
    toast.error("Erro ao buscar produtos.");
} finally {
    setLoading(false);
}
    };

return (
    <DashboardShell>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pesquisa Shopee</h1>
                    <p className="text-gray-500 text-sm">Busque produtos diretamente na Shopee e gere seus links de afiliado.</p>
                </div>
            </div>

            <div className="bg-white border border-[#EEEEEE] rounded-2xl p-4 shadow-sm flex gap-3">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Buscar produtos na Shopee (ex: Fone Bluetooth)"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Buscar"}
                </button>
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <div key={product.id} className="bg-white border border-[#EEEEEE] rounded-2xl overflow-hidden group hover:shadow-lg transition-all">
                            <div className="aspect-square bg-gray-100 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="p-2 bg-white rounded-full text-orange-600 hover:bg-orange-50 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight h-10">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-extrabold text-orange-600">R$ {product.price}</span>
                                </div>
                                <button className="w-full py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-4 h-4" /> Importar & Gerar Link
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">Faça uma busca para ver os resultados da Shopee.</p>
                </div>
            )}
        </div>
    </DashboardShell>
);
}
