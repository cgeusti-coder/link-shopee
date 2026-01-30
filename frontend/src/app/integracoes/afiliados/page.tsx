"use client";

import React, { useState } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Plug, CheckCircle2, Search } from "lucide-react";
import IntegrationModal from "@/app/components/IntegrationModal";
import { PLATFORMS } from "@/app/config/platforms";

export default function IntegrationsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleConnect = (platform: string) => {
    setSelectedPlatform(platform);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setConnectedPlatforms((prev) => [...prev, selectedPlatform]);
  };

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId);

  const filteredPlatforms = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-coral to-orange-600 bg-clip-text text-transparent">
              Integrações
            </h1>
            <p className="text-gray-500 mt-1">
              Conecte suas contas de afiliados e marketplaces
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plataforma..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlatforms.map((platform) => (
            <div
              key={platform.id}
              className={`bg-white p-6 rounded-2xl border transition-all shadow-sm group relative flex flex-col ${isConnected(platform.id) ? 'border-green-500/50 bg-green-50/10' : 'border-[#EEEEEE] hover:border-coral/50'}`}
            >
              {isConnected(platform.id) && (
                <div className="absolute top-4 right-4 text-green-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${platform.bgColor} ${platform.textColor}`}>
                <platform.icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{platform.name}</h3>
                <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">
                  {platform.description}
                </p>
              </div>

              <button
                onClick={() => handleConnect(platform.id)}
                disabled={isConnected(platform.id)}
                className={`w-full py-2.5 rounded-xl border font-medium transition-colors text-sm ${isConnected(platform.id) ? 'bg-green-100 text-green-700 border-transparent cursor-default' : 'border-gray-200 text-gray-600 hover:border-coral hover:text-coral hover:bg-coral/5'}`}
              >
                {isConnected(platform.id) ? "Conectado" : "Conectar"}
              </button>
            </div>
          ))}

          {/* Custom API */}
          <div className="bg-white p-6 rounded-2xl border border-[#EEEEEE] border-dashed flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer min-h-[220px]">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <Plug className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">Nova Integração</h3>
            <p className="text-xs text-gray-500 mt-1">
              Solicite uma nova plataforma
            </p>
          </div>
        </div>
      </div>

      <IntegrationModal
        platform={selectedPlatform}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </DashboardShell>
  );
}
