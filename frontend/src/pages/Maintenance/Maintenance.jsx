import { useEffect, useState } from "react";
import api from "../../api";

function Maintenance() {
    const [maintenances, setMaintenances] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal Ajouter
    const [addMaintenance, setAddMaintenance] = useState(false);

    // Modal Modifier
    const [editMaintenance, setEditMaintenance] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const deleteMaintenance = async (id) => {
    if (!window.confirm("Êtes-vous sûre de vouloir supprimer cette maintenance ?")) {
        return;
    }

    try {
        await api.delete(`/maintenances/${id}`);

        setMaintenances(
            maintenances.filter((maintenance) => maintenance.id !== id)
        );

    } catch (error) {
        console.error("Erreur suppression maintenance :", error);
    }
};

    // Nouvelle maintenance
    const [newMaintenance, setNewMaintenance] = useState({
        equipment_id: "",
        type: "",
        description: "",
        plannedDate: "",
        status: "planned",
    });

    // =========================
    // Récupérer les maintenances
    // =========================

    useEffect(() => {
        api.get("/maintenances")
            .then((response) => {
                setMaintenances(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur maintenances :",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // =========================
    // Récupérer les équipements
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
    }, []);

    // =========================
    // Ajouter maintenance
    // =========================

    const addNewMaintenance = async () => {
        try {
            const response = await api.post(
                "/maintenances",
                newMaintenance
            );

            setMaintenances([
                ...maintenances,
                response.data.maintenance,
            ]);

            setAddMaintenance(false);

            setNewMaintenance({
                equipment_id: "",
                type: "",
                description: "",
                plannedDate: "",
                status: "planned",
            });

        } catch (error) {
            console.error(
                "Erreur ajout maintenance :",
                error
            );
        }
    };

    // =========================
    // Modifier maintenance
    // =========================

    const updateMaintenance = async () => {
        try {
            const response = await api.put(
                `/maintenances/${selectedMaintenance.id}`,
                {
                    equipment_id:
                        selectedMaintenance.equipment_id,

                    type:
                        selectedMaintenance.type,

                    description:
                        selectedMaintenance.description,

                    plannedDate:
                        selectedMaintenance.plannedDate,

                    status:
                        selectedMaintenance.status,
                }
            );

            setMaintenances(
                maintenances.map((maintenance) =>
                    maintenance.id === selectedMaintenance.id
                        ? response.data.maintenance
                        : maintenance
                )
            );

            setEditMaintenance(false);
            setSelectedMaintenance(null);

        } catch (error) {
            console.error(
                "Erreur modification maintenance :",
                error
            );
        }
    };

    // =========================
    // Loading
    // =========================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <p className="text-gray-500">
                    Chargement...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* ================= HEADER ================= */}

            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Maintenance
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Gestion des opérations de maintenance
                    </p>
                </div>

                <button
                    onClick={() =>
                        setAddMaintenance(true)
                    }
                    className="px-5 py-3 bg-[#13B8B0] text-white rounded-xl font-medium hover:bg-[#0fa49d] transition"
                >
                    + Ajouter une maintenance
                </button>

            </div>

            {/* ================= CARDS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {maintenances.length > 0 ? (

                    maintenances.map((maintenance) => (

                        <div
                            key={maintenance.id}
className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col h-full"                        >

                            {/* Card Header */}

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-[#E6F8F7] flex items-center justify-center text-xl">
                                        🔧
                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-gray-800">
                                            {maintenance.type}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {maintenance.equipment?.name ||
                                                "Équipement"}
                                        </p>

                                    </div>

                                </div>

                                <span className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-blue-100 text-blue-700">
                                    {maintenance.status}
                                </span>

                            </div>

                            {/* Equipment Reference */}

                            {maintenance.equipment?.reference && (
                                <div className="mt-4">

                                    <p className="text-xs text-gray-400">
                                        Référence
                                    </p>

                                    <p className="text-sm font-medium text-gray-700 mt-1">
                                        {maintenance.equipment.reference}
                                    </p>

                                </div>
                            )}

                            {/* Date */}

                            <div className="mt-4">

                                <p className="text-xs text-gray-400">
                                    Date prévue
                                </p>

                                <p className="text-sm font-medium text-gray-700 mt-1">
                                    {maintenance.plannedDate}
                                </p>

                            </div>

                            {/* Description */}

                            <div className="mt-4">

                                <p className="text-xs text-gray-400">
                                    Description
                                </p>

                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {maintenance.description}
                                </p>

                            </div>

                           {/* Actions */}
<div className="mt-auto pt-5 space-y-2">

    <button
        onClick={() => {
            setSelectedMaintenance(maintenance);
            setEditMaintenance(true);
        }}
        className="w-full px-4 py-2.5 rounded-xl bg-[#E6F8F7] text-[#0F7C7C] font-medium hover:bg-[#D5F3F1] transition"
    >
        Modifier
    </button>

    <button
        onClick={() => deleteMaintenance(maintenance.id)}
        className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
    >
        Supprimer
    </button>

</div>

                        </div>

                    ))

                ) : (

                    <p className="text-gray-500">
                        Aucune maintenance trouvée.
                    </p>

                )}

            </div>

            {/* ================================================= */}
            {/* MODAL AJOUTER */}
            {/* ================================================= */}

            {addMaintenance && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Ajouter une maintenance
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                        Nouvelle opération de maintenance
                    </p>
                </div>

                <button
                    onClick={() => setAddMaintenance(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                    ✕
                </button>

            </div>

            {/* Form */}
            <div className="px-5 py-4 space-y-3">

                {/* Équipement */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Équipement
                    </label>

                    <select
                        value={newMaintenance.equipment_id}
                        onChange={(e) =>
                            setNewMaintenance({
                                ...newMaintenance,
                                equipment_id: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="">
                            Sélectionner un équipement
                        </option>

                        {equipments.map((equipment) => (
                            <option
                                key={equipment.id}
                                value={equipment.id}
                            >
                                {equipment.name} - {equipment.reference}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Type
                    </label>

                    <input
                        type="text"
                        value={newMaintenance.type}
                        onChange={(e) =>
                            setNewMaintenance({
                                ...newMaintenance,
                                type: e.target.value
                            })
                        }
                        placeholder="Ex: Préventive"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Date prévue
                    </label>

                    <input
                        type="date"
                        value={newMaintenance.plannedDate}
                        onChange={(e) =>
                            setNewMaintenance({
                                ...newMaintenance,
                                plannedDate: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Description
                    </label>

                    <textarea
                        value={newMaintenance.description}
                        onChange={(e) =>
                            setNewMaintenance({
                                ...newMaintenance,
                                description: e.target.value
                            })
                        }
                        placeholder="Description de la maintenance"
                        rows="2"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-2xl">

                <button
                    onClick={() => setAddMaintenance(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                    Annuler
                </button>

                <button
                    onClick={addNewMaintenance}
                    className="px-4 py-2 text-sm rounded-lg bg-[#13B8B0] text-white font-medium hover:bg-[#0fa49d]"
                >
                    Ajouter
                </button>

            </div>

        </div>
    </div>
)}    {/* ================================================= */}
            {/* MODAL MODIFIER */}
            {/* ================================================= */}

  {editMaintenance && selectedMaintenance && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Modifier la maintenance
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                        Modifier les informations
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditMaintenance(false);
                        setSelectedMaintenance(null);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                    ✕
                </button>

            </div>

            {/* Form */}
            <div className="px-5 py-4 space-y-3">

                {/* Équipement */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Équipement
                    </label>

                    <select
                        value={selectedMaintenance.equipment_id || ""}
                        onChange={(e) =>
                            setSelectedMaintenance({
                                ...selectedMaintenance,
                                equipment_id: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="">
                            Sélectionner un équipement
                        </option>

                        {equipments.map((equipment) => (
                            <option
                                key={equipment.id}
                                value={equipment.id}
                            >
                                {equipment.name} - {equipment.reference}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Type
                    </label>

                    <input
                        type="text"
                        value={selectedMaintenance.type || ""}
                        onChange={(e) =>
                            setSelectedMaintenance({
                                ...selectedMaintenance,
                                type: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Date prévue
                    </label>

                    <input
                        type="date"
                        value={
                            selectedMaintenance.plannedDate
                                ? selectedMaintenance.plannedDate.substring(0, 10)
                                : ""
                        }
                        onChange={(e) =>
                            setSelectedMaintenance({
                                ...selectedMaintenance,
                                plannedDate: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Statut
                    </label>

                    <select
                        value={selectedMaintenance.status || ""}
                        onChange={(e) =>
                            setSelectedMaintenance({
                                ...selectedMaintenance,
                                status: e.target.value
                            })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="planned">
                            Planifiée
                        </option>

                        <option value="in_progress">
                            En cours
                        </option>

                        <option value="terminee">
                            Terminée
                        </option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Description
                    </label>

                    <textarea
                        value={selectedMaintenance.description || ""}
                        onChange={(e) =>
                            setSelectedMaintenance({
                                ...selectedMaintenance,
                                description: e.target.value
                            })
                        }
                        rows="2"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-2xl">

                <button
                    onClick={() => {
                        setEditMaintenance(false);
                        setSelectedMaintenance(null);
                    }}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                    Annuler
                </button>

                <button
                    onClick={updateMaintenance}
                    className="px-4 py-2 text-sm rounded-lg bg-[#13B8B0] text-white font-medium hover:bg-[#0fa49d]"
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

export default Maintenance;