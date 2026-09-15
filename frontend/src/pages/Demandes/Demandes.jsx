import { useEffect, useState } from "react";
import api from "../../api";

function Demandes() {

    // =========================
    // USER CONNECTÉ
    // =========================

    const user = JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    // =========================
    // STATES
    // =========================

    const [demands, setDemands] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [loading, setLoading] = useState(true);

    const [addDemand, setAddDemand] = useState(false);
    const [editDemand, setEditDemand] = useState(false);

    const [selectedDemand, setSelectedDemand] = useState(null);

    const [newDemand, setNewDemand] = useState({
        equipment_id: "",
        title: "",
        description: "",
        priority: "normal",
    });

    // =========================
    // GET DEMANDS
    // =========================

    useEffect(() => {

        api.get("/demands")
            .then((response) => {

                setDemands(response.data);

            })
            .catch((error) => {

                console.error(
                    "Erreur demandes :",
                    error.response?.data
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);

    // =========================
    // GET EQUIPMENTS
    // =========================

    useEffect(() => {

        api.get("/equipment")
            .then((response) => {

                setEquipments(response.data);

            })
            .catch((error) => {

                console.error(
                    "Erreur équipements :",
                    error.response?.data
                );

            });

    }, []);

    // =========================
    // GET TECHNICIENS
    // UNIQUEMENT ADMIN
    // =========================

    useEffect(() => {

        if (role !== "admin") {
            return;
        }

        api.get("/users")
            .then((response) => {

                const techniciansOnly =
                    response.data.filter(
                        (user) =>
                            user.role === "technicien"
                    );

                setTechnicians(techniciansOnly);

            })
            .catch((error) => {

                console.error(
                    "Erreur techniciens :",
                    error.response?.data
                );

            });

    }, [role]);

    // =========================
    // AJOUTER UNE DEMANDE
    // PERSONNEL UNIQUEMENT
    // =========================

    const addNewDemand = async () => {

        if (
            !newDemand.equipment_id ||
            !newDemand.title ||
            !newDemand.description
        ) {

            alert(
                "Veuillez remplir les champs obligatoires."
            );

            return;
        }

        try {

            const response = await api.post(
                "/demands",
                newDemand
            );

            const demand =
                response.data.demand ||
                response.data;

            setDemands([
                ...demands,
                demand
            ]);

            setAddDemand(false);

            setNewDemand({
                equipment_id: "",
                title: "",
                description: "",
                priority: "normal",
            });

        } catch (error) {

            console.error(
                "Erreur ajout demande :",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Erreur lors de l'ajout."
            );
        }
    };

    // =========================
    // MODIFIER
    // ADMIN UNIQUEMENT
    // =========================

    const updateDemand = async () => {

        try {

            const data = {
                equipment_id:
                    selectedDemand.equipment_id,

                technician_id:
                    selectedDemand.technician_id || null,

                title:
                    selectedDemand.title,

                description:
                    selectedDemand.description,

                priority:
                    selectedDemand.priority,

                status:
                    selectedDemand.status,
            };

            const response = await api.put(
                `/demands/${selectedDemand.id}`,
                data
            );

            const updatedDemand =
                response.data.demand ||
                response.data;

            setDemands(
                demands.map((demand) =>
                    demand.id === selectedDemand.id
                        ? updatedDemand
                        : demand
                )
            );

            setEditDemand(false);
            setSelectedDemand(null);

        } catch (error) {

            console.error(
                "Erreur modification :",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Erreur lors de la modification."
            );
        }
    };

    // =========================
    // SUPPRIMER
    // ADMIN UNIQUEMENT
    // =========================

    const deleteDemand = async (id) => {

        const confirmation =
            window.confirm(
                "Êtes-vous sûre de vouloir supprimer cette demande ?"
            );

        if (!confirmation) {
            return;
        }

        try {

            await api.delete(
                `/demands/${id}`
            );

            setDemands(
                demands.filter(
                    (demand) =>
                        demand.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Erreur suppression :",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Erreur lors de la suppression."
            );
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">

                <p className="text-gray-500">
                    Chargement des demandes...
                </p>

            </div>
        );
    }

    // =========================
    // PAGE
    // =========================

    return (

        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* =========================
                HEADER
            ========================= */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Demandes
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestion des demandes de maintenance
                    </p>

                </div>

                {/* AJOUTER
                    PERSONNEL UNIQUEMENT
                */}

                {role === "personnel" && (

                    <button
                        onClick={() =>
                            setAddDemand(true)
                        }
                        className="px-5 py-3 bg-[#13B8B0] text-white rounded-lg font-medium hover:bg-[#0fa49d]"
                    >
                        + Ajouter une demande
                    </button>

                )}

            </div>

            {/* =========================
                LISTE
            ========================= */}

            {demands.length === 0 ? (

                <div className="bg-white rounded-2xl p-8 text-center border">

                    <p className="text-gray-500">
                        Aucune demande trouvée
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {demands.map((demand) => (

                        <div
                            key={demand.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col h-full"
                        >

                            {/* ICON */}

                            <div className="w-12 h-12 rounded-xl bg-[#E6F8F7] flex items-center justify-center mb-5">

                                <span className="text-2xl">
                                    📋
                                </span>

                            </div>

                            {/* TITLE */}

                            <h2 className="text-lg font-semibold text-gray-800">

                                {demand.title}

                            </h2>

                            {/* PRIORITY */}

                            <div className="mt-3">

                                <span className="px-3 py-1 rounded-full text-sm bg-orange-50 text-orange-600">

                                    Priorité :{" "}

                                    {demand.priority}

                                </span>

                            </div>

                            {/* STATUS */}

                            <div className="mt-3">

                                <span className="px-3 py-1 rounded-full text-sm bg-[#E6F8F7] text-[#0F7C7C]">

                                    {demand.status}

                                </span>

                            </div>

                            {/* EQUIPMENT */}

                            <p className="text-gray-500 text-sm mt-4">

                                Équipement :{" "}

                                {demand.equipment?.name ||
                                    "Non défini"}

                            </p>

                            {/* TECHNICIEN */}

                            <p className="text-gray-500 text-sm mt-2">

                                Technicien :{" "}

                                {demand.technician?.name ||
                                    "Non assigné"}

                            </p>

                            {/* DESCRIPTION */}

                            <p className="text-gray-500 text-sm mt-3">

                                {demand.description}

                            </p>

                            {/* BUTTONS */}

                            <div className="mt-auto pt-5 space-y-2">

                                {/* MODIFIER
                                    ADMIN UNIQUEMENT
                                */}

                                {role === "admin" && (

                                    <button
                                        onClick={() => {

                                            setSelectedDemand(
                                                demand
                                            );

                                            setEditDemand(
                                                true
                                            );

                                        }}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#E6F8F7] text-[#0F7C7C] font-medium hover:bg-[#D5F3F1]"
                                    >
                                        Modifier
                                    </button>

                                )}

                                {/* SUPPRIMER
                                    ADMIN UNIQUEMENT
                                */}

                                {role === "admin" && (

                                    <button
                                        onClick={() =>
                                            deleteDemand(
                                                demand.id
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100"
                                    >
                                        Supprimer
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* =========================
                MODAL AJOUT
                PERSONNEL
            ========================= */}

            {addDemand && role === "personnel" && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl w-full max-w-md">

                        <div className="px-6 py-5 border-b">

                            <h2 className="text-xl font-semibold">
                                Ajouter une demande
                            </h2>

                        </div>

                        <div className="p-6 space-y-4">

                            {/* EQUIPMENT */}

                            <select
                                value={
                                    newDemand.equipment_id
                                }
                                onChange={(e) =>
                                    setNewDemand({
                                        ...newDemand,
                                        equipment_id:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >

                                <option value="">
                                    Sélectionner un équipement
                                </option>

                                {equipments.map(
                                    (equipment) => (

                                        <option
                                            key={
                                                equipment.id
                                            }
                                            value={
                                                equipment.id
                                            }
                                        >
                                            {
                                                equipment.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                            {/* TITLE */}

                            <input
                                type="text"
                                value={
                                    newDemand.title
                                }
                                onChange={(e) =>
                                    setNewDemand({
                                        ...newDemand,
                                        title:
                                            e.target.value,
                                    })
                                }
                                placeholder="Titre de la demande"
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {/* PRIORITY */}

                            <select
                                value={
                                    newDemand.priority
                                }
                                onChange={(e) =>
                                    setNewDemand({
                                        ...newDemand,
                                        priority:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >

                                <option value="low">
                                    Faible
                                </option>

                                <option value="normal">
                                    Normale
                                </option>

                                <option value="high">
                                    Haute
                                </option>

                                <option value="urgent">
                                    Urgente
                                </option>

                            </select>

                            {/* DESCRIPTION */}

                            <textarea
                                rows="4"
                                value={
                                    newDemand.description
                                }
                                onChange={(e) =>
                                    setNewDemand({
                                        ...newDemand,
                                        description:
                                            e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="w-full border rounded-lg px-3 py-2"
                            />

                        </div>

                        <div className="flex justify-end gap-3 px-6 py-4 border-t">

                            <button
                                onClick={() =>
                                    setAddDemand(false)
                                }
                                className="px-4 py-2 border rounded-lg"
                            >
                                Annuler
                            </button>

                            <button
                                onClick={
                                    addNewDemand
                                }
                                className="px-4 py-2 bg-[#13B8B0] text-white rounded-lg"
                            >
                                Ajouter
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* =========================
                MODAL MODIFICATION
                ADMIN
            ========================= */}

            {editDemand &&
                selectedDemand &&
                role === "admin" && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                        <div className="bg-white rounded-2xl w-full max-w-md">

                            <div className="px-6 py-5 border-b">

                                <h2 className="text-xl font-semibold">
                                    Modifier la demande
                                </h2>

                            </div>

                            <div className="p-6 space-y-4">

                                {/* EQUIPMENT */}

                                <select
                                    value={
                                        selectedDemand.equipment_id
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            equipment_id:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >

                                    {equipments.map(
                                        (equipment) => (

                                            <option
                                                key={
                                                    equipment.id
                                                }
                                                value={
                                                    equipment.id
                                                }
                                            >
                                                {
                                                    equipment.name
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                                {/* TECHNICIEN */}

                                <select
                                    value={
                                        selectedDemand.technician_id ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            technician_id:
                                                e.target.value ||
                                                null,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >

                                    <option value="">
                                        Non assigné
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

                                {/* TITLE */}

                                <input
                                    type="text"
                                    value={
                                        selectedDemand.title
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            title:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                                {/* PRIORITY */}

                                <select
                                    value={
                                        selectedDemand.priority
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            priority:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >

                                    <option value="low">
                                        Faible
                                    </option>

                                    <option value="normal">
                                        Normale
                                    </option>

                                    <option value="high">
                                        Haute
                                    </option>

                                    <option value="urgent">
                                        Urgente
                                    </option>

                                </select>

                                {/* STATUS */}

                                <select
                                    value={
                                        selectedDemand.status
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            status:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >

                                    <option value="pending">
                                        En attente
                                    </option>

                                    <option value="assigned">
                                        Assignée
                                    </option>

                                    <option value="in_progress">
                                        En cours
                                    </option>

                                    <option value="resolved">
                                        Résolue
                                    </option>

                                    <option value="rejected">
                                        Rejetée
                                    </option>

                                </select>

                                {/* DESCRIPTION */}

                                <textarea
                                    rows="4"
                                    value={
                                        selectedDemand.description
                                    }
                                    onChange={(e) =>
                                        setSelectedDemand({
                                            ...selectedDemand,
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                            <div className="flex justify-end gap-3 px-6 py-4 border-t">

                                <button
                                    onClick={() => {

                                        setEditDemand(false);

                                        setSelectedDemand(
                                            null
                                        );

                                    }}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Annuler
                                </button>

                                <button
                                    onClick={
                                        updateDemand
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

export default Demandes;