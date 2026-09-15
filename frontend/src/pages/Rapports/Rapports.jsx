import { useEffect, useState } from "react";
import api from "../../api";

function Rapports() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/dashboard")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Erreur rapports :", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8">
                <p className="text-gray-500">
                    Chargement des rapports...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rapports
                </h1>

                <p className="text-gray-500 mt-1">
                    Vue globale de l'activité de BioMaintenix
                </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Équipements */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="text-3xl mb-4">🏥</div>

                    <p className="text-gray-500">
                        Équipements
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {data?.equipment ?? 0}
                    </p>
                </div>

                {/* Interventions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="text-3xl mb-4">🔧</div>

                    <p className="text-gray-500">
                        Interventions
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {data?.recent_interventions?.length ?? 0}
                    </p>
                </div>

                {/* Maintenances */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="text-3xl mb-4">🛠️</div>

                    <p className="text-gray-500">
                        Maintenances
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {data?.upcoming_maintenances?.length ?? 0}
                    </p>
                </div>

                {/* Alertes */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="text-3xl mb-4">⚠️</div>

                    <p className="text-gray-500">
                        Alertes
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {data?.alerts ?? 0}
                    </p>
                </div>

            </div>

            

        </div>
    );
}

export default Rapports;