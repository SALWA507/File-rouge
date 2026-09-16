import { useEffect, useState } from "react";
import api from "../../api";
import {
    Monitor,
    Wrench,
    ClipboardList,
    Bell,
    CalendarDays,
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
            })
            
    }, []);

    

    return (
<div className="min-h-screen bg-[#F8FAFC] p-8 text-gray-800 w-full">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800">
                Tableau de bord
            </h1>

            <p className="mt-2 text-gray-500">
                Bienvenue sur BioMaintenix. Voici l'état de vos dispositifs.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 w-full">

                {/* Équipements */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Total des équipements
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {data?.equipment ?? 0}
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">
                            <Monitor
                                size={24}
                                className="text-[#13B8B0]"
                            />
                        </div>
                    </div>
                </div>

                {/* Interventions en cours */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Interventions en cours
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {data?.interventions_en_cours ?? 0}
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">
                            <Wrench
                                size={24}
                                className="text-[#13B8B0]"
                            />
                        </div>
                    </div>
                </div>

                {/* Interventions terminées */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Interventions terminées
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {data?.interventions_terminees ?? 0}
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">
                            <ClipboardList
                                size={24}
                                className="text-[#13B8B0]"
                            />
                        </div>
                    </div>
                </div>

                {/* Équipements opérationnels */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Équipements opérationnels
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {data?.equipements_operationnels ?? 0}
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">
                            <Bell
                                size={24}
                                className="text-[#13B8B0]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Maintenance + Interventions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Maintenances à venir */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Maintenance à venir
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Les prochaines maintenances planifiées
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

                        {data?.upcoming_maintenances?.length > 0 ? (

                            data.upcoming_maintenances.map((maintenance) => (

                                <div
                                    key={maintenance.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
                                >

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {maintenance.type}
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
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                maintenance.status === "planned"
                                                    ? "bg-gray-200 text-gray-600"
                                                    : maintenance.status === "in_progress"
                                                    ? "bg-blue-200 text-blue-700"
                                                    : maintenance.status === "completed"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {maintenance.status === "planned"
                                                ? "Planifiée"
                                                : maintenance.status === "in_progress"
                                                ? "En cours"
                                                : maintenance.status === "completed"
                                                ? "Terminée"
                                                : maintenance.status}
                                        </span>

                                    </div>
                                </div>

                            ))

                        ) : (

                            <p className="text-gray-500 text-sm">
                                Aucune maintenance à venir.
                            </p>

                        )}

                    </div>
                </div>

                {/* Interventions récentes */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Interventions récentes
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Dernières interventions
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

                        {data?.recent_interventions?.length > 0 ? (

                            data.recent_interventions.map((intervention) => (

                                <div
                                    key={intervention.id}
                                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="font-semibold text-gray-800">
                                                {intervention.maintenance?.equipment?.name}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {intervention.description}
                                            </p>

                                        </div>

                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs ${
                                                intervention.status === "in_progress"
                                                    ? "bg-blue-200 text-blue-700"
                                                    : intervention.status === "completed"
                                                    ? "bg-green-200 text-green-700"
                                                    : intervention.status === "assigned"
                                                    ? "bg-gray-200 text-gray-600"
                                                    : intervention.status === "cancelled"
                                                    ? "bg-red-200 text-red-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {intervention.status === "in_progress"
                                                ? "En cours"
                                                : intervention.status === "completed"
                                                ? "Terminée"
                                                : intervention.status === "assigned"
                                                ? "Assignée"
                                                : intervention.status === "cancelled"
                                                ? "Annulée"
                                                : intervention.status}
                                        </span>

                                    </div>

                                    <p className="text-xs text-gray-400 mt-2">
                                        Technicien :{" "}
                                        {intervention.technician?.name || "Non défini"}
                                    </p>

                                </div>

                            ))

                        ) : (

                            <p className="text-sm text-gray-500">
                                Aucune intervention récente.
                            </p>

                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;