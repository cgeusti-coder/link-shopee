"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Users } from "lucide-react";

export default function CanaisGruposPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-500" />
                        Canais e Grupos
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Gerencie os canais de destino para suas promoções
                    </p>
                </div>

                <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Nenhum canal cadastrado ainda.</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                        Novo Canal
                    </button>
                </div>
            </div>
        </DashboardShell>
    );
}
