import {
    LayoutDashboard,
    Monitor,
    Wrench,
    ClipboardList,
    Bell,
    FileText,
    Users,
    CalendarDays,
    LogOut,
    User,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

function Sidebar() {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    const role = user?.role;

    const [unreadAlerts, setUnreadAlerts] = useState(0);

    const fetchUnreadAlerts = async () => {
        try {
            const response = await api.get("/alerts");

            const unread = response.data.filter(
                (alert) => alert.isRead === false
            ).length;

            setUnreadAlerts(unread);
        } catch (error) {
            console.error(
                "Erreur lors du chargement des alertes :",
                error
            );
        }
    };

    useEffect(() => {
        fetchUnreadAlerts();

        const handleAlertsUpdated = () => {
            fetchUnreadAlerts();
        };

        window.addEventListener(
            "alertsUpdated",
            handleAlertsUpdated
        );

        return () => {
            window.removeEventListener(
                "alertsUpdated",
                handleAlertsUpdated
            );
        };
    }, []);

    const menuItems = [
        {
            label: "Tableau de bord",
            path: "/dashboard",
            icon: LayoutDashboard,
            roles: ["admin", "technicien", "personnel"],
        },

        {
            label: "Équipements",
            path: "/equipments",
            icon: Monitor,
            roles: ["admin", "technicien", "personnel"],
        },

        {
            label: "Maintenance",
            path: "/maintenance",
            icon: Wrench,
            roles: ["admin", "technicien"],
        },

        {
            label: "Interventions",
            path: "/interventions",
            icon: ClipboardList,
            roles: ["admin", "technicien"],
        },

        {
            label: "Demandes",
            path: "/demandes",
            icon: Bell,
            roles: ["admin", "technicien", "personnel"],
        },

        {
            label: "Alertes",
            path: "/alerts",
            icon: Bell,
            roles: ["admin", "technicien", "personnel"],
        },

        {
            label: "Calendrier",
            path: "/calendrier",
            icon: CalendarDays,
            roles: ["admin", "technicien"],
        },

        {
            label: "Rapports",
            path: "/rapports",
            icon: FileText,
            roles: ["admin"],
        },

        {
            label: "Utilisateurs",
            path: "/users",
            icon: Users,
            roles: ["admin"],
        },

        {
            label: "Mon Profil",
            path: "/profile",
            icon: User,
            roles: ["admin", "technicien", "personnel"],
        },
    ];

    const visibleMenuItems = menuItems.filter((item) =>
        item.roles.includes(role)
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <aside className="fixed left-0 top-0 z-40 w-64 h-screen bg-white text-gray-800 p-5 border-r border-gray-200 flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Monitor
                        size={22}
                        className="text-[#13B8B0]"
                    />
                </div>

                <h1 className="text-xl font-bold text-[#172033]">
                    BioMaintenix
                </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1 overflow-y-auto">

                {visibleMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? "bg-[#13B8B0] text-white"
                                        : "text-gray-700 hover:bg-[#13B8B0] hover:text-white"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span className="flex-1">
                                {item.label}
                            </span>

                            {item.path === "/alerts" &&
                                unreadAlerts > 0 && (
                                    <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                        {unreadAlerts}
                                    </span>
                                )}
                        </NavLink>
                    );
                })}

            </nav>

            {/* Logout */}
            <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                >
                    <LogOut size={20} />

                    <span>
                        Déconnexion
                    </span>
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;