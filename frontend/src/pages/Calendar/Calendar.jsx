import { useEffect, useState } from "react";
import api from "../../api";

function Calendar() {

    // =========================
    // USER CONNECTÉ
    // =========================

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    // =========================
    // STATES
    // =========================

    const [maintenances, setMaintenances] = useState([]);

    const [currentDate, setCurrentDate] = useState(
        new Date()
    );

    const [selectedDate, setSelectedDate] = useState(
        new Date().getDate()
    );

    // =========================
    // GET MAINTENANCES
    // =========================

    useEffect(() => {

        api.get("/maintenances")
            .then((response) => {
                setMaintenances(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur :",
                    error.response?.data || error
                );
            });

    }, []);

    // =========================
    // DATE
    // =========================

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleDateString(
        "fr-FR",
        {
            month: "long",
            year: "numeric",
        }
    );

    // =========================
    // DAYS
    // =========================

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const startDay =
        firstDay === 0
            ? 6
            : firstDay - 1;

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        days.push(day);
    }

    // =========================
    // MAINTENANCE DU JOUR
    // =========================

    const getMaintenance = (day) => {

        return maintenances.find(
            (maintenance) => {

                const date = new Date(
                    maintenance.plannedDate
                );

                return (
                    date.getFullYear() === year &&
                    date.getMonth() === month &&
                    date.getDate() === day
                );
            }
        );
    };

    // =========================
    // MOIS PRECEDENT
    // =========================

    const previousMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month - 1,
                1
            )
        );

        setSelectedDate(1);
    };

    // =========================
    // MOIS SUIVANT
    // =========================

    const nextMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month + 1,
                1
            )
        );

        setSelectedDate(1);
    };

    return (

        <div className="min-h-screen bg-[#F8FAFC] p-8">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Calendrier
                </h1>

                <p className="text-gray-500 mt-1">
                    {role === "admin"
                        ? "Planning global des maintenances"
                        : "Planning de vos maintenances"}
                </p>

            </div>

            {/* CALENDAR */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                {/* MONTH */}

                <div className="flex items-center justify-between mb-6">

                    <button
                        onClick={previousMonth}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        ←
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                        {monthName}
                    </h2>

                    <button
                        onClick={nextMonth}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        →
                    </button>

                </div>

                {/* DAYS HEADER */}

                <div className="grid grid-cols-7 text-center mb-3">

                    {[
                        "Lun",
                        "Mar",
                        "Mer",
                        "Jeu",
                        "Ven",
                        "Sam",
                        "Dim",
                    ].map((day) => (

                        <div
                            key={day}
                            className="font-semibold text-gray-500 py-2"
                        >
                            {day}
                        </div>

                    ))}

                </div>

                {/* DAYS */}

                <div className="grid grid-cols-7 gap-2">

                    {days.map((day, index) => {

                        if (!day) {

                            return (
                                <div
                                    key={index}
                                    className="h-20"
                                />
                            );

                        }

                        const maintenance =
                            getMaintenance(day);

                        const selected =
                            day === selectedDate;

                        return (

                            <button
                                key={day}
                                onClick={() =>
                                    setSelectedDate(day)
                                }
                                className={`
                                    h-20 rounded-xl border text-left p-3
                                    ${
                                        selected
                                            ? "bg-[#0F7C7C] text-white border-[#0F7C7C]"
                                            : "bg-white border-gray-100 hover:bg-[#E6F8F7]"
                                    }
                                `}
                            >

                                <div className="font-semibold">
                                    {day}
                                </div>

                                {maintenance && (

                                    <div className="text-xs mt-2 truncate">

                                        🔧{" "}
                                        {maintenance.equipment?.name}

                                    </div>

                                )}

                            </button>

                        );

                    })}

                </div>

            </div>

            {/* MAINTENANCE DU JOUR */}

            <div className="mt-6">

                <h2 className="text-xl font-bold text-gray-800 mb-4">

                    {selectedDate}{" "}

                    {new Date(
                        year,
                        month,
                        selectedDate
                    ).toLocaleDateString(
                        "fr-FR",
                        {
                            month: "long",
                        }
                    )}

                </h2>

                {(() => {

                    const maintenance =
                        getMaintenance(
                            selectedDate
                        );

                    if (!maintenance) {

                        return (

                            <div className="bg-white rounded-xl border p-5 text-gray-500">

                                Aucune maintenance ce jour.

                            </div>

                        );

                    }

                    return (

                        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">

                            <p className="font-semibold text-gray-800">

                                🔧{" "}
                                {maintenance.type}

                            </p>

                            <p className="text-gray-500 mt-2">

                                Équipement :{" "}

                                {maintenance.equipment?.name ||
                                    "Non défini"}

                            </p>

                            <p className="text-gray-500 mt-1">

                                Statut :{" "}
                                {maintenance.status}

                            </p>

                            {maintenance.description && (

                                <p className="text-gray-500 mt-2">

                                    {maintenance.description}

                                </p>

                            )}

                        </div>

                    );

                })()}

            </div>

        </div>

    );
}

export default Calendar;