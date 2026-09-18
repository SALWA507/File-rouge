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
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    // Récupérer l'utilisateur connecté
    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    const role = user?.role;

    // Menu disponible selon le rôle
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
    ];

    // Filtrer les menus selon le rôle
    const visibleMenuItems = menuItems.filter((item) =>
        item.roles.includes(role)
    );

    // Déconnexion
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
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
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                item.path === "/dashboard"
                                    ? "bg-[#13B8B0] text-white"
                                    : "hover:bg-[#13B8B0] hover:text-white"
                            }`}
                        >
                            <Icon size={20} />

                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Déconnexion */}
            <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                >
                    <LogOut size={20} />

                    <span>Déconnexion</span>
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;
