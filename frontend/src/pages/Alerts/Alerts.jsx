
import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import api from "../../api";

function Alerts() {
    // =========================
    // USER CONNECTÉ
    // =========================

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const role = user?.role;

    // =========================
    // STATES
    // =========================

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // GET ALERTS
    // =========================

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/alerts");

            setAlerts(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Erreur lors du chargement des alertes"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    // =========================
    // MARK AS READ
    // =========================

    const markAsRead = async (alert) => {
        try {
            await api.put(`/alerts/${alert.id}`, {
                isRead: true,
            });

            setAlerts((prevAlerts) =>
                prevAlerts.map((item) =>
                    item.id === alert.id
                        ? { ...item, isRead: true }
                        : item
                )
            );
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Erreur lors de la modification de l'alerte"
            );
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Chargement des alertes...
                </p>
            </div>
        );
    }

    // =========================
    // PAGE
    // =========================

    return (
        <div className="p-6">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#172033]">
                        Alertes
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {role === "admin"
                            ? "Gestion des alertes du système"
                            : "Vos notifications et alertes"}
                    </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-[#13B8B0]/10 flex items-center justify-center">
                    <Bell
                        size={22}
                        className="text-[#13B8B0]"
                    />
                </div>
            </div>

            {/* ERROR */}

            {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-600">
                    {error}
                </div>
            )}

            {/* EMPTY */}

            {alerts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                    <Bell
                        size={40}
                        className="mx-auto text-gray-300 mb-3"
                    />

                    <p className="text-gray-500">
                        Aucune alerte pour le moment.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">

                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`bg-white border rounded-xl p-5 ${
                                alert.isRead
                                    ? "border-gray-200"
                                    : "border-[#13B8B0]/40 bg-[#13B8B0]/5"
                            }`}
                        >

                            <div className="flex items-start justify-between gap-4">

                                {/* ALERT INFO */}

                                <div className="flex gap-4">

                                    <div className="w-10 h-10 rounded-full bg-[#13B8B0]/10 flex items-center justify-center flex-shrink-0">
                                        <Bell
                                            size={20}
                                            className="text-[#13B8B0]"
                                        />
                                    </div>

                                    <div>

                                        <div className="flex items-center gap-2 mb-1">

                                            <h2 className="font-semibold text-[#172033]">
                                                {alert.type}
                                            </h2>

                                            {!alert.isRead && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-[#13B8B0] text-white">
                                                    Nouveau
                                                </span>
                                            )}

                                        </div>

                                        <p className="text-gray-600">
                                            {alert.message}
                                        </p>

                                        {alert.equipment && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                Équipement :{" "}
                                                {alert.equipment.name}
                                            </p>
                                        )}

                                        {role === "admin" && alert.user && (
                                            <p className="text-sm text-gray-400 mt-1">
                                                Destinataire :{" "}
                                                {alert.user.name}
                                            </p>
                                        )}

                                    </div>
                                </div>

                                {/* MARK AS READ */}

                                {!alert.isRead && (
                                    <button
                                        onClick={() => markAsRead(alert)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#13B8B0] text-white hover:opacity-90 transition"
                                    >
                                        <Check size={17} />
                                        <span className="hidden md:inline">
                                            Marquer comme lu
                                        </span>
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default Alerts;
