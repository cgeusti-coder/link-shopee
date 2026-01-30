"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface IntegrationModalProps {
    platform: string; // 'SHOPEE' | 'AMAZON'
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function IntegrationModal({ platform, isOpen, onClose, onSuccess }: IntegrationModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        affiliateId: "",
        apiKey: "",
        apiSecret: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Real API call to validate and save
            const response = await fetch('http://localhost:3000/integrations/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    platform,
                    ...formData,
                    tenantId: 'default-tenant' // Placeholder until Auth is ready
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Erro ao validar credenciais');
            }

            // If validation passed, now save it (the validate endpoint could also save, 
            // but let's follow a distinct save if needed or just assume validate/save together)
            await fetch('http://localhost:3000/integrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    platform,
                    ...formData,
                    tenantId: 'default-tenant'
                }),
            });

            toast.success(result.message || `${platform} conectado com sucesso!`);
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Erro ao conectar. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Conectar {platform}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {platform === 'SHOPEE' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 200012345"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.affiliateId}
                                    onChange={(e) => setFormData({ ...formData, affiliateId: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Key</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiKey}
                                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Secret</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiSecret}
                                    onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {platform === 'ALIEXPRESS' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: canal_promo"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.affiliateId}
                                    onChange={(e) => setFormData({ ...formData, affiliateId: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Key</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiKey}
                                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Secret</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiSecret}
                                    onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {platform === 'AMAZON' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Associate Tag (BR)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: seunome-20"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.affiliateId}
                                    onChange={(e) => setFormData({ ...formData, affiliateId: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Access Key</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiKey}
                                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                    value={formData.apiSecret}
                                    onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {!['SHOPEE', 'ALIEXPRESS', 'AMAZON'].includes(platform) && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID de Afiliado / Tag</label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: suatag-20"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                value={formData.affiliateId}
                                onChange={(e) => setFormData({ ...formData, affiliateId: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-coral hover:bg-orange-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Conectando...
                                </>
                            ) : (
                                "Salvar Integração"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
