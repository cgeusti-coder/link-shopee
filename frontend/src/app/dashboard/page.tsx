"use client"

import React, { useState, useEffect } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import {
    Users,
    MousePointer2,
    TrendingUp,
    MoreVertical,
    CheckCircle2,
    Clock
} from "lucide-react";

const stats = [
    { label: "Cliques Totais", value: "12,482", diff: "+12%", icon: MousePointer2, color: "text-coral" },
    { label: "Vendas Confirmadas", value: "148", diff: "+5%", icon: CheckCircle2, color: "text-green-500" },
    { label: "Comissão Estimada", value: "R$ 2.450,00", diff: "+18%", icon: TrendingUp, color: "text-blue-500" },
    { label: "Automações Ativas", value: "12", diff: "Stable", icon: Users, color: "text-purple-500" },
];

const activity = [
    { group: "Achei na Shopee", account: "WhatsApp (Principal)", status: "Enviado", time: "Há 2 min" },
    { group: "Ofertas Relâmpago", account: "Telegram Bot", status: "Agendado", time: "14:30" },
    { group: "Cozinha Prática", account: "Instagram Auto", status: "Falhou", time: "Há 1 hora", error: true },
];

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <DashboardShell>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 font-inter">
                            Olá, {user?.firstName || "Marcelo"}! 👋
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Visão geral do desempenho das suas automações hoje.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-coral/5 transition-colors duration-200`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                {stat.diff && (
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${stat.diff.includes('+') ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-50'
                                        }`}>
                                        {stat.diff}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl lg:text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden font-inter">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900">Atividades Recentes</h3>
                        <button className="text-coral text-xs font-bold hover:text-coral-hover transition-colors uppercase tracking-wide">
                            Ver histórico completo
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-50">
                                    <th className="px-6 py-4 font-bold">Grupo / Canal</th>
                                    <th className="px-6 py-4 font-bold">Conta de Envio</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold">Horário</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {activity.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900">{item.group}</span>
                                                <span className="text-[10px] text-gray-400 lg:hidden">Canal de Divulgação</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-gray-600 font-medium">{item.account}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${item.error ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                                                <span className={`text-xs font-bold ${item.error ? "text-red-500" : "text-green-600"}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                                                <Clock className="w-3.5 h-3.5 text-gray-300" /> {item.time}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-gray-300 hover:text-coral transition-colors p-2 rounded-lg hover:bg-coral/5 opacity-0 group-hover:opacity-100">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
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
