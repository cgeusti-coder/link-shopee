"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { CheckCircle, Clock } from "lucide-react";

export default function AssinaturaPage() {
    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-coral to-orange-600 bg-clip-text text-transparent">
                        Minha Assinatura
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Gerencie seu plano e visualize seu histórico de pagamentos
                    </p>
                </div>

                {/* Status Card */}
                <div className="bg-white rounded-2xl border border-[#EEEEEE] p-8 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Ativo
                                </span>
                                <span className="text-sm text-gray-500">Plano Pro</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                R$ 97,00<span className="text-xs text-gray-400 font-medium ml-1">/mês</span>
                            </h2>
                            <p className="text-sm text-gray-500">
                                Próxima cobrança em <b>15 de Outubro, 2026</b>
                            </p>
                        </div>
                        <div className="p-3 bg-coral/10 rounded-xl text-coral">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors">
                            Gerenciar Plano
                        </button>
                        <button className="px-6 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
                            Cancelar Assinatura
                        </button>
                    </div>
                </div>

                {/* History */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        Histórico de Pagamentos
                    </h3>

                    <div className="bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-[#EEEEEE]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Data</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Valor</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Fatura</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EEEEEE]">
                                {[1, 2, 3].map((_, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-600">15 Set, 2026</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">R$ 97,00</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                                Pago
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-coral hover:underline font-medium">Download PDF</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
