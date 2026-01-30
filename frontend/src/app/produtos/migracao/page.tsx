"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { ArrowRightLeft } from "lucide-react";

export default function MigrationPage() {
    return (
        <DashboardShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center text-coral mb-6">
                    <ArrowRightLeft className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Migração de Produtos</h1>
                <p className="text-gray-500">
                    Ferramenta para migrar links e produtos entre grupos e canais automaticamente.
                </p>
                <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-100">
                    🚧 Módulo em desenvolvimento
                </div>
            </div>
        </DashboardShell>
    );
}
