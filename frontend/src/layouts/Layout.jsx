import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";

function Layout() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="ml-64 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
