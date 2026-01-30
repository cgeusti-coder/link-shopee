"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { MessageCircle, Smartphone } from "lucide-react";

export default function ConfigWhatsAppPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-green-500" />
                        WhatsApp Conexão
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Escaneie o QR Code para conectar seu WhatsApp
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#EEEEEE]">
                    <div className="w-64 h-64 bg-gray-900 rounded-xl flex items-center justify-center text-white mb-6">
                        <Smartphone className="w-12 h-12 opacity-50" />
                        <span className="ml-2">QR Code Placeholder</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Desconectado
                    </div>
                    <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
                        Gerar QR Code
                    </button>
                </div>
            </div>
        </DashboardShell>
    );
}
