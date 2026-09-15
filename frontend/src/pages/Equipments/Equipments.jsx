import { useEffect, useState } from "react";
import api from "../../api";

function Equipments() {

    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            <h1 className="text-3xl font-bold text-gray-800">
                Équipements
            </h1>

            <p className="mt-2 text-gray-500">
                Gestion des équipements biomédicaux
            </p>

            <div className="mt-8 space-y-4">

                {equipments.map((equipment) => (

                    <div
                        key={equipment.id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
                    >

                        <h2 className="text-lg font-semibold text-gray-800">
                            {equipment.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Référence : {equipment.reference}
                        </p>

                        <p className="text-sm text-gray-500">
                            Marque : {equipment.brand}
                        </p>

                        <p className="text-sm text-gray-500">
                            Modèle : {equipment.model}
                        </p>

                        <p className="text-sm text-gray-500">
                            Localisation : {equipment.location}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Equipments;