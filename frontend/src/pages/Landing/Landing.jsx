import { useNavigate } from "react-router-dom";

import {
    Stethoscope,
    Monitor,
    ClipboardList,
    Users,
    Wrench,
    Bell,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Activity,
} from "lucide-react";

function Landing() {
    const navigate = useNavigate();

    const goToLogin = () => navigate("/login");

    const features = [
        {
            icon: Monitor,
            title: "Inventaire du parc",
            description:
                "Chaque équipement suivi : marque, modèle, emplacement et statut.",
        },
        {
            icon: ClipboardList,
            title: "Demandes",
            description:
                "Le personnel signale une panne avec la priorité en un clic.",
        },
        {
            icon: Users,
            title: "Affectation",
            description:
                "L'administrateur assigne chaque demande au bon technicien.",
        },
        {
            icon: Wrench,
            title: "Interventions",
            description:
                "Suivi en temps réel de chaque intervention, étape par étape.",
        },
        {
            icon: CalendarDays,
            title: "Maintenance préventive",
            description:
                "Planifiez vos maintenances et ne manquez plus d'échéance.",
        },
        {
            icon: Bell,
            title: "Alertes & rapports",
            description:
                "Notifications, statistiques et rapports pour garder le contrôle.",
        },
    ];

    const roles = [
        {
            icon: Wrench,
            name: "Technicien",
            desc: "Demandes, interventions et maintenances assignées.",
        },
        {
            icon: ClipboardList,
            name: "Personnel",
            desc: "Création et suivi de ses demandes de maintenance.",
        },
        {
            icon: Users,
            name: "Administrateur",
            desc: "Vision globale, équipe et rapports.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#172033]">
          
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#13B8B0]/10 flex items-center justify-center">
                            <Stethoscope
                                size={20}
                                className="text-[#13B8B0]"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            BioMaintenix
                        </span>
                    </div>

                    <button
                        onClick={goToLogin}
                        className="px-5 py-2.5 bg-[#13B8B0] text-white rounded-full font-medium shadow-md shadow-[#13B8B0]/25 hover:bg-[#0fa49d] transition-colors"
                    >
                        Se connecter
                    </button>
                </div>
            </header>

            <section className="relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#13B8B0]/10 blur-3xl" />
                <div className="absolute top-32 -left-32 w-72 h-72 rounded-full bg-[#25BDB5]/10 blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F8F7] text-[#0F7C7C] text-sm font-semibold">
                                <Activity size={15} />
                                Maintenance biomédicale
                            </span>

                            <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                Gérez vos équipements
                                <span className="text-[#13B8B0]">
                                    {" "}
                                    biomédicaux
                                </span>{" "}
                                en toute tranquillité
                            </h1>

                            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                                Inventaire, demandes, interventions et
                                maintenance préventive. Tout le cycle de vie de
                                votre parc, au même endroit.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={goToLogin}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#13B8B0] text-white rounded-full font-semibold shadow-lg shadow-[#13B8B0]/30 hover:bg-[#0fa49d] transition-colors"
                                >
                                    Accéder à l'espace
                                    <ArrowRight size={18} />
                                </button>

                                <a
                                    href="#fonctionnalites"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 bg-white text-gray-700 rounded-full font-semibold hover:border-[#13B8B0] hover:text-[#13B8B0] transition-colors"
                                >
                                    Découvrir les fonctionnalités
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#13B8B0] to-[#25BDB5] rounded-[2rem] opacity-10 blur-xl" />

                            <div className="relative bg-white rounded-3xl shadow-2xl shadow-[#0F7C7C]/10 border border-gray-100 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#E6F8F7] flex items-center justify-center">
                                        <Monitor
                                            size={20}
                                            className="text-[#13B8B0]"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">
                                            Ventilateur
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Service Réanimation
                                        </p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                                        Opérationnel
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#E6F8F7] flex items-center justify-center">
                                        <ClipboardList
                                            size={20}
                                            className="text-[#13B8B0]"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">
                                            Problème de machine
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Priorité haute
                                        </p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                                        En cours
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#E6F8F7] flex items-center justify-center">
                                        <Wrench
                                            size={20}
                                            className="text-[#13B8B0]"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">
                                            Maintenance planifiée
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Technicien affecté
                                        </p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                                        Planifiée
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <MiniStat
                                        label="Équipements"
                                        icon={<Monitor size={15} />}
                                    />
                                    <MiniStat
                                        label="Interventions"
                                        icon={<Wrench size={15} />}
                                    />
                                    <MiniStat
                                        label="Alertes"
                                        icon={<Bell size={15} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="fonctionnalites"
                className="py-18 pb-20 scroll-mt-16"
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            Tout le cycle de vie, une seule plateforme
                        </h2>

                        <p className="mt-4 text-gray-500">
                            De l'inventaire à la résolution des pannes, une
                            solution simple pour chaque profil.
                        </p>
                    </div>

                    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:border-[#13B8B0]/40 hover:shadow-xl hover:shadow-[#13B8B0]/10 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#E6F8F7] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#13B8B0] group-hover:text-white transition-all duration-300">
                                        <Icon
                                            size={24}
                                            className="text-[#13B8B0] group-hover:text-white transition-colors"
                                        />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-lg">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {roles.map((role) => {
                            const Icon = role.icon;

                            return (
                                <div
                                    key={role.name}
                                    className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E6F8F7] flex items-center justify-center">
                                        <Icon
                                            size={24}
                                            className="text-[#13B8B0]"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            {role.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                                            {role.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-[#0F7C7C] via-[#0F8C88] to-[#13B8B0] text-white">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        Prêt à piloter votre parc biomédical ?
                    </h2>

                    <p className="mt-4 text-white/85">
                        Connectez-vous et retrouvez vos équipements,
                        vos demandes et vos interventions.
                    </p>

                    <button
                        onClick={goToLogin}
                        className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F7C7C] rounded-full font-semibold shadow-lg hover:bg-[#E6F8F7] transition-colors"
                    >
                        Se connecter
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <footer className="bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#13B8B0]/10 flex items-center justify-center">
                            <Stethoscope
                                size={20}
                                className="text-[#13B8B0]"
                            />
                        </div>
                        <span className="font-bold">BioMaintenix</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2
                            size={15}
                            className="text-[#13B8B0]"
                        />
                        Précision & Traçabilité
                    </div>
                </div>
            </footer>
        </div>
    );
}

function MiniStat({ label, icon }) {
    return (
        <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 p-3 text-center">
            <div className="flex justify-center text-[#13B8B0]">
                {icon}
            </div>
            <p className="mt-1 text-xs font-medium text-gray-500">
                {label}
            </p>
        </div>
    );
}

export default Landing;