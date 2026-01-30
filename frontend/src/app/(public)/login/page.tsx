"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/app/config/api";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: formData.email,
                password: formData.password
            });

            // Simulating user persistence
            localStorage.setItem("userId", "default-tenant"); // In production this would be real ID

            toast.success("Bem-vindo de volta!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Erro no login:", error);
            toast.error(error.response?.data?.message || "Erro ao realizar login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Acesse sua <br />
                        <span className="text-coral">conta.</span>
                    </h2>
                    <p className="text-gray-500">
                        Bom te ver novamente por aqui!
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Senha</label>
                                <Link href="#" className="text-[10px] font-bold text-coral hover:underline">Esqueci a senha</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Sua senha secreta"
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
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Entrar no MultiLink
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-gray-500 font-medium">
                    Ainda não tem conta? <Link href="/registro" className="text-coral hover:underline font-bold">Teste grátis por 15 dias</Link>
                </p>
            </div>
        </div>
    );
}
