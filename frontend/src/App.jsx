import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing/Landing";

import Dashboard from "./pages/Dashboard/Dashboard";
import Equipments from "./pages/Equipments/Equipments";
import Maintenance from "./pages/Maintenance/Maintenance";
import Interventions from "./pages/Interventions/Interventions";
import Demandes from "./pages/Demandes/Demandes";
import Calendar from "./pages/Calendar/Calendar";
import Rapports from "./pages/Rapports/Rapports";
import Users from "./pages/Users/Users";
import Alerts from "./pages/Alerts/Alerts";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    LANDING PAGE
                ========================= */}

                <Route
                    path="/"
                    element={<Landing />}
                />

                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* =========================
                    PAGES AVEC SIDEBAR
                ========================= */}

                <Route element={<Layout />}>

                    {/* DASHBOARD */}

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                    "personnel",
                                ]}
                            >
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* ÉQUIPEMENTS */}

                    <Route
                        path="/equipments"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                    "personnel",
                                ]}
                            >
                                <Equipments />
                            </ProtectedRoute>
                        }
                    />

                    {/* MAINTENANCE */}

                    <Route
                        path="/maintenance"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                ]}
                            >
                                <Maintenance />
                            </ProtectedRoute>
                        }
                    />

                    {/* INTERVENTIONS */}

                    <Route
                        path="/interventions"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                ]}
                            >
                                <Interventions />
                            </ProtectedRoute>
                        }
                    />

                    {/* DEMANDES */}

                    <Route
                        path="/demandes"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                    "personnel",
                                ]}
                            >
                                <Demandes />
                            </ProtectedRoute>
                        }
                    />

                    {/* ALERTES */}

                    <Route
                        path="/alerts"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                    "personnel",
                                ]}
                            >
                                <Alerts />
                            </ProtectedRoute>
                        }
                    />

                    {/* CALENDRIER */}

                    <Route
                        path="/calendrier"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                ]}
                            >
                                <Calendar />
                            </ProtectedRoute>
                        }
                    />

                    {/* RAPPORTS */}

                    <Route
                        path="/rapports"
                        element={
                            <ProtectedRoute
                                roles={["admin"]}
                            >
                                <Rapports />
                            </ProtectedRoute>
                        }
                    />

                    {/* UTILISATEURS */}

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute
                                roles={["admin"]}
                            >
                                <Users />
                            </ProtectedRoute>
                        }
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;