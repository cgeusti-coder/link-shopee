"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

export default function ShopeeSearchPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pesquisa Shopee</h1>
                    <p className="text-gray-500 text-sm">Busque produtos diretamente na Shopee e importe.</p>
                </div>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow-sm flex gap-3">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Buscar produtos na Shopee (ex: Fone Bluetooth)"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filtros
                </button>
                <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors">
                    Buscar
                </button>
            </div>

            <div className="text-center py-12 text-gray-400">
                <p>Faça uma busca para ver os resultados.</p>
            </div>
        </div>
    );
}
