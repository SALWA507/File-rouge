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
import Profile from "./pages/Profile/Profile";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<Layout />}>

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

                    <Route
                        path="/rapports"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <Rapports />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                roles={[
                                    "admin",
                                    "technicien",
                                    "personnel",
                                ]}
                            >
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;