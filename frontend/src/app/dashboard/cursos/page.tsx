"use client"

import React, { useState, useEffect } from "react";
import DashboardShell from "@/app/components/DashboardShell";
import { BookOpen, Plus, ExternalLink, Trash2, Image as ImageIcon, Link as LinkIcon, GraduationCap, Trophy } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/app/config/api";

interface Course {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    affiliateLink: string;
}

export default function CursosPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMaster, setIsMaster] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: "",
        description: "",
        imageUrl: "",
        affiliateLink: ""
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        // Simple master check for UI (real check on backend)
        if (userId === "waniely2357@gmail.com" || userId?.includes("waniely")) {
            setIsMaster(true);
        }
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}/courses`);
            setCourses(response.data);
        } catch (error) {
            console.error("Erro ao carregar cursos:", error);
            // toast.error("Não foi possível carregar os cursos");
            // Mocking for now since backend is being built
            setCourses([
                {
                    id: "1",
                    name: "Domine o Shopee Afiliados",
                    description: "Aprenda as estratégias que os top 1% usam para vender todos os dias no automático.",
                    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
                    affiliateLink: "https://shopee.com.br"
                },
                {
                    id: "2",
                    name: "Automação Viral no Telegram",
                    description: "Como criar grupos que crescem sozinhos e geram comissões recorrentes.",
                    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
                    affiliateLink: "https://t.me"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Real implementation would use FormData for image upload
            await axios.post(`${API_URL}/courses`, newCourse);
            toast.success("Curso cadastrado com sucesso!");
            setShowAddModal(false);
            fetchCourses();
        } catch (error) {
            toast.error("Erro ao cadastrar curso");
        }
    };

    return (
        <DashboardShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-coral mb-1">
                            <GraduationCap className="w-5 h-5 fill-coral/10" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Academia MultiLink</span>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Cursos & Treinamentos</h2>
                        <p className="text-gray-500 text-sm font-medium">Acelere seus resultados com estratégias validadas por especialistas.</p>
                    </div>

                    {isMaster && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-black hover:bg-black/90 text-white font-black py-4 px-6 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Novo Curso (ADMIN)
                        </button>
                    )}
                </div>

                {/* Banner / Highlight */}
                <div className="relative bg-black rounded-[32px] overflow-hidden p-8 md:p-12 text-white shadow-2xl shadow-coral/5 group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-coral/20 to-transparent pointer-events-none" />
                    <div className="relative z-10 max-w-xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-coral text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            <Trophy className="w-3 h-3 fill-current" />
                            Destaque do Mês
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                            Manual do Afiliado <br />
                            <span className="text-coral">Alta Performance</span>
                        </h3>
                        <p className="text-gray-400 font-medium text-sm md:text-base">
                            O guia definitivo para quem está começando do zero até os primeiros R$ 10.000 em comissões mensais com automação.
                        </p>
                        <button className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-coral hover:text-white transition-all transform group-hover:translate-x-1 flex items-center gap-3 shadow-lg">
                            Começar Agora
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 group hover:border-coral/20 transition-all flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.imageUrl}
                                    alt={course.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-coral transition-colors">{course.name}</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <a
                                        href={course.affiliateLink}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-xs font-black text-coral uppercase tracking-widest hover:gap-3 transition-all"
                                    >
                                        Acessar Treinamento
                                        <ExternalLink className="w-4 h-4" />
                                    </a>

                                    {isMaster && (
                                        <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simple Add Modal (Conceptual) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[40px] p-8 md:p-10 shadow-2xl relative">
                        <h3 className="text-2xl font-black mb-6 tracking-tight">Novo Curso</h3>
                        <form onSubmit={handleAddCourse} className="space-y-4">
                            <input
                                placeholder="Nome do Curso"
                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-coral"
                                value={newCourse.name}
                                onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                            />
                            <textarea
                                placeholder="Descrição"
                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-coral h-32"
                                value={newCourse.description}
                                onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                            />
                            <input
                                placeholder="Link da Imagem (Upload real vindo depois)"
                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-coral"
                                value={newCourse.imageUrl}
                                onChange={e => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
                            />
                            <input
                                placeholder="Link de Afiliado"
                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-coral"
                                value={newCourse.affiliateLink}
                                onChange={e => setNewCourse({ ...newCourse, affiliateLink: e.target.value })}
                            />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 font-black text-gray-400 py-4">Cancelar</button>
                                <button type="submit" className="flex-1 bg-coral text-white font-black py-4 rounded-2xl shadow-lg shadow-coral/20">Criar Curso</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}

function ArrowRight(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}
