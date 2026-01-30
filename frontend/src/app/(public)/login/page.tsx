"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Github, Facebook } from "lucide-react";
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

            // Store Secure JWT and User Info
            const { access_token, user } = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userId", user.id); // For legacy compatibility if needed

            toast.success("Bem-vindo de volta!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Erro no login:", error);
            const message = error.response?.data?.message || "Erro ao realizar login. Verifique e-mail e senha.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        toast.info(`Login com ${provider} será integrado com Supabase em breve.`);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-coral/10 text-coral rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-coral/5">
                        <ShieldCheck className="w-8 h-8 fill-coral/20" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">
                        Acesse sua <br />
                        <span className="text-coral">conta.</span>
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Seu ecossistema de automação te espera.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senha</label>
                                <Link href="#" className="text-[10px] font-black text-coral hover:underline">Esqueci a senha</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-coral transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Sua senha secreta"
                                    className="w-full bg-gray-50 border border-transparent focus:border-coral focus:bg-white rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-medium text-gray-900"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-black/90 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4 text-base"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Entrar no MultiLink
                                </>
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                                <span className="bg-white px-4 text-gray-400">Ou entre com</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("Google")}
                                className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-xs font-bold text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("Facebook")}
                                className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 group"
                            >
                                <Facebook className="w-5 h-5 text-[#1877F2] fill-[#1877F2] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-10 text-gray-500 font-bold text-sm">
                    Ainda não tem conta? <Link href="/registro" className="text-coral hover:underline ml-1">Teste grátis por 15 dias</Link>
                </p>
            </div>
        </div>
    );
}
