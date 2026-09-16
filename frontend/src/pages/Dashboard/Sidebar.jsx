import {
    LayoutDashboard,
    Monitor,
    Wrench,
    ClipboardList,
    Bell,
    FileText,
    Users,
    Settings,
    CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white text-gray-800 p-5 border-r border-gray-200">

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
            <nav className="space-y-2">

                {/* Dashboard */}
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#13B8B0] text-white"
                >
                    <LayoutDashboard size={20} />
                    <span>Tableau de bord</span>
                </Link>

                {/* Équipements */}
                <Link
                    to="/equipments"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <Monitor size={20} />
                    <span>Équipements</span>
                </Link>

                {/* Maintenance */}
                <Link
                    to="/maintenance"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <Wrench size={20} />
                    <span>Maintenance</span>
                </Link>

                {/* Interventions */}
                <Link
                    to="/interventions"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <ClipboardList size={20} />
                    <span>Interventions</span>
                </Link>

                {/* Demandes */}
                <Link
                    to="/demandes"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <Bell size={20} />
                    <span>Demandes</span>
                </Link>

                {/* Calendrier */}
                <Link
                    to="/calendrier"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <CalendarDays size={20} />
                    <span>Calendrier</span>
                </Link>

                {/* Rapports */}
                <Link
                    to="/rapports"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <FileText size={20} />
                    <span>Rapports</span>
                </Link>

                {/* Utilisateurs */}
                <Link
                    to="/users"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13B8B0] hover:text-white"
                >
                    <Users size={20} />
                    <span>Utilisateurs</span>
                </Link>

                
            </nav>

        </aside>
    );
}

export default Sidebar;