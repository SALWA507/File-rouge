import { useEffect, useState } from "react";
import api from "../../api";

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
        <div>
            <h1>Dashboard</h1>

            <p>Bienvenue sur BioMaintenix</p>

            <div>
                <h2>Équipements</h2>
                <p>{data?.equipment}</p>
            </div>

            <div>
                <h2>Maintenances</h2>
                <p>{data?.maintenances}</p>
            </div>

            <div>
                <h2>Interventions</h2>
                <p>{data?.interventions}</p>
            </div>

            <div>
                <h2>Alertes</h2>
                <p>{data?.alerts}</p>
            </div>

            <div>
                <h2>Alertes non lues</h2>
                <p>{data?.unread_alerts}</p>
            </div>
        </div>
    );
}

export default Dashboard;