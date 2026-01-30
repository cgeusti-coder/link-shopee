import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Public Header */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-coral rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-coral/20">
                                M
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-gray-900">
                                MultiLink
                            </span>
                        </Link>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-bold text-gray-600 hover:text-coral transition-colors px-4 py-2"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/registro"
                                className="bg-coral hover:bg-coral-hover text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-coral/20 transition-all hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
                            >
                                Teste grátis
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* Public Footer */}
            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 MultiLink Automation. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
