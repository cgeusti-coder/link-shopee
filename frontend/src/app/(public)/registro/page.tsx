"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, User, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/app/config/api";

export default function RegistroPage() {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Form, 2: Success
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                firstName: formData.firstName,
                email: formData.email,
                password: formData.password
            });

            // In a real app we'd save the token, but for now we follow the project's
            // pattern of passing userId/tenantId in queries
            localStorage.setItem("userId", response.data.userId);

            setStep(2);
            toast.success("Conta criada com sucesso! Aproveite seus 15 dias.");
        } catch (error: any) {
            console.error("Erro no registro:", error);
            toast.error(error.response?.data?.message || "Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    };

    if (step === 2) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Tudo pronto! 🎉</h2>
                    <p className="text-gray-500 text-lg">
                        Seu período de <span className="text-black font-bold">15 dias de teste grátis</span> começou agora. Vamos configurar suas integrações?
                    </p>
                    <Link
                        href="/dashboard"
                        className="w-full bg-coral hover:bg-coral-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-coral/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        Acessar Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Comece seu teste <br />
                        <span className="text-coral">gratuito agora.</span>
                    </h2>
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        15 dias de acesso total • Sem compromisso
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nome completo</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Como quer ser chamado?"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Crie sua senha</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="No mínimo 6 caracteres"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Criar minha conta"
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                            Ao se cadastrar, você concorda com nossos <br />
                            <Link href="#" className="underline hover:text-gray-600">Termos de Uso</Link> e <Link href="#" className="underline hover:text-gray-600">Políticas de Privacidade</Link>.
                        </p>
                    </form>
                </div>

                <p className="text-center mt-8 text-gray-500 font-medium">
                    Já tem uma conta? <Link href="/login" className="text-coral hover:underline font-bold">Entrar agora</Link>
                </p>
            </div>
        </div>
    );
}
