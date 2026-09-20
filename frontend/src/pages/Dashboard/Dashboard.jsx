import { useEffect, useState } from "react";
import api from "../../api";

import {
    Monitor,
    Wrench,
    ClipboardList,
    Bell,
    CalendarDays,
    Clock,
    CheckCircle,
    FileText,
    AlertCircle,
} from "lucide-react";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get("/dashboard")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Erreur Dashboard :", error);
            });
    }, []);

    // =========================
    // LOADING
    // =========================

    if (!data) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8 w-full">
                <p className="text-gray-500">
                    Chargement du tableau de bord...
                </p>
            </div>
        );
    }

    // =========================
    // STATUS INTERVENTION
    // =========================

    const getInterventionStatus = (status) => {
        switch (status) {
            case "in_progress":
                return {
                    label: "En cours",
                    className: "bg-blue-100 text-blue-700",
                };

            case "completed":
                return {
                    label: "Terminée",
                    className: "bg-green-100 text-green-700",
                };

            case "assigned":
                return {
                    label: "Assignée",
                    className: "bg-gray-100 text-gray-700",
                };

            case "cancelled":
                return {
                    label: "Annulée",
                    className: "bg-red-100 text-red-700",
                };

            default:
                return {
                    label: status,
                    className: "bg-gray-100 text-gray-700",
                };
        }
    };

    // =========================
    // STATUS MAINTENANCE
    // =========================

    const getMaintenanceStatus = (status) => {
        switch (status) {
            case "planned":
                return {
                    label: "Planifiée",
                    className: "bg-gray-100 text-gray-700",
                };

            case "in_progress":
                return {
                    label: "En cours",
                    className: "bg-blue-100 text-blue-700",
                };

            case "completed":
                return {
                    label: "Terminée",
                    className: "bg-green-100 text-green-700",
                };

            default:
                return {
                    label: status,
                    className: "bg-gray-100 text-gray-700",
                };
        }
    };

    // =========================
    // STATUS DEMANDE
    // =========================

    const getDemandStatus = (status) => {
        switch (status) {
            case "pending":
                return {
                    label: "En attente",
                    className: "bg-yellow-100 text-yellow-700",
                };

            case "assigned":
                return {
                    label: "Assignée",
                    className: "bg-blue-100 text-blue-700",
                };

            case "in_progress":
                return {
                    label: "En cours",
                    className: "bg-blue-100 text-blue-700",
                };

            case "resolved":
                return {
                    label: "Résolue",
                    className: "bg-green-100 text-green-700",
                };

            default:
                return {
                    label: status,
                    className: "bg-gray-100 text-gray-700",
                };
        }
    };

    // =========================
    // HEADER
    // =========================

    const getHeaderText = () => {
        if (data.role === "admin") {
            return "Bienvenue sur BioMaintenix. Voici l'état global de la plateforme.";
        }

        if (data.role === "technicien") {
            return "Bienvenue sur BioMaintenix. Voici votre activité technique.";
        }

        if (data.role === "personnel") {
            return "Bienvenue sur BioMaintenix. Voici le suivi de vos demandes.";
        }

        return "Bienvenue sur BioMaintenix.";
    };

    // =========================
    // ADMIN DASHBOARD
    // =========================

    const renderAdminDashboard = () => (
        <>
            {/* STATISTICS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                {/* Total équipements */}
                <StatCard
                    title="Total des équipements"
                    value={data.equipment}
                    icon={<Monitor size={24} />}
                />

                {/* Interventions en cours */}
                <StatCard
                    title="Interventions en cours"
                    value={data.interventions_en_cours}
                    icon={<Wrench size={24} />}
                />

                {/* Interventions terminées */}
                <StatCard
                    title="Interventions terminées"
                    value={data.interventions_terminees}
                    icon={<CheckCircle size={24} />}
                />

                {/* Équipements opérationnels */}
                <StatCard
                    title="Équipements opérationnels"
                    value={data.equipements_operationnels}
                    icon={<Monitor size={24} />}
                />
            </div>

            {/* ALERTES */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <StatCard
                    title="Total des alertes"
                    value={data.alerts}
                    icon={<Bell size={24} />}
                />

                <StatCard
                    title="Alertes non lues"
                    value={data.unread_alerts}
                    icon={<AlertCircle size={24} />}
                />
            </div>

            {/* MAINTENANCE + INTERVENTIONS */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Maintenances */}

                <MaintenanceList
                    maintenances={data.upcoming_maintenances}
                    title="Maintenance à venir"
                    description="Les prochaines maintenances planifiées"
                />

                {/* Interventions */}

                <InterventionList
                    interventions={data.recent_interventions}
                    title="Interventions récentes"
                    description="Dernières interventions enregistrées"
                    showTechnician={true}
                />

            </div>
        </>
    );

    // =========================
    // TECHNICIEN DASHBOARD
    // =========================

    const renderTechnicianDashboard = () => (
        <>
            {/* STATISTICS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                {/* Mes interventions */}
                <StatCard
                    title="Mes interventions"
                    value={data.interventions}
                    icon={<Wrench size={24} />}
                />

                {/* En cours */}
                <StatCard
                    title="Interventions en cours"
                    value={data.interventions_en_cours}
                    icon={<Clock size={24} />}
                />

                {/* Terminées */}
                <StatCard
                    title="Interventions terminées"
                    value={data.interventions_terminees}
                    icon={<CheckCircle size={24} />}
                />

                {/* Maintenances */}
                <StatCard
                    title="Mes maintenances"
                    value={data.maintenances}
                    icon={<CalendarDays size={24} />}
                />
            </div>

            {/* SECOND ROW */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                <StatCard
                    title="Maintenances à venir"
                    value={data.maintenances_a_venir}
                    icon={<CalendarDays size={24} />}
                />

                <StatCard
                    title="Mes demandes"
                    value={data.demandes}
                    icon={<FileText size={24} />}
                />

                <StatCard
                    title="Mes alertes non lues"
                    value={data.unread_alerts}
                    icon={<Bell size={24} />}
                />
            </div>

            {/* MAINTENANCE + INTERVENTIONS */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                <MaintenanceList
                    maintenances={data.upcoming_maintenances}
                    title="Mes maintenances à venir"
                    description="Les maintenances qui vous concernent"
                />

                <InterventionList
                    interventions={data.recent_interventions}
                    title="Mes interventions récentes"
                    description="Vos dernières interventions"
                    showTechnician={false}
                />

            </div>
        </>
    );

    // =========================
    // PERSONNEL DASHBOARD
    // =========================

    const renderPersonnelDashboard = () => (
        <>
            {/* STATISTICS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                {/* Total équipements */}
                <StatCard
                    title="Total des équipements"
                    value={data.equipment}
                    icon={<Monitor size={24} />}
                />

                {/* Équipements opérationnels */}
                <StatCard
                    title="Équipements opérationnels"
                    value={data.equipements_operationnels}
                    icon={<CheckCircle size={24} />}
                />

                {/* Mes demandes */}
                <StatCard
                    title="Mes demandes"
                    value={data.demandes}
                    icon={<FileText size={24} />}
                />

                {/* Demandes en attente */}
                <StatCard
                    title="Demandes en attente"
                    value={data.demandes_en_attente}
                    icon={<Clock size={24} />}
                />
            </div>

            {/* DEMANDES */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                <StatCard
                    title="Demandes en cours"
                    value={data.demandes_en_cours}
                    icon={<Wrench size={24} />}
                />

                <StatCard
                    title="Demandes résolues"
                    value={data.demandes_resolues}
                    icon={<CheckCircle size={24} />}
                />

                <StatCard
                    title="Alertes non lues"
                    value={data.unread_alerts}
                    icon={<Bell size={24} />}
                />
            </div>

            {/* MES DEMANDES */}

            <div className="mt-8">

                <DemandList
                    demands={data.recent_demands}
                />

            </div>
        </>
    );

    // =========================
    // RETURN
    // =========================

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 text-gray-800 w-full">

            {/* HEADER */}

            <h1 className="text-3xl font-bold text-gray-800">
                Tableau de bord
            </h1>

            <p className="mt-2 text-gray-500">
                {getHeaderText()}
            </p>

            {/* ROLE DASHBOARD */}

            {data.role === "admin" && renderAdminDashboard()}

            {data.role === "technicien" && renderTechnicianDashboard()}

            {data.role === "personnel" && renderPersonnelDashboard()}

        </div>
    );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {value ?? 0}
                    </h2>
                </div>

                <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">

                    <span className="text-[#13B8B0]">
                        {icon}
                    </span>

                </div>

            </div>

        </div>
    );
}


// =====================================================
// MAINTENANCE LIST
// =====================================================

function MaintenanceList({
    maintenances,
    title,
    description,
}) {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>

                </div>

                <div className="w-10 h-10 rounded-lg bg-[#E6F8F7] flex items-center justify-center">

                    <CalendarDays
                        size={22}
                        className="text-[#13B8B0]"
                    />

                </div>

            </div>

            <div className="space-y-3">

                {maintenances?.length > 0 ? (

                    maintenances.map((maintenance) => {

                        const status = getMaintenanceStatusLocal(
                            maintenance.status
                        );

                        return (
                            <div
                                key={maintenance.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
                            >

                                <div className="max-w-[70%]">

                                    <p className="font-semibold text-gray-800">
                                        {maintenance.type}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {maintenance.equipment?.name}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {maintenance.description}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="font-semibold text-[#13B8B0]">
                                        {new Date(
                                            maintenance.plannedDate
                                        ).toLocaleDateString("fr-FR")}
                                    </p>

                                    <span
                                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                                    >
                                        {status.label}
                                    </span>

                                </div>

                            </div>
                        );
                    })

                ) : (

                    <p className="text-gray-500 text-sm">
                        Aucune maintenance à venir.
                    </p>

                )}

            </div>

        </div>
    );
}


// =====================================================
// INTERVENTION LIST
// =====================================================

function InterventionList({
    interventions,
    title,
    description,
    showTechnician,
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>

                </div>

                <div className="w-10 h-10 rounded-lg bg-[#E6F8F7] flex items-center justify-center">

                    <Wrench
                        size={22}
                        className="text-[#13B8B0]"
                    />

                </div>

            </div>

            <div className="space-y-3">

                {interventions?.length > 0 ? (

                    interventions.map((intervention) => {

                        const status = getInterventionStatusLocal(
                            intervention.status
                        );

                        return (
                            <div
                                key={intervention.id}
                                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                            >

                                <div className="flex items-center justify-between gap-3">

                                    <div className="min-w-0">

                                        <p className="font-semibold text-gray-800 truncate">
                                            {
                                                intervention.maintenance
                                                    ?.equipment?.name ||
                                                "Équipement"
                                            }
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {intervention.description}
                                        </p>

                                    </div>

                                    <span
                                        className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs ${status.className}`}
                                    >
                                        {status.label}
                                    </span>

                                </div>

                                {showTechnician && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Technicien :{" "}
                                        {intervention.technician?.name ||
                                            "Non défini"}
                                    </p>
                                )}

                            </div>
                        );
                    })

                ) : (

                    <p className="text-sm text-gray-500">
                        Aucune intervention récente.
                    </p>

                )}

            </div>

        </div>
    );
}


// =====================================================
// DEMAND LIST
// =====================================================

function DemandList({ demands }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Mes dernières demandes
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Suivi de vos dernières demandes de maintenance
                    </p>

                </div>

                <div className="w-10 h-10 rounded-lg bg-[#E6F8F7] flex items-center justify-center">

                    <ClipboardList
                        size={22}
                        className="text-[#13B8B0]"
                    />

                </div>

            </div>

            <div className="space-y-3">

                {demands?.length > 0 ? (

                    demands.map((demand) => {

                        const status = getDemandStatusLocal(
                            demand.status
                        );

                        return (
                            <div
                                key={demand.id}
                                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                            >

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="font-semibold text-gray-800">
                                            {demand.title}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Équipement :{" "}
                                            {demand.equipment?.name ||
                                                "Non défini"}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {demand.description}
                                        </p>

                                    </div>

                                    <span
                                        className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                                    >
                                        {status.label}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">

                                    <span>
                                        Priorité : {demand.priority}
                                    </span>

                                    <span>
                                        {new Date(
                                            demand.created_at
                                        ).toLocaleDateString("fr-FR")}
                                    </span>

                                </div>

                                {demand.technician && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Technicien :{" "}
                                        {demand.technician.name}
                                    </p>
                                )}

                            </div>
                        );
                    })

                ) : (

                    <p className="text-sm text-gray-500">
                        Aucune demande récente.
                    </p>

                )}

            </div>

        </div>
    );
}


// =====================================================
// STATUS HELPERS
// =====================================================

function getMaintenanceStatusLocal(status) {
    switch (status) {
        case "planned":
            return {
                label: "Planifiée",
                className: "bg-gray-100 text-gray-700",
            };

        case "in_progress":
            return {
                label: "En cours",
                className: "bg-blue-100 text-blue-700",
            };

        case "completed":
            return {
                label: "Terminée",
                className: "bg-green-100 text-green-700",
            };

        default:
            return {
                label: status,
                className: "bg-gray-100 text-gray-700",
            };
    }
}

function getInterventionStatusLocal(status) {
    switch (status) {
        case "in_progress":
            return {
                label: "En cours",
                className: "bg-blue-100 text-blue-700",
            };

        case "completed":
            return {
                label: "Terminée",
                className: "bg-green-100 text-green-700",
            };

        case "assigned":
            return {
                label: "Assignée",
                className: "bg-gray-100 text-gray-700",
            };

        case "cancelled":
            return {
                label: "Annulée",
                className: "bg-red-100 text-red-700",
            };

        default:
            return {
                label: status,
                className: "bg-gray-100 text-gray-700",
            };
    }
}

function getDemandStatusLocal(status) {
    switch (status) {
        case "pending":
            return {
                label: "En attente",
                className: "bg-yellow-100 text-yellow-700",
            };

        case "assigned":
            return {
                label: "Assignée",
                className: "bg-blue-100 text-blue-700",
            };

        case "in_progress":
            return {
                label: "En cours",
                className: "bg-blue-100 text-blue-700",
            };

        case "resolved":
            return {
                label: "Résolue",
                className: "bg-green-100 text-green-700",
            };

        default:
            return {
                label: status,
                className: "bg-gray-100 text-gray-700",
            };
    }
}

export default Dashboard;