"use client"

import React, { useState, useEffect } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { Info, AlertTriangle, Save, Trash2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/app/config/api";

export default function MeusDadosPage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneDDD: "",
        phoneNumber: "",
        document: "",
        notificationsEnabled: true
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // Using placeholder userId 'default-tenant' for now as per project pattern
            const response = await axios.get(`${API_URL}/profile?userId=default-tenant`);
            const data = response.data;

            // Basic parsing of phone if available
            let ddd = "";
            let num = "";
            if (data.phone) {
                ddd = data.phone.substring(0, 2);
                num = data.phone.substring(2);
            }

            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phoneDDD: ddd,
                phoneNumber: num,
                document: data.document || "",
                notificationsEnabled: data.notificationsEnabled ?? true
            });
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            toast.error("Erro ao carregar dados do perfil");
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`${API_URL}/profile?userId=default-tenant`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                document: formData.document,
                phoneMain: formData.phoneDDD + formData.phoneNumber,
                notificationsEnabled: formData.notificationsEnabled
            });
            toast.success("Dados salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
            toast.error("Erro ao salvar os dados");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <DashboardShell>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Yellow Alert Banner */}
                <div className="bg-[#FFF8E6] border border-[#FFD666] rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-[#856404]">
                            Atenção! - adicione seu telefone e CPF.
                        </p>
                        <p className="text-xs text-[#856404]/80 mt-1">
                            Precisa de ajuda? <span className="font-bold cursor-pointer hover:underline text-coral">Clique aqui</span>
                        </p>
                    </div>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 md:p-8 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <h2 className="text-xl font-bold">Meus Dados</h2>
                        </div>

                        {/* Blue Info Box */}
                        <div className="bg-[#E6F7FF] border border-[#91D5FF] rounded-xl p-5 space-y-3">
                            <div className="flex items-center gap-2 text-[#0050B3]">
                                <Info className="w-5 h-5" />
                                <span className="font-bold text-sm">Informação Importante</span>
                            </div>
                            <p className="text-sm text-[#002766] leading-relaxed">
                                Sua assinatura é reconhecida <span className="font-bold text-sky-600">automaticamente pelo sistema</span> através do CPF cadastrado.
                            </p>
                            <p className="text-sm text-[#002766] leading-relaxed">
                                <span className="font-bold">Importante:</span> No momento do pagamento, informe o mesmo CPF desta página para garantir o reconhecimento automático da sua assinatura.
                            </p>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome:</label>
                                    <input
                                        type="text"
                                        placeholder="marcelo"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sobrenome:</label>
                                    <input
                                        type="text"
                                        placeholder="Geusti"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none transition-all"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-mail:</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-[#EEF2F7] border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefone</label>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-4 md:col-span-3">
                                        <label className="text-[10px] text-gray-400 block mb-1">CÓDIGO DO PAÍS</label>
                                        <select className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                                            <option>+55 (BR)</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2 md:col-span-2">
                                        <label className="text-[10px] text-gray-400 block mb-1">DDD</label>
                                        <input
                                            type="text"
                                            maxLength={2}
                                            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-center"
                                            placeholder="21"
                                            value={formData.phoneDDD}
                                            onChange={(e) => setFormData({ ...formData, phoneDDD: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-7">
                                        <label className="text-[10px] text-gray-400 block mb-1">NÚMERO</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                                            placeholder="991164174"
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400">Ex: +55 31 99000-0000</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CPF/CNPJ:</label>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    className="w-full px-4 py-3 bg-white border border-green-500/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all shadow-sm"
                                    value={formData.document}
                                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                                    required
                                />
                                <p className="text-[10px] text-gray-400">somente números (11 dígitos para CPF ou 14 para CNPJ)</p>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.notificationsEnabled}
                                    onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                                />
                                <label htmlFor="notifications" className="text-sm text-gray-600 cursor-pointer">
                                    Receber notificações via e-mail
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#1890FF] hover:bg-[#096DD9] text-white font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Salvar
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-center pt-8 pb-12">
                    <button className="flex items-center gap-2 px-6 py-2.5 border border-red-200 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Excluir Conta Permanentemente
                    </button>
                </div>

                <div className="text-center text-[10px] text-gray-400 pb-8">
                    © 2026
                </div>
            </div>
        </DashboardShell>
    );
}
