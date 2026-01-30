"use client"

import React, { useState } from "react";
import {
    LayoutDashboard,
    Settings,
    MessageCircle,
    Package,
    Users,
    BookOpen,
    HelpCircle,
    Hash,
    Send,
    Menu,
    X,
    Search,
    Bell,
    ShoppingBag,
    Box,
    Link as LinkIcon
} from "lucide-react";

import { LucideIcon } from "lucide-react";

type MenuItem =
    | { icon: LucideIcon; label: string; href: string; active?: boolean; tag?: string; isHeader?: false }
    | { label: string; isHeader: true; icon?: undefined; href?: undefined; active?: undefined; tag?: undefined };

const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { label: "GESTÃO", isHeader: true },
    { icon: Box, label: "Integrações", href: "/integracoes/afiliados" },
    { icon: Search, label: "Pesquisa Shopee", href: "/shopee/pesquisa", tag: "NOVO" },
    { label: "CONFIGURAÇÕES", isHeader: true },
    { icon: Settings, label: "Config. Afiliados", href: "/config/afiliados" },
    { icon: Send, label: "Config. Telegram", href: "/config/telegram" },
    { icon: MessageCircle, label: "Config. WhatsApp", href: "/config/whatsapp" },
    { icon: Users, label: "Canais/Grupos", href: "/canais-grupos" },
    { icon: Package, label: "Migração de Produtos", href: "/produtos/migracao" },
    { icon: Settings, label: "Meus Dados", href: "/config/meus_dados" },
    { icon: ShoppingBag, label: "Assinatura", href: "/config/assinatura" },
    { icon: HelpCircle, label: "Ajuda", href: "/ajuda" },
];

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-[#EEEEEE] z-50 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center text-white font-bold">M</div>
                        <h1 className="text-xl font-bold tracking-tight">MultiLink</h1>
                    </div>
                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                    {menuItems.map((item, idx) => (
                        <div key={idx}>
                            {item.isHeader ? (
                                <p className="px-6 py-4 text-[10px] font-bold text-[#BBBBBB] tracking-widest uppercase">
                                    {item.label}
                                </p>
                            ) : (
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all hover:bg-[#FDFDFD] ${item.active ? "bg-coral/10 text-coral border-r-4 border-coral" : "text-[#555555] hover:text-black"
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${item.active ? "text-coral" : "text-[#888888]"}`} />
                                    <span className="flex-1 text-[13px]">{item.label}</span>
                                    {item.tag && (
                                        <span className="bg-yellow-400 text-[8px] font-bold px-1.5 py-0.5 rounded text-black leading-none uppercase">
                                            {item.tag}
                                        </span>
                                    )}
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-[#EEEEEE] bg-white flex items-center justify-between px-4 lg:px-8 z-10">
                    <div className="flex items-center gap-4 text-black">
                        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden md:flex relative w-80">
                            <span className="absolute inset-y-0 left-3 flex items-center text-[#BBBBBB]">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="w-full bg-[#F5F5F5] border-none rounded-full pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-coral transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-[#888888] hover:text-coral transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-[#EEEEEE]">
                            <div className="hidden sm:block text-right">
                                <p className="text-xs font-bold leading-none">Marcelo Geusti</p>
                                <p className="text-[10px] text-[#888888] mt-1">Administrador</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center text-coral text-xs font-bold">
                                MG
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
