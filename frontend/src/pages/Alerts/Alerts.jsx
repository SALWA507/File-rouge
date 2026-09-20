import { useEffect, useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
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
    const markAsRead = async (alertItem) => {
        try {
            await api.put(`/alerts/${alertItem.id}`, {
                isRead: true,
            });

            setAlerts((prevAlerts) =>
                prevAlerts.map((item) =>
                    item.id === alertItem.id
                        ? { ...item, isRead: true }
                        : item
                )
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Erreur lors de la modification de l'alerte"
            );
        }
    };

    // =========================
    // DELETE ALERT
    // ADMIN SEULEMENT
    // =========================
    const deleteAlert = async (alertItem) => {
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer cette alerte ?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/alerts/${alertItem.id}`);

            setAlerts((prevAlerts) =>
                prevAlerts.filter(
                    (item) => item.id !== alertItem.id
                )
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Erreur lors de la suppression de l'alerte"
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
                    {alerts.map((alertItem) => (
                        <div
                            key={alertItem.id}
                            className={`bg-white border rounded-xl p-5 ${
                                alertItem.isRead
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
                                                {alertItem.type}
                                            </h2>

                                            {!alertItem.isRead && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-[#13B8B0] text-white">
                                                    Nouveau
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600">
                                            {alertItem.message}
                                        </p>

                                        {alertItem.equipment && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                Équipement :{" "}
                                                {alertItem.equipment.name}
                                            </p>
                                        )}

                                        {role === "admin" &&
                                            alertItem.user && (
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Destinataire :{" "}
                                                    {alertItem.user.name}
                                                </p>
                                            )}
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-2 flex-shrink-0">

                                    {/* MARQUER COMME LU */}
                                    {!alertItem.isRead && (
                                        <button
                                            onClick={() =>
                                                markAsRead(alertItem)
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#13B8B0] text-white hover:opacity-90 transition"
                                            title="Marquer comme lu"
                                        >
                                            <Check size={17} />

                                            <span className="hidden md:inline">
                                                Marquer comme lu
                                            </span>
                                        </button>
                                    )}

                                    {/* SUPPRIMER - ADMIN SEULEMENT */}
                                    {role === "admin" && (
                                        <button
                                            onClick={() =>
                                                deleteAlert(alertItem)
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={17} />

                                            <span className="hidden md:inline">
                                                Supprimer
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Alerts;