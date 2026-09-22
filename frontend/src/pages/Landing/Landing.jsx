import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    Stethoscope, 
    ClipboardList, 
    Users, 
    Wrench, 
    ArrowRight, 
    CheckCircle2, 
    Activity 
} from "lucide-react";
import loginMedical from "../../assets/login-medical.png";

export default function Landing() {
    const navigate = useNavigate();
    const goToLogin = () => navigate("/login");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#087F8C] selection:text-white">

            <header className="w-full bg-[#092F3A] text-white border-b border-slate-800 shadow-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Stethoscope size={20} className="text-[#63E0D9]" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-wide">BioMaintenix</h1>
                            <p className="text-[10px] text-white/50">Gestion de maintenance biomédicale</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={goToLogin}
                        className="group flex items-center gap-2 bg-[#087F8C] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:bg-[#066873] hover:scale-[1.02] transition-all"
                    >
                        Se connecter
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </header>
            <section className="relative py-16 md:py-24 bg-white overflow-hidden flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5F7F6] text-[#087F8C] text-xs font-semibold mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#087F8C]" />
                                Gestion intelligente des équipements biomédicaux
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                                La maintenance <span className="text-[#087F8C]">biomédicale</span> simplifiée.
                            </h2>

                            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                                BioMaintenix vous permet de centraliser vos équipements, demandes, interventions et maintenances dans une seule plateforme intuitive.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    onClick={goToLogin}
                                    className="group inline-flex items-center gap-3 bg-[#087F8C] hover:bg-[#066873] text-white px-7 py-3.5 rounded-xl font-semibold shadow-xl shadow-[#087F8C]/20 hover:scale-[1.02] transition-all"
                                >
                                    Accéder à l'espace
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                                </button>
                                <a
                                    href="#fonctionnement"
                                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-all"
                                >
                                    Découvrir la plateforme
                                </a>
                            </div>
                        </div>

                        <div className="relative w-full flex justify-center">
                            <div className="relative w-full max-w-lg h-[360px] md:h-[420px] rounded-3xl overflow-hidden border-2 border-[#087F8C]/30 shadow-2xl bg-gradient-to-br from-[#092F3A] via-[#087F8C] to-[#065A63] p-2">
                                <img 
                                    src={loginMedical} 
                                    alt="Équipement biomédical" 
                                    className="w-full h-full object-cover rounded-2xl opacity-90 shadow-inner" 
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section id="fonctionnement" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5F7F6] text-[#087F8C] text-xs font-bold uppercase tracking-wider">
                            <Activity size={14} /> Fonctionnement
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#172033]">
                            Une gestion simple, <span className="text-[#0BA8A1]">étape par étape.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white text-center hover:shadow-lg transition">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100 text-[#087F8C] flex items-center justify-center mb-5 shadow-sm">
                                <ClipboardList size={26} />
                            </div>
                            <span className="text-xs font-bold text-[#087F8C]">ÉTAPE 01</span>
                            <h3 className="font-bold text-lg mt-1">Signaler</h3>
                            <p className="text-sm text-slate-500 mt-2">Le personnel crée une demande lorsqu'un équipement présente un problème.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white text-center hover:shadow-lg transition">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5 shadow-sm">
                                <Users size={26} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">ÉTAPE 02</span>
                            <h3 className="font-bold text-lg mt-1">Affecter</h3>
                            <p className="text-sm text-slate-500 mt-2">L'administrateur affecte la demande au technicien concerné.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white text-center hover:shadow-lg transition">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-sm">
                                <Wrench size={26} />
                            </div>
                            <span className="text-xs font-bold text-emerald-600">ÉTAPE 03</span>
                            <h3 className="font-bold text-lg mt-1">Intervenir</h3>
                            <p className="text-sm text-slate-500 mt-2">Le technicien réalise l'intervention et renseigne les informations.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white text-center hover:shadow-lg transition">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 shadow-sm">
                                <CheckCircle2 size={26} />
                            </div>
                            <span className="text-xs font-bold text-amber-600">ÉTAPE 04</span>
                            <h3 className="font-bold text-lg mt-1">Suivre</h3>
                            <p className="text-sm text-slate-500 mt-2">La demande est suivie jusqu'à sa résolution complète.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold text-[#087F8C]">POUR CHAQUE UTILISATEUR</span>
                            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                                Une expérience adaptée <span className="block text-[#0BA8A1]">à chaque rôle.</span>
                            </h2>
                            <p className="mt-5 text-slate-500 leading-relaxed">
                                Chaque utilisateur accède uniquement aux fonctionnalités nécessaires à son activité quotidienne.
                            </p>
                            <button
                                onClick={goToLogin}
                                className="mt-7 inline-flex items-center gap-2 bg-[#087F8C] hover:bg-[#066873] text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
                            >
                                Commencer maintenant <ArrowRight size={17} />
                            </button>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-start gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#087F8C] flex items-center justify-center text-white">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Administrateur</h3>
                                    <p className="mt-1 text-sm text-slate-500">Supervise la plateforme et consulte les données globales.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                    <Wrench size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Technicien</h3>
                                    <p className="mt-1 text-sm text-slate-500">Gère les demandes, maintenances et interventions assignées.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                                    <ClipboardList size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Personnel</h3>
                                    <p className="mt-1 text-sm text-slate-500">Crée et suit facilement ses demandes de maintenance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-6 lg:px-10 py-16 bg-slate-50">
                <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#087F8C] to-[#13B8B0] p-10 md:p-14 text-center text-white shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold">Prêt à simplifier votre maintenance ?</h2>
                    <p className="mt-4 text-white/80 max-w-xl mx-auto">
                        Centralisez vos équipements et améliorez le suivi de vos opérations avec BioMaintenix.
                    </p>
                    <button
                        onClick={goToLogin}
                        className="mt-8 inline-flex items-center gap-2 bg-white text-[#087F8C] px-7 py-3.5 rounded-xl font-bold hover:bg-[#E8F7F7] hover:scale-[1.02] transition shadow-lg"
                    >
                        Accéder à BioMaintenix <ArrowRight size={18} />
                    </button>
                </div>
            </section>
            <footer className="bg-[#092F3A] text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                            <Stethoscope size={18} className="text-[#63E0D9]" />
                        </div>
                        <div>
                            <p className="font-bold">BioMaintenix</p>
                            <p className="text-xs text-white/50">Gestion de maintenance biomédicale</p>
                        </div>
                    </div>
                    <p className="text-sm text-white/50">Précision & Traçabilité</p>
                </div>
            </footer>

        </div>
    );
}