
import { useEffect, useState } from "react";
import api from "../../api";

function Rapports() {
    const [equipments, setEquipments] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [interventions, setInterventions] = useState([]);

    const [selectedEquipment, setSelectedEquipment] =
        useState("");

    // =========================
    // Récupérer les données
    // =========================
    useEffect(() => {
        api.get("/equipment")
            .then((response) => {
                setEquipments(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur équipements :",
                    error
                );
            });

        api.get("/maintenances")
            .then((response) => {
                setMaintenances(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur maintenances :",
                    error
                );
            });

        api.get("/interventions")
            .then((response) => {
                setInterventions(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur interventions :",
                    error
                );
            });
    }, []);

    // =========================
    // Équipement sélectionné
    // =========================
    const equipment =
        equipments.find(
            (item) =>
                String(item.id) ===
                String(selectedEquipment)
        ) || null;

    // =========================
    // Maintenances de l'équipement
    // =========================
    const equipmentMaintenances =
        selectedEquipment
            ? maintenances.filter(
                  (maintenance) =>
                      String(
                          maintenance.equipment_id
                      ) === String(selectedEquipment)
              )
            : [];

    // =========================
    // Interventions liées
    // =========================
    const equipmentInterventions =
        selectedEquipment
            ? interventions.filter((intervention) =>
                  equipmentMaintenances.some(
                      (maintenance) =>
                          String(
                              maintenance.id
                          ) ===
                          String(
                              intervention.maintenance_id
                          )
                  )
              )
            : [];

    // =========================
    // Nombre total opérations
    // =========================
    const totalOperations =
        equipmentMaintenances.length +
        equipmentInterventions.length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">
            {/* ================= HEADER ================= */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rapports
                </h1>

                <p className="text-gray-500 mt-1">
                    Historique et traçabilité des équipements
                </p>
            </div>

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
                            setSelectedEquipment(
                                e.target.value
                            )
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

            {/* ================= RAPPORT ================= */}
            {selectedEquipment && equipment && (
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
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="px-5 py-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                                    <p className="text-xs text-gray-500">
                                        Maintenances
                                    </p>

                                    <p className="text-xl font-bold text-gray-800 mt-1">
                                        {
                                            equipmentMaintenances.length
                                        }
                                    </p>
                                </div>

                                <div className="px-5 py-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                                    <p className="text-xs text-gray-500">
                                        Interventions
                                    </p>

                                    <p className="text-xl font-bold text-gray-800 mt-1">
                                        {
                                            equipmentInterventions.length
                                        }
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

                        {/* MAINTENANCES */}
                        <div className="p-6">
                            <h3 className="text-md font-semibold text-gray-800 mb-4">
                                🛠️ Maintenances
                            </h3>

                            {equipmentMaintenances.length ===
                            0 ? (
                                <div className="bg-[#F8FAFC] rounded-xl p-5 text-center">
                                    <p className="text-sm text-gray-500">
                                        Aucune maintenance pour
                                        cet équipement.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {equipmentMaintenances.map(
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
                                                        {maintenance.plannedDate ||
                                                            "-"}
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

                        {/* INTERVENTIONS */}
                        <div className="px-6 pb-6">
                            <h3 className="text-md font-semibold text-gray-800 mb-4">
                                🔧 Interventions
                            </h3>

                            {equipmentInterventions.length ===
                            0 ? (
                                <div className="bg-[#F8FAFC] rounded-xl p-5 text-center">
                                    <p className="text-sm text-gray-500">
                                        Aucune intervention pour
                                        cet équipement.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {equipmentInterventions.map(
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
