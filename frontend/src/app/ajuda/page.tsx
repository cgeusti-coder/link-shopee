"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { HelpCircle } from "lucide-react";

export default function AjudaPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-gray-400" />
                        Central de Ajuda
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Tire suas dúvidas ou entre em contato com o suporte
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE]">
                    <h3 className="font-bold text-lg mb-4">Perguntas Frequentes</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <details key={i} className="group">
                                <summary className="list-none flex justify-between items-center font-medium cursor-pointer text-gray-700">
                                    Como conectar minha conta Shopee?
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
                                    Vá até a aba Integrações, clique em Shopee e siga os passos de autenticação.
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
