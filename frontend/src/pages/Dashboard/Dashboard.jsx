import { useEffect, useState } from "react";

import api from "../../api";

import Sidebar from "./Sidebar";

import {
    Monitor,
    Wrench,
    ClipboardList,
    Bell,
} from "lucide-react";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/dashboard")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Erreur Dashboard :", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">

            <Sidebar />

            <main className="flex-1 min-h-screen bg-[#F8FAFC] p-8 text-gray-800">

                <h1 className="text-3xl font-bold text-gray-800">
                    Tableau de bord
                </h1>

                <p className="mt-2 text-gray-500">
                    Bienvenue sur BioMaintenix. Voici l'état de vos dispositifs.
                </p>

                {/* KPI Cards */}
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
</h2>  </div>

                            <div className="w-12 h-12 rounded-lg bg-[#E6F8F7] flex items-center justify-center">
                                <Monitor
                                    size={24}
                                    className="text-[#13B8B0]"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Maintenances */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                                {/* Interventions en cours */}
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

                    {/* Interventions */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                               
{/* Interventions terminées */}
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

                    {/* Alertes */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">

                            <div>
                               {/* Équipements opérationnels */}
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

            </main>

        </div>
    );
}

export default Dashboard;