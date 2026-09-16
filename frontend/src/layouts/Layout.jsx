import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";

function Layout() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;