import { useEffect, useState } from "react";
import api from "../../api";
import { Monitor } from "lucide-react";

function Equipments() {

    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search
const [search, setSearch] = useState("");
const [selectedEquipment, setSelectedEquipment] = useState(null);
const [editEquipment, setEditEquipment] = useState(null);
const [addEquipment, setAddEquipment] = useState(false);
const [newEquipment, setNewEquipment] = useState({
    name: "",
    reference: "",
    brand: "",
    model: "",
    serialNumber: "",
    location: "",
    status: "operationnel",
});
    useEffect(() => {

        api.get("/equipment")

            .then((response) => {

                setEquipments(response.data);

            })

            .catch((error) => {

                console.error("Erreur équipements :", error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    // Filtrer les équipements
    const filteredEquipments = equipments.filter((equipment) =>
        equipment.name.toLowerCase().includes(search.toLowerCase())
    );
    const updateEquipment = async () => {

    try {

        const response = await api.put(
            `/equipment/${editEquipment.id}`,
            editEquipment
        );

        setEquipments(
            equipments.map((equipment) =>
                equipment.id === editEquipment.id
                    ? response.data.equipment
                    : equipment
            )
        );

        setEditEquipment(null);

    } catch (error) {

        console.error("Erreur modification :", error);

    }
};
const addNewEquipment = async () => {
    try {
        const response = await api.post(
            "/equipment",
            newEquipment
        );

        setEquipments([
            ...equipments,
            response.data.equipment
        ]);

        setAddEquipment(false);

        setNewEquipment({
            name: "",
            reference: "",
            brand: "",
            model: "",
            serialNumber: "",
            location: "",
            status: "operationnel",
        });

    } catch (error) {
        console.error("Erreur ajout équipement :", error);
    }
};
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

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Équipements
                </h1>

                <p className="mt-2 text-gray-500">
                    Gestion des équipements biomédicaux
                </p>

                {/* Search */}
                <div className="flex flex-col md:flex-row gap-3 mt-6">

    <input
        type="text"
        placeholder="Rechercher un équipement..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:max-w-md p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
    />

    <button
        onClick={() => setAddEquipment(true)}
        className="px-5 py-3 bg-[#13B8B0] text-white rounded-lg font-medium hover:bg-[#0fa49d]"
    >
        + Ajouter un équipement
    </button>

</div>

            </div>

            {/* Equipment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredEquipments.length > 0 ? (

                    filteredEquipments.map((equipment) => (

                        <div
                            key={equipment.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                        >

                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-4">

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-[#E6F8F7] flex items-center justify-center">

                                        <Monitor
                                            size={24}
                                            className="text-[#13B8B0]"
                                        />

                                    </div>

                                    {/* Name + Reference */}
                                    <div>

                                        <h2 className="text-lg font-bold text-gray-800">
                                            {equipment.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {equipment.reference}
                                        </p>

                                    </div>

                                </div>

                                {/* Status */}
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                                        ${
                                            equipment.status === "operationnel"
                                                ? "bg-green-100 text-green-700"
                                                : equipment.status === "maintenance"
                                                ? "bg-blue-100 text-blue-700"
                                                : equipment.status === "hors_service"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-gray-100 text-gray-600"
                                        }
                                    `}
                                >
                                    {equipment.status === "operationnel"
                                        ? "Opérationnel"
                                        : equipment.status === "maintenance"
                                        ? "En maintenance"
                                        : equipment.status === "hors_service"
                                        ? "Hors service"
                                        : equipment.status}
                                </span>

                            </div>

                            
                            
                            {/* Serial Number */}
                            <div className="mt-4">

                                <p className="text-xs text-gray-400">
                                    Numéro de série
                                </p>

                                <p className="text-sm font-medium text-gray-700 mt-1">
                                    {equipment.serialNumber}
                                </p>

                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">

                                <button
    onClick={() => setSelectedEquipment(equipment)}
    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#13B8B0] transition"
>
    Voir détails
</button>

                                <button
    onClick={() => setEditEquipment(equipment)}
    className="px-4 py-2 rounded-lg bg-[#13B8B0] text-white text-sm font-medium hover:bg-[#0fa49d] transition"
>
    Modifier
</button>
                            </div>

                        </div>

                    ))

                ) : (

                    <p className="text-gray-500">
                        Aucun équipement trouvé.
                    </p>

                )}

            </div>
            {/* Details Modal */}
{selectedEquipment && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                    Détails de l'équipement
                </h2>

                <button
                    onClick={() => setSelectedEquipment(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                >
                    ✕
                </button>

            </div>

            {/* Details */}
            <div className="space-y-4">

                <div>
                    <p className="text-sm text-gray-400">
                        Nom
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Référence
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.reference}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Marque
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.brand}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Modèle
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.model}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Numéro de série
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.serialNumber}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Localisation
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.location}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">
                        Statut
                    </p>
                    <p className="font-medium text-gray-800">
                        {selectedEquipment.status}
                    </p>
                </div>

            </div>

            {/* Close */}
            <button
                onClick={() => setSelectedEquipment(null)}
                className="w-full mt-6 py-3 rounded-lg bg-[#13B8B0] text-white font-medium hover:bg-[#0fa49d]"
            >
                Fermer
            </button>

        </div>

    </div>
)}
{/* Edit Modal */}
{editEquipment && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-gray-800">
                    Modifier l'équipement
                </h2>

                <button
                    onClick={() => setEditEquipment(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                >
                    ✕
                </button>

            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nom */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Nom
                    </label>

                    <input
                        type="text"
                        value={editEquipment.name}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                name: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Référence */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Référence
                    </label>

                    <input
                        type="text"
                        value={editEquipment.reference}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                reference: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Marque */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Marque
                    </label>

                    <input
                        type="text"
                        value={editEquipment.brand}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                brand: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Modèle */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Modèle
                    </label>

                    <input
                        type="text"
                        value={editEquipment.model}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                model: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Localisation */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Localisation
                    </label>

                    <input
                        type="text"
                        value={editEquipment.location}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                location: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>

                {/* Statut */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Statut
                    </label>

                    <select
                        value={editEquipment.status}
                        onChange={(e) =>
                            setEditEquipment({
                                ...editEquipment,
                                status: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="operationnel">
                            Opérationnel
                        </option>

                        <option value="maintenance">
                            En maintenance
                        </option>

                        <option value="hors_service">
                            Hors service
                        </option>
                    </select>
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">

                <button
                    onClick={() => setEditEquipment(null)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    Annuler
                </button>

                <button
    onClick={updateEquipment}
    className="px-4 py-2 rounded-lg bg-[#13B8B0] text-white text-sm font-medium hover:bg-[#0fa49d]"
>
    Enregistrer
</button>
            </div>

        </div>

    </div>
    
)}
{/* Add Equipment Modal */}
{addEquipment && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-gray-800">
                    Ajouter un équipement
                </h2>

                <button
                    onClick={() => setAddEquipment(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                >
                    ✕
                </button>

            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nom */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Nom
                    </label>

                    <input
                        type="text"
                        value={newEquipment.name}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                name: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: ECG"
                    />
                </div>

                {/* Référence */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Référence
                    </label>

                    <input
                        type="text"
                        value={newEquipment.reference}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                reference: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: ECG-002"
                    />
                </div>

                {/* Marque */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Marque
                    </label>

                    <input
                        type="text"
                        value={newEquipment.brand}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                brand: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: Philips"
                    />
                </div>

                {/* Modèle */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Modèle
                    </label>

                    <input
                        type="text"
                        value={newEquipment.model}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                model: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: PageWriter TC20"
                    />
                </div>

                {/* Numéro de série */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Numéro de série
                    </label>

                    <input
                        type="text"
                        value={newEquipment.serialNumber}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                serialNumber: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: SN-ECG-2026-002"
                    />
                </div>

                {/* Localisation */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Localisation
                    </label>

                    <input
                        type="text"
                        value={newEquipment.location}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                location: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                        placeholder="Ex: Service Cardiologie"
                    />
                </div>

                {/* Statut */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Statut
                    </label>

                    <select
                        value={newEquipment.status}
                        onChange={(e) =>
                            setNewEquipment({
                                ...newEquipment,
                                status: e.target.value
                            })
                        }
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    >
                        <option value="operationnel">
                            Opérationnel
                        </option>

                        <option value="maintenance">
                            En maintenance
                        </option>

                        <option value="hors_service">
                            Hors service
                        </option>
                    </select>
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">

                <button
                    onClick={() => setAddEquipment(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    Annuler
                </button>

                <button
                    onClick={addNewEquipment}
                    className="px-4 py-2 rounded-lg bg-[#13B8B0] text-white text-sm font-medium hover:bg-[#0fa49d]"
                >
                    Ajouter
                </button>

            </div>

        </div>

    </div>
)}

        </div>

    );
}

export default Equipments;