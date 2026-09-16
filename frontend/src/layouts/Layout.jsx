import Sidebar from "../pages/Dashboard/Sidebar";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}

export default Layout;