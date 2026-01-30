"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Settings } from "lucide-react";

export default function ConfigAfiliadosPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-coral to-orange-600 bg-clip-text text-transparent">
                        Configuração de Afiliados
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Gerencie suas tags e IDs de acompanhamento
                    </p>
                </div>

                <div className="grid gap-4">
                    <div className="p-8 bg-white border border-[#EEEEEE] rounded-2xl flex flex-col items-center justify-center text-center">
                        <Settings className="w-10 h-10 text-gray-300 mb-4" />
                        <h3 className="text-gray-900 font-medium">Nenhuma configuração encontrada</h3>
                        <p className="text-gray-500 text-sm mt-1">Adicione suas tags de afiliado Shopee e Amazon aqui.</p>
                        <button className="mt-4 px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                            Adicionar Tag
                        </button>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
