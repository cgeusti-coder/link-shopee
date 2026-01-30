"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, User, CheckCircle2, ArrowRight, ShieldCheck, Smartphone, Hash, Bell } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/app/config/api";

export default function RegistroPage() {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Form, 2: Success
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneDDD: "",
        phoneNumber: "",
        document: "",
        notificationsEnabled: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Clean special characters from document and phone
        const cleanDocument = formData.document.replace(/\D/g, "");
        const cleanPhone = formData.phoneNumber.replace(/\D/g, "");

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phoneDDD: formData.phoneDDD,
                phoneNumber: cleanPhone,
                document: cleanDocument,
                notificationsEnabled: formData.notificationsEnabled
            });

            localStorage.setItem("userId", response.data.userId);

            setStep(2);
            toast.success("Conta criada com sucesso! Aproveite seus 15 dias.");
        } catch (error: any) {
            console.error("Erro no registro:", error);
            toast.error(error.response?.data?.message || "Erro ao criar conta. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    };

    if (step === 2) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
                <div className="max-w-md w-full text-center space-y-6 animate-fade-in bg-white p-10 rounded-[40px] shadow-2xl shadow-coral/10 border border-coral/5">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-green-50">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Tudo pronto! 🎉</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Seu período de <span className="text-black font-bold">15 dias de teste grátis</span> começou. Vamos configurar seu negócio?
                    </p>
                    <Link
                        href="/dashboard"
                        className="w-full bg-coral hover:bg-coral-hover text-white font-bold py-5 rounded-2xl shadow-xl shadow-coral/20 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                    >
                        Acessar Minha Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-12 md:py-20">
            <div className="max-w-xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-coral/10 text-coral px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <Zap className="w-4 h-4 fill-coral" />
                        Acesso Imediato
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter leading-tight">
                        Crie sua conta <br />
                        <span className="text-coral">em segundos.</span>
                    </h2>
                    <p className="text-gray-500 font-medium">
                        15 dias grátis • Sem carência • Cancelamento um clique
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coral/20 via-coral to-coral/20"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Seu nome"
                                        className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sobrenome</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Seu sobrenome"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail Profissional</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="seu@contato.com"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1 space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">DDD</label>
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={2}
                                        placeholder="11"
                                        className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900 text-center"
                                        value={formData.phoneDDD}
                                        onChange={(e) => setFormData({ ...formData, phoneDDD: e.target.value.replace(/\D/g, "") })}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp / Celular</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="98888-7777"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CPF ou CNPJ (Identificador de Assinatura)</label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="000.000.000-00"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.document}
                                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 px-1 flex items-start gap-2 leading-relaxed">
                                <span className="text-coral mt-0.5">⚠️</span>
                                Sua assinatura é reconhecida automaticamente pelo CPF cadastrado. No momento do pagamento, informe o mesmo CPF desta página.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Crie uma senha forte"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 py-2 px-1">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, notificationsEnabled: !formData.notificationsEnabled })}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.notificationsEnabled ? 'bg-coral border-coral text-white scale-110' : 'border-gray-200'}`}
                            >
                                {formData.notificationsEnabled && <Bell className="w-3 h-3 fill-current" />}
                            </button>
                            <span className="text-xs font-bold text-gray-500 cursor-pointer select-none" onClick={() => setFormData({ ...formData, notificationsEnabled: !formData.notificationsEnabled })}>
                                Quero receber novidades e relatórios por e-mail
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-black/90 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4 text-base tracking-tight"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Começar Meu Teste de 15 Dias
                                    <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed px-4">
                            Ao clicar acima, você aceita nossos <br />
                            <Link href="#" className="underline font-bold hover:text-black">Termos de Uso</Link> e reconhece nossa <Link href="#" className="underline font-bold hover:text-black">Política de Dados</Link>.
                        </p>
                    </form>
                </div>

                <p className="text-center mt-10 text-gray-500 font-bold text-sm">
                    Já é um Afiliado MultiLink? <Link href="/login" className="text-coral hover:underline ml-1">Fazer Login</Link>
                </p>
            </div>
        </div>
    );
}
