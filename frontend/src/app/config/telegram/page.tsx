"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Send } from "lucide-react";

export default function ConfigTelegramPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Send className="w-6 h-6 text-sky-500" />
                        Telegram Bot
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Conecte seu bot do Telegram para postagens automáticas
                    </p>
                </div>

                <div className="max-w-xl">
                    <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE] space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bot Token</label>
                            <input type="password" placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
                            <p className="text-xs text-gray-400 mt-1">Obtenha com o @BotFather</p>
                        </div>
                        <button className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors">
                            Salvar Token
                        </button>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
