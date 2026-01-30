"use client"

import React, { useState, useEffect } from "react"
import DashboardShell from "../../components/DashboardShell"
import { User, Phone, FileText, Bell, Save, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneCountryCode: "+55",
        phoneDDD: "",
        phoneNumber: "",
        document: "",
        notificationsEnabled: true,
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // In a real app, we'd get the user ID from the auth context/token
                // For now, we'll assume there's a way to get the current profile
                const token = localStorage.getItem("token")
                const response = await axios.get(`${API_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setProfile(response.data)
            } catch (error) {
                console.error("Erro ao carregar perfil:", error)
                toast.error("Não foi possível carregar seus dados.")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const token = localStorage.getItem("token")
            await axios.patch(`${API_URL}/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Perfil atualizado com sucesso!")
        } catch (error) {
            console.error("Erro ao salvar perfil:", error)
            toast.error("Erro ao salvar alterações.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
                </div>
            </DashboardShell>
        )
    }

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Meus Dados</h1>
                        <p className="text-gray-500 text-sm mt-1">Gerencie suas informações pessoais e de contato.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="w-4 h-4 text-coral" />
                                    Informações Básicas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Nome</label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Sobrenome</label>
                                        <input
                                            type="text"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                            placeholder="Seu sobrenome"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">E-mail</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            disabled
                                            className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none"
                                        />
                                        <p className="text-[10px] text-gray-400">O e-mail não pode ser alterado diretamente.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-coral" />
                                    Contato & WhatsApp
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">País</label>
                                        <input
                                            type="text"
                                            value={profile.phoneCountryCode}
                                            onChange={(e) => setProfile({ ...profile, phoneCountryCode: e.target.value })}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                            placeholder="+55"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">DDD</label>
                                        <input
                                            type="text"
                                            value={profile.phoneDDD}
                                            onChange={(e) => setProfile({ ...profile, phoneDDD: e.target.value })}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                            placeholder="11"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Número</label>
                                        <input
                                            type="text"
                                            value={profile.phoneNumber}
                                            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                            placeholder="999999999"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-coral" />
                                    Documentação
                                </h3>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">CPF ou CNPJ</label>
                                    <input
                                        type="text"
                                        value={profile.document}
                                        onChange={(e) => setProfile({ ...profile, document: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                                        placeholder="000.000.000-00"
                                    />
                                    <p className="text-[10px] text-gray-400">Utilizado para fins fiscais e reconhecimento de assinatura.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-black text-white rounded-xl py-4 text-sm font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {saving ? (
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Salvar Alterações
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Status & Security */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                Status da Conta
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-green-700">Plano Ativo</span>
                                        <span className="bg-green-200 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Master</span>
                                    </div>
                                    <p className="text-[11px] text-green-600 mt-1">Acesso vitalício e ilimitado.</p>
                                </div>

                                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                                    <span className="text-gray-500 text-xs">Tipo de Conta</span>
                                    <span className="font-bold text-xs uppercase">Administrador</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2">
                                    <span className="text-gray-500 text-xs">Desde</span>
                                    <span className="font-bold text-xs uppercase">Jan 2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bell className="w-4 h-4 text-blue-500" />
                                Notificações
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 font-medium">Alertas por E-mail</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={profile.notificationsEnabled}
                                        onChange={() => setProfile({ ...profile, notificationsEnabled: !profile.notificationsEnabled })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
