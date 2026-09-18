import { useEffect, useState } from "react";
import api from "../../api";

function Interventions() {
    // =========================
    // USER CONNECTÉ
    // =========================

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    // =========================
    // STATES
    // =========================

    const [interventions, setInterventions] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [addIntervention, setAddIntervention] = useState(false);
    const [editIntervention, setEditIntervention] = useState(false);
    const [selectedIntervention, setSelectedIntervention] =
        useState(null);

    const [newIntervention, setNewIntervention] = useState({
        maintenance_id: "",
        technician_id: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "assigned",
    });

    // =========================
    // GET INTERVENTIONS
    // =========================

    useEffect(() => {
        api.get("/interventions")
            .then((response) => {
                setInterventions(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur interventions :",
                    error.response?.data || error
                );
            });
    }, []);

    // =========================
    // GET MAINTENANCES + TECHNICIENS
    // =========================

    useEffect(() => {
        api.get("/maintenances")
            .then((response) => {
                setMaintenances(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur maintenances :",
                    error.response?.data || error
                );
            });

        // Seulement admin a besoin de la liste des techniciens
        if (role === "admin") {
            api.get("/users")
                .then((response) => {
                    const techniciansOnly =
                        response.data.filter(
                            (user) => user.role === "technicien"
                        );

                    setTechnicians(techniciansOnly);
                })
                .catch((error) => {
                    console.error(
                        "Erreur techniciens :",
                        error.response?.data || error
                    );
                });
        }
    }, [role]);

    // =========================
    // AJOUTER INTERVENTION
    // ADMIN SEULEMENT
    // =========================

    const addNewIntervention = async () => {
        if (role !== "admin") {
            alert("Seul l'administrateur peut ajouter une intervention.");
            return;
        }

        if (
            !newIntervention.maintenance_id ||
            !newIntervention.technician_id ||
            !newIntervention.startDate ||
            !newIntervention.description
        ) {
            alert("Veuillez remplir les champs obligatoires.");
            return;
        }

        try {
            const response = await api.post(
                "/interventions",
                newIntervention
            );

            const intervention =
                response.data.intervention || response.data;

            setInterventions((prev) => [
                ...prev,
                intervention,
            ]);

            setAddIntervention(false);

            setNewIntervention({
                maintenance_id: "",
                technician_id: "",
                startDate: "",
                endDate: "",
                description: "",
                status: "assigned",
            });
        } catch (error) {
            console.error(
                "Erreur ajout :",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                    "Erreur lors de l'ajout de l'intervention."
            );
        }
    };

    // =========================
    // MODIFIER INTERVENTION
    // ADMIN + TECHNICIEN
    // =========================

    const updateIntervention = async () => {
        if (
            role !== "admin" &&
            role !== "technicien"
        ) {
            alert("Accès interdit.");
            return;
        }

        if (!selectedIntervention) return;

        try {
            const response = await api.put(
                `/interventions/${selectedIntervention.id}`,
                {
                    maintenance_id:
                        selectedIntervention.maintenance_id,

                    // Admin peut modifier le technicien.
                    // Pour technicien, le backend ignore ce champ.
                    technician_id:
                        selectedIntervention.technician_id,

                    startDate:
                        selectedIntervention.startDate,

                    endDate:
                        selectedIntervention.endDate,

                    description:
                        selectedIntervention.description,

                    status:
                        selectedIntervention.status,
                }
            );

            const updatedIntervention =
                response.data.intervention ||
                response.data;

            setInterventions((prev) =>
                prev.map((intervention) =>
                    intervention.id ===
                    selectedIntervention.id
                        ? updatedIntervention
                        : intervention
                )
            );

            setEditIntervention(false);
            setSelectedIntervention(null);
        } catch (error) {
            console.error(
                "Erreur modification :",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                    "Erreur lors de la modification."
            );
        }
    };

    // =========================
    // SUPPRIMER INTERVENTION
    // ADMIN SEULEMENT
    // =========================

    const deleteIntervention = async (id) => {
        if (role !== "admin") {
            alert(
                "Seul l'administrateur peut supprimer une intervention."
            );
            return;
        }

        const confirmation = window.confirm(
            "Êtes-vous sûre de vouloir supprimer cette intervention ?"
        );

        if (!confirmation) return;

        try {
            await api.delete(`/interventions/${id}`);

            setInterventions((prev) =>
                prev.filter(
                    (intervention) =>
                        intervention.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Erreur suppression :",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                    "Erreur lors de la suppression."
            );
        }
    };

    // =========================
    // OUVRIR MODAL MODIFICATION
    // =========================

    const openEditModal = (intervention) => {
        setSelectedIntervention({
            ...intervention,

            startDate: intervention.startDate
                ? intervention.startDate.slice(0, 16)
                : "",

            endDate: intervention.endDate
                ? intervention.endDate.slice(0, 16)
                : "",
        });

        setEditIntervention(true);
    };

    // =========================
    // FERMER MODAL
    // =========================

    const closeEditModal = () => {
        setEditIntervention(false);
        setSelectedIntervention(null);
    };

    // =========================
    // RENDER
    // =========================

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* =========================
                HEADER
            ========================= */}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Interventions
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestion des interventions techniques
                    </p>
                </div>

                {/* ADMIN SEULEMENT */}
                {role === "admin" && (
                    <button
                        onClick={() =>
                            setAddIntervention(true)
                        }
                        className="px-5 py-3 bg-[#13B8B0] text-white rounded-lg font-medium hover:bg-[#0fa49d]"
                    >
                        + Ajouter une intervention
                    </button>
                )}
            </div>

            {/* =========================
                LISTE INTERVENTIONS
            ========================= */}

            {interventions.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border">
                    <p className="text-gray-500">
                        Aucune intervention trouvée
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {interventions.map(
                        (intervention) => (
                            <div
                                key={intervention.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
                            >

                                {/* ICON */}
                                <div className="w-12 h-12 rounded-xl bg-[#E6F8F7] flex items-center justify-center mb-5">
                                    <span className="text-2xl">
                                        🛠️
                                    </span>
                                </div>

                                {/* TITLE */}
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Intervention #
                                    {intervention.id}
                                </h2>

                                {/* STATUS */}
                                <div className="mt-3">
                                    <span className="px-3 py-1 rounded-full text-sm bg-[#E6F8F7] text-[#0F7C7C]">
                                        {intervention.status}
                                    </span>
                                </div>

                                {/* TECHNICIEN */}
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400">
                                        Technicien
                                    </p>

                                    <p className="text-sm font-medium text-gray-700 mt-1">
                                        {intervention
                                            .technician
                                            ?.name ||
                                            "Non assigné"}
                                    </p>
                                </div>

                                {/* MAINTENANCE */}
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400">
                                        Maintenance
                                    </p>

                                    <p className="text-sm font-medium text-gray-700 mt-1">
                                        Maintenance #
                                        {
                                            intervention.maintenance_id
                                        }
                                    </p>
                                </div>

                                {/* DESCRIPTION */}
                                <p className="text-gray-500 text-sm mt-4">
                                    {intervention.description ||
                                        "Aucune description"}
                                </p>

                                {/* START DATE */}
                                <p className="text-gray-400 text-sm mt-3">
                                    Début :{" "}
                                    {intervention.startDate
                                        ? new Date(
                                              intervention.startDate
                                          ).toLocaleString()
                                        : "-"}
                                </p>

                                {/* END DATE */}
                                <p className="text-gray-400 text-sm mt-2">
                                    Fin :{" "}
                                    {intervention.endDate
                                        ? new Date(
                                              intervention.endDate
                                          ).toLocaleString()
                                        : "-"}
                                </p>

                                {/* =========================
                                    ACTIONS
                                ========================= */}

                                <div className="mt-5 space-y-2">

                                    {/* ADMIN + TECHNICIEN */}
                                    {(role === "admin" ||
                                        role ===
                                            "technicien") && (
                                        <button
                                            onClick={() =>
                                                openEditModal(
                                                    intervention
                                                )
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl bg-[#E6F8F7] text-[#0F7C7C] font-medium hover:bg-[#D5F3F1]"
                                        >
                                            Modifier
                                        </button>
                                    )}

                                    {/* ADMIN SEULEMENT */}
                                    {role === "admin" && (
                                        <button
                                            onClick={() =>
                                                deleteIntervention(
                                                    intervention.id
                                                )
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {/* =====================================================
                MODAL AJOUT
            ===================================================== */}

            {addIntervention &&
                role === "admin" && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                        <div className="bg-white rounded-2xl w-full max-w-md">

                            {/* HEADER */}
                            <div className="px-6 py-5 border-b">
                                <h2 className="text-xl font-semibold">
                                    Ajouter une intervention
                                </h2>
                            </div>

                            {/* BODY */}
                            <div className="p-6 space-y-4">

                                {/* MAINTENANCE */}
                                <select
                                    value={
                                        newIntervention.maintenance_id
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                maintenance_id:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        Sélectionner une
                                        maintenance
                                    </option>

                                    {maintenances.map(
                                        (maintenance) => (
                                            <option
                                                key={
                                                    maintenance.id
                                                }
                                                value={
                                                    maintenance.id
                                                }
                                            >
                                                Maintenance #
                                                {
                                                    maintenance.id
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* TECHNICIEN */}
                                <select
                                    value={
                                        newIntervention.technician_id
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                technician_id:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        Sélectionner un
                                        technicien
                                    </option>

                                    {technicians.map(
                                        (technician) => (
                                            <option
                                                key={
                                                    technician.id
                                                }
                                                value={
                                                    technician.id
                                                }
                                            >
                                                {
                                                    technician.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* START */}
                                <input
                                    type="datetime-local"
                                    value={
                                        newIntervention.startDate
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                startDate:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {/* END */}
                                <input
                                    type="datetime-local"
                                    value={
                                        newIntervention.endDate
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                endDate:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {/* STATUS */}
                                <select
                                    value={
                                        newIntervention.status
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                status: e.target
                                                    .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="assigned">
                                        Assignée
                                    </option>

                                    <option value="in_progress">
                                        En cours
                                    </option>

                                    <option value="completed">
                                        Terminée
                                    </option>

                                    <option value="cancelled">
                                        Annulée
                                    </option>
                                </select>

                                {/* DESCRIPTION */}
                                <textarea
                                    rows="3"
                                    value={
                                        newIntervention.description
                                    }
                                    onChange={(e) =>
                                        setNewIntervention(
                                            {
                                                ...newIntervention,
                                                description:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    placeholder="Description"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t">

                                <button
                                    onClick={() =>
                                        setAddIntervention(
                                            false
                                        )
                                    }
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Annuler
                                </button>

                                <button
                                    onClick={
                                        addNewIntervention
                                    }
                                    className="px-4 py-2 bg-[#13B8B0] text-white rounded-lg"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            {/* =====================================================
                MODAL MODIFICATION
            ===================================================== */}

            {editIntervention &&
                selectedIntervention && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                        <div className="bg-white rounded-2xl w-full max-w-md">

                            {/* HEADER */}
                            <div className="px-6 py-5 border-b">
                                <h2 className="text-xl font-semibold">
                                    Modifier
                                    l'intervention
                                </h2>
                            </div>

                            {/* BODY */}
                            <div className="p-6 space-y-4">

                                {/* MAINTENANCE */}
                                <select
                                    value={
                                        selectedIntervention.maintenance_id ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                maintenance_id:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        Sélectionner une
                                        maintenance
                                    </option>

                                    {maintenances.map(
                                        (maintenance) => (
                                            <option
                                                key={
                                                    maintenance.id
                                                }
                                                value={
                                                    maintenance.id
                                                }
                                            >
                                                Maintenance #
                                                {
                                                    maintenance.id
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* TECHNICIEN */}
                                <select
                                    value={
                                        selectedIntervention.technician_id ||
                                        ""
                                    }
                                    disabled={
                                        role ===
                                        "technicien"
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                technician_id:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className={`w-full border rounded-lg px-3 py-2 ${
                                        role ===
                                        "technicien"
                                            ? "bg-gray-100 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <option value="">
                                        Sélectionner un
                                        technicien
                                    </option>

                                    {technicians.map(
                                        (technician) => (
                                            <option
                                                key={
                                                    technician.id
                                                }
                                                value={
                                                    technician.id
                                                }
                                            >
                                                {
                                                    technician.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* START */}
                                <input
                                    type="datetime-local"
                                    value={
                                        selectedIntervention.startDate ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                startDate:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {/* END */}
                                <input
                                    type="datetime-local"
                                    value={
                                        selectedIntervention.endDate ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                endDate:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {/* STATUS */}
                                <select
                                    value={
                                        selectedIntervention.status ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                status: e.target
                                                    .value,
                                            }
                                        )
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="assigned">
                                        Assignée
                                    </option>

                                    <option value="in_progress">
                                        En cours
                                    </option>

                                    <option value="completed">
                                        Terminée
                                    </option>

                                    <option value="cancelled">
                                        Annulée
                                    </option>
                                </select>

                                {/* DESCRIPTION */}
                                <textarea
                                    rows="3"
                                    value={
                                        selectedIntervention.description ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedIntervention(
                                            {
                                                ...selectedIntervention,
                                                description:
                                                    e.target
                                                        .value,
                                            }
                                        )
                                    }
                                    placeholder="Description"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t">

                                <button
                                    onClick={
                                        closeEditModal
                                    }
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Annuler
                                </button>

                                <button
                                    onClick={
                                        updateIntervention
                                    }
                                    className="px-4 py-2 bg-[#13B8B0] text-white rounded-lg"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Interventions;