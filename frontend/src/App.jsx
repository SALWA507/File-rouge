import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Equipments from "./pages/Equipments/Equipments";
import Maintenance from "./pages/Maintenance/Maintenance";
import Interventions from "./pages/Interventions/Interventions";
import Alerts from "./pages/Demandes/Demandes";
import Demandes from "./pages/Demandes/Demandes";
import Calendar from "./pages/Calendar/Calendar";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/equipments" element={<Equipments />} /> 
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/interventions" element={<Interventions />} />
                <Route path="/Intervention" element={<Interventions />} />
                <Route path="/demandes" element={<Demandes />} />
                <Route path="/calendrier" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;