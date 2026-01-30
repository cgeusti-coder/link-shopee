"use client";

import React from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { PlayCircle } from "lucide-react";

export default function VideosPage() {
    return (
        <DashboardShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Tutoriais e Vídeos
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Aprenda a usar a plataforma ao máximo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-white cursor-pointer hover:scale-[1.02] transition-transform">
                            <PlayCircle className="w-12 h-12 opacity-80" />
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}
