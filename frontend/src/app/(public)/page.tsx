import React from "react";
import Link from "next/link";
import {
    Zap,
    Shield,
    BarChart3,
    MousePointerClick,
    MessageSquare,
    Globe,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral font-bold text-sm mb-8 animate-fade-in">
                        <Zap className="w-4 h-4" />
                        A plataforma n.º 1 para Afiliados
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
                        Automatize seus links, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-coral-hover">
                            Multiplique seus ganhos.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-12">
                        A MultiLink centraliza suas integrações de afiliado, automatiza suas divulgações e fornece métricas reais para você vender mais em menos tempo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/registro"
                            className="w-full sm:w-auto bg-coral hover:bg-coral-hover text-white text-lg font-bold px-10 py-5 rounded-full shadow-xl shadow-coral/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Começar teste de 15 dias
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-900 text-lg font-bold px-10 py-5 rounded-full border border-gray-200 transition-all flex items-center justify-center"
                        >
                            Ver funcionalidades
                        </Link>
                    </div>

                    {/* App Preview Mockup */}
                    <div className="mt-20 relative px-4">
                        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-700">
                            <div className="h-4 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                                alt="Dashboard Preview"
                                className="w-full h-auto opacity-90"
                            />
                        </div>
                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-coral/20 to-transparent blur-[120px] -z-10 opacity-50"></div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Tudo que o Afiliado Pro precisa</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Desenvolvido por quem vive o mercado para quem quer dominar os canais de divulgação.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-coral/20 hover:shadow-xl hover:shadow-coral/5 transition-all group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-coral group-hover:text-white transition-colors duration-300">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Trial Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-black text-white p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-6">Pronto para subir de nível?</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                                Junte-se a milhares de afiliados que já economizam horas todos os dias com a MultiLink.
                            </p>
                            <Link
                                href="/registro"
                                className="bg-coral hover:bg-coral-hover text-white text-xl font-bold px-12 py-5 rounded-full inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                            >
                                Testar grátis por 15 dias
                                <Zap className="w-5 h-5 fill-current" />
                            </Link>
                            <p className="mt-6 text-xs text-gray-500">Sem cartão de crédito necessário • Cancele a qualquer momento</p>
                        </div>
                        {/* Abstract background object */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-coral/20 blur-[100px] -z-0"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-0"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: "Integração Shopee & AliExpress",
        desc: "API oficial conectada diretamente para conversão automática de links e busca de ofertas em tempo real.",
        icon: ShoppingBag
    },
    {
        title: "Automação WhatsApp & Telegram",
        desc: "Envio em massa para seus canais e grupos de ofertas sem precisar ficar online 24h por dia.",
        icon: MessageSquare
    },
    {
        title: "Dashboard de Performance",
        desc: "Saiba exatamente quais links estão gerando mais cliques e converta seus dados em comissões.",
        icon: BarChart3
    },
    {
        title: "Conversor Inteligente",
        desc: "Transforme links em posts formatados e otimizados para atrair mais cliques e evitar banimentos.",
        icon: MousePointerClick
    },
    {
        title: "Gestão Multicontas",
        desc: "Gerencie vários canais e grupos de diferentes nichos em uma única tela de forma organizada.",
        icon: Globe
    },
    {
        title: "Suporte Especializado",
        desc: "Time de suporte pronto para te ajudar a configurar suas primeiras automações e escalas.",
        icon: Shield
    }
];

import { ShoppingBag } from "lucide-react";
