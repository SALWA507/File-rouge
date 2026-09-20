import { useEffect, useState } from "react";
import api from "../../api";

function Rapports() {
    const [equipments, setEquipments] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [equipmentHistory, setEquipmentHistory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/equipment");

                setEquipments(response.data);
            } catch (error) {
                console.error(
                    "Erreur récupération équipements :",
                    error
                );

                if (error.response?.status === 403) {
                    setError("Accès interdit");
                } else {
                    setError(
                        "Impossible de récupérer les équipements."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEquipments();
    }, []);

    useEffect(() => {
        if (!selectedEquipment) {
            setEquipmentHistory(null);
            return;
        }

        const fetchEquipmentHistory = async () => {
            try {
                setHistoryLoading(true);
                setEquipmentHistory(null);

                const response = await api.get(
                    `/rapports/equipment/${selectedEquipment}/history`
                );

                setEquipmentHistory(response.data);
            } catch (error) {
                console.error(
                    "Erreur historique équipement :",
                    error
                );

                setEquipmentHistory(null);
            } finally {
                setHistoryLoading(false);
            }
        };

        fetchEquipmentHistory();
    }, [selectedEquipment]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">
                        Chargement des rapports...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">
                        {error}
                    </h2>

                    <p className="text-gray-500">
                        Vous n'avez pas accès aux rapports.
                    </p>
                </div>
            </div>
        );
    }

    const equipment = equipmentHistory?.equipment || null;
    const maintenances = equipmentHistory?.maintenances || [];
    const interventions = equipmentHistory?.interventions || [];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rapports
                </h1>

                <p className="text-gray-500 mt-1">
                    Consultez l'historique des équipements,
                    maintenances et interventions.
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F4F4] flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-[#0F7C7C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4h-4"
                            />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Historique d'un équipement
                        </h2>

                        <p className="text-sm text-gray-500">
                            Sélectionnez un équipement pour consulter
                            son historique.
                        </p>
                    </div>
                </div>

                <select
                    value={selectedEquipment}
                    onChange={(e) =>
                        setSelectedEquipment(e.target.value)
                    }
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F7C7C]/20 focus:border-[#0F7C7C]"
                >
                    <option value="">
                        Sélectionner un équipement
                    </option>

                    {equipments.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name} — {item.reference}
                        </option>
                    ))}
                </select>
            </div>

            {!selectedEquipment && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E6F4F4] flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-[#0F7C7C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                        Aucun équipement sélectionné
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Sélectionnez un équipement ci-dessus pour
                        afficher son historique.
                    </p>
                </div>
            )}

            {historyLoading && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <p className="text-gray-500">
                        Chargement de l'historique...
                    </p>
                </div>
            )}

            {equipment && !historyLoading && (
                <div className="space-y-8">

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <p className="text-sm text-gray-400 mb-1">
                                    Équipement
                                </p>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    {equipment.name}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Référence : {equipment.reference}
                                </p>
                            </div>

                            <span
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                    equipment.status === "operationnel"
                                        ? "bg-blue-50 text-blue-700"
                                        : equipment.status === "maintenance"
                                        ? "bg-orange-50 text-orange-700"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {equipment.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                            <div className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-sm text-gray-400">
                                    Marque
                                </p>

                                <p className="font-medium text-gray-800 mt-1">
                                    {equipment.brand || "—"}
                                </p>
                            </div>

                            <div className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-sm text-gray-400">
                                    Modèle
                                </p>

                                <p className="font-medium text-gray-800 mt-1">
                                    {equipment.model || "—"}
                                </p>
                            </div>

                            <div className="bg-[#F8FAFC] rounded-xl p-4">
                                <p className="text-sm text-gray-400">
                                    Localisation
                                </p>

                                <p className="font-medium text-gray-800 mt-1">
                                    {equipment.location || "—"}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* =========================
                        MAINTENANCES
                    ========================= */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Historique des maintenances
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Maintenances associées à cet équipement.
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full bg-[#E6F4F4] text-[#0F7C7C] text-sm font-medium">
                                    {maintenances.length}
                                </span>

                            </div>
                        </div>

                        <div className="p-6">

                            {maintenances.length === 0 ? (
                                <p className="text-center text-gray-400 py-6">
                                    Aucune maintenance enregistrée.
                                </p>
                            ) : (
                                <div className="space-y-4">

                                    {maintenances.map((maintenance) => (
                                        <div
                                            key={maintenance.id}
                                            className="border border-gray-100 rounded-xl p-5 hover:border-[#0F7C7C]/30 transition"
                                        >

                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                                <div>
                                                    <div className="flex items-center gap-3">

                                                        <h3 className="font-semibold text-gray-800">
                                                            Maintenance #{maintenance.id}
                                                        </h3>

                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                            {maintenance.type}
                                                        </span>

                                                    </div>

                                                    <p className="text-gray-500 text-sm mt-3">
                                                        {maintenance.description ||
                                                            "Aucune description"}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                                        maintenance.status ===
                                                        "completed"
                                                            ? "bg-blue-50 text-blue-700"
                                                            : maintenance.status ===
                                                              "in_progress"
                                                            ? "bg-orange-50 text-orange-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {maintenance.status}
                                                </span>

                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">

                                                <p className="text-sm text-gray-500">
                                                    <span className="font-medium text-gray-700">
                                                        Date prévue :
                                                    </span>{" "}
                                                    {maintenance.plannedDate
                                                        ? new Date(
                                                              maintenance.plannedDate
                                                          ).toLocaleDateString(
                                                              "fr-FR"
                                                          )
                                                        : "—"}
                                                </p>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Historique des interventions
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Interventions réalisées ou planifiées
                                        sur cet équipement.
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full bg-[#E6F4F4] text-[#0F7C7C] text-sm font-medium">
                                    {interventions.length}
                                </span>

                            </div>
                        </div>

                        <div className="p-6">

                            {interventions.length === 0 ? (
                                <p className="text-center text-gray-400 py-6">
                                    Aucune intervention enregistrée.
                                </p>
                            ) : (
                                <div className="space-y-4">

                                    {interventions.map((intervention) => (
                                        <div
                                            key={intervention.id}
                                            className="border border-gray-100 rounded-xl p-5 hover:border-[#0F7C7C]/30 transition"
                                        >

                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                                <div className="flex-1">

                                                    <div className="flex items-center gap-3">

                                                        <h3 className="font-semibold text-gray-800">
                                                            Intervention #{intervention.id}
                                                        </h3>

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                intervention.status ===
                                                                "completed"
                                                                    ? "bg-blue-50 text-blue-700"
                                                                    : intervention.status ===
                                                                      "in_progress"
                                                                    ? "bg-orange-50 text-orange-700"
                                                                    : "bg-gray-100 text-gray-600"
                                                            }`}
                                                        >
                                                            {intervention.status}
                                                        </span>

                                                    </div>

                                                    <p className="text-gray-500 text-sm mt-3">
                                                        {intervention.description ||
                                                            "Aucune description"}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-gray-100">

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Technicien
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800 mt-1">
                                                        {intervention.technician
                                                            ?.name || "Non affecté"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Date de début
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800 mt-1">
                                                        {intervention.startDate
                                                            ? new Date(
                                                                  intervention.startDate
                                                              ).toLocaleDateString(
                                                                  "fr-FR"
                                                              )
                                                            : "—"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Date de fin
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800 mt-1">
                                                        {intervention.endDate
                                                            ? new Date(
                                                                  intervention.endDate
                                                              ).toLocaleDateString(
                                                                  "fr-FR"
                                                              )
                                                            : "—"}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

export default Rapports;