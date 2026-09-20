
import { useEffect, useState } from "react";
import api from "../../api";

function Rapports() {
    // =========================
    // STATES
    // =========================

    const [equipments, setEquipments] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");

    const [report, setReport] = useState(null);
    const [equipmentHistory, setEquipmentHistory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // RÉCUPÉRER RAPPORT GÉNÉRAL + ÉQUIPEMENTS
    // =========================

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const [reportResponse, equipmentResponse] =
                    await Promise.all([
                        api.get("/rapports"),
                        api.get("/equipment"),
                    ]);

                setReport(reportResponse.data);
                setEquipments(equipmentResponse.data);
            } catch (error) {
                console.error(
                    "Erreur récupération rapports :",
                    error
                );

                if (error.response?.status === 403) {
                    setError("Accès interdit");
                } else {
                    setError(
                        "Impossible de récupérer les données."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // =========================
    // HISTORIQUE ÉQUIPEMENT
    // =========================

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

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                    <p className="text-gray-500">
                        Chargement des rapports...
                    </p>
                </div>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-12 text-center">
                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Vous n'avez pas accès aux rapports.
                    </p>
                </div>
            </div>
        );
    }

    // =========================
    // ÉQUIPEMENT SÉLECTIONNÉ
    // =========================

    const equipment = equipmentHistory?.equipment || null;

    const maintenances =
        equipmentHistory?.maintenances || [];

    const interventions =
        equipmentHistory?.interventions || [];

    const totalOperations =
        maintenances.length + interventions.length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* ================= HEADER ================= */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rapports
                </h1>

                <p className="text-gray-500 mt-1">
                    Statistiques, historique et traçabilité
                    des équipements
                </p>
            </div>

            {/* ================= STATISTIQUES GÉNÉRALES ================= */}

            {report && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">

                    {/* Équipements */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-sm text-gray-500">
                            Équipements
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {report.equipments}
                        </p>
                    </div>

                    {/* Maintenances */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-sm text-gray-500">
                            Maintenances
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {report.maintenances}
                        </p>
                    </div>

                    {/* Interventions */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-sm text-gray-500">
                            Interventions
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {report.interventions}
                        </p>
                    </div>

                    {/* Completed */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-sm text-gray-500">
                            Terminées
                        </p>

                        <p className="text-3xl font-bold text-[#0F7C7C] mt-2">
                            {report.completed_interventions}
                        </p>
                    </div>

                    {/* Pending */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-sm text-gray-500">
                            En cours
                        </p>

                        <p className="text-3xl font-bold text-orange-500 mt-2">
                            {report.pending_interventions}
                        </p>
                    </div>

                </div>
            )}

            {/* ================= SELECT EQUIPMENT ================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Historique d'un équipement
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Sélectionnez un équipement pour
                            consulter son historique.
                        </p>
                    </div>

                    <select
                        value={selectedEquipment}
                        onChange={(e) =>
                            setSelectedEquipment(e.target.value)
                        }
                        className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="">
                            Sélectionner un équipement
                        </option>

                        {equipments.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}

                                {item.reference
                                    ? ` - ${item.reference}`
                                    : ""}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

            {/* ================= EMPTY STATE ================= */}

            {!selectedEquipment && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E6F8F7] flex items-center justify-center mb-5">

                        <span className="text-3xl">
                            📋
                        </span>

                    </div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Aucun équipement sélectionné
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Choisissez un équipement ci-dessus
                        pour consulter son historique.
                    </p>

                </div>
            )}

            {/* ================= LOADING HISTORY ================= */}

            {selectedEquipment && historyLoading && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

                    <p className="text-gray-500">
                        Chargement de l'historique...
                    </p>

                </div>
            )}

            {/* ================= RAPPORT ÉQUIPEMENT ================= */}

            {selectedEquipment &&
                !historyLoading &&
                equipment && (
                    <>
                        {/* ================= EQUIPMENT INFO ================= */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-[#E6F8F7] flex items-center justify-center">

                                        <span className="text-2xl">
                                            🏥
                                        </span>

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {equipment.name}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-1">
                                            Référence :{" "}
                                            {equipment.reference ||
                                                "-"}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Localisation :{" "}
                                            {equipment.location ||
                                                "-"}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <div className="px-5 py-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                                        <p className="text-xs text-gray-500">
                                            Maintenances
                                        </p>

                                        <p className="text-xl font-bold text-gray-800 mt-1">
                                            {maintenances.length}
                                        </p>
                                    </div>

                                    <div className="px-5 py-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                                        <p className="text-xs text-gray-500">
                                            Interventions
                                        </p>

                                        <p className="text-xl font-bold text-gray-800 mt-1">
                                            {interventions.length}
                                        </p>
                                    </div>

                                    <div className="px-5 py-3 rounded-xl bg-[#E6F8F7]">
                                        <p className="text-xs text-[#0F7C7C]">
                                            Opérations
                                        </p>

                                        <p className="text-xl font-bold text-[#0F7C7C] mt-1">
                                            {totalOperations}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ================= HISTORIQUE ================= */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                            <div className="px-6 py-5 border-b border-gray-100">

                                <h2 className="text-lg font-semibold text-gray-800">
                                    Historique des opérations
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Maintenance et interventions
                                    réalisées sur cet équipement.
                                </p>

                            </div>

                            {/* ================= MAINTENANCES ================= */}

                            <div className="p-6">

                                <h3 className="text-md font-semibold text-gray-800 mb-4">
                                    🛠️ Maintenances
                                </h3>

                                {maintenances.length === 0 ? (
                                    <div className="bg-[#F8FAFC] rounded-xl p-5 text-center">

                                        <p className="text-sm text-gray-500">
                                            Aucune maintenance pour
                                            cet équipement.
                                        </p>

                                    </div>
                                ) : (
                                    <div className="space-y-3">

                                        {maintenances.map(
                                            (maintenance) => (
                                                <div
                                                    key={
                                                        maintenance.id
                                                    }
                                                    className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                                >

                                                    <div>

                                                        <p className="font-medium text-gray-800">
                                                            Maintenance #
                                                            {
                                                                maintenance.id
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {maintenance.description ||
                                                                "Aucune description"}
                                                        </p>

                                                    </div>

                                                    <div className="flex items-center gap-4">

                                                        <span className="text-sm text-gray-500">
                                                            {maintenance.plannedDate
                                                                ? new Date(
                                                                      maintenance.plannedDate
                                                                  ).toLocaleDateString()
                                                                : "-"}
                                                        </span>

                                                        <span className="px-3 py-1 rounded-full text-xs bg-[#E6F8F7] text-[#0F7C7C]">
                                                            {maintenance.status ||
                                                                "planned"}
                                                        </span>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                            {/* ================= INTERVENTIONS ================= */}

                            <div className="px-6 pb-6">

                                <h3 className="text-md font-semibold text-gray-800 mb-4">
                                    🔧 Interventions
                                </h3>

                                {interventions.length === 0 ? (
                                    <div className="bg-[#F8FAFC] rounded-xl p-5 text-center">

                                        <p className="text-sm text-gray-500">
                                            Aucune intervention pour
                                            cet équipement.
                                        </p>

                                    </div>
                                ) : (
                                    <div className="space-y-3">

                                        {interventions.map(
                                            (intervention) => (
                                                <div
                                                    key={
                                                        intervention.id
                                                    }
                                                    className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                                >

                                                    <div>

                                                        <p className="font-medium text-gray-800">
                                                            Intervention #
                                                            {
                                                                intervention.id
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {intervention.description ||
                                                                "Aucune description"}
                                                        </p>

                                                        <p className="text-xs text-gray-400 mt-2">
                                                            Technicien :{" "}
                                                            {intervention
                                                                .technician
                                                                ?.name ||
                                                                "Non assigné"}
                                                        </p>

                                                    </div>

                                                    <div className="flex items-center gap-4">

                                                        <span className="text-sm text-gray-500">
                                                            {intervention.startDate
                                                                ? new Date(
                                                                      intervention.startDate
                                                                  ).toLocaleString()
                                                                : "-"}
                                                        </span>

                                                        <span className="px-3 py-1 rounded-full text-xs bg-[#E6F8F7] text-[#0F7C7C]">
                                                            {intervention.status ||
                                                                "-"}
                                                        </span>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                        </div>
                    </>
                )}

        </div>
    );
}

export default Rapports;