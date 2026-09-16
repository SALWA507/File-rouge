
import { useEffect, useState } from "react";

import {
    Search,
    Plus,
    Pencil,
    Trash2,
    X,
    Users as UsersIcon,
} from "lucide-react";

import api from "../../api";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "personnel",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get("/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erreur utilisateurs :", error);
            });
    };

    const openAddModal = () => {
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "personnel",
        });

        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);

        setFormData({
            name: user.name || "",
            email: user.email || "",
            password: "",
            password_confirmation: "",
            role: user.role || "personnel",
        });

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "personnel",
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier la confirmation du mot de passe
        if (
            !editingUser &&
            formData.password !== formData.password_confirmation
        ) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        // Pour la modification :
        // si un nouveau mot de passe est renseigné,
        // on vérifie également sa confirmation.
        if (
            editingUser &&
            formData.password &&
            formData.password !== formData.password_confirmation
        ) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const data = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };

        // Création
        if (!editingUser) {
            data.password = formData.password;
            data.password_confirmation =
                formData.password_confirmation;
        }

        // Modification
        if (editingUser && formData.password) {
            data.password = formData.password;
        }

        if (editingUser) {
            api.put(`/users/${editingUser.id}`, data)
                .then(() => {
                    fetchUsers();
                    closeModal();
                })
                .catch((error) => {
                    console.error(
                        "Erreur modification utilisateur :",
                        error
                    );

                    console.error(
                        "Réponse API :",
                        error.response?.data
                    );

                    alert(
                        error.response?.data?.message ||
                            "Erreur lors de la modification de l'utilisateur."
                    );
                });
        } else {
            api.post("/users", data)
                .then(() => {
                    fetchUsers();
                    closeModal();
                })
                .catch((error) => {
                    console.error(
                        "Erreur création utilisateur :",
                        error
                    );

                    console.error(
                        "Réponse API :",
                        error.response?.data
                    );

                    alert(
                        error.response?.data?.message ||
                            "Erreur lors de la création de l'utilisateur."
                    );
                });
        }
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer cet utilisateur ?"
        );

        if (!confirmed) {
            return;
        }

        api.delete(`/users/${id}`)
            .then(() => {
                fetchUsers();
            })
            .catch((error) => {
                console.error(
                    "Erreur suppression utilisateur :",
                    error
                );

                alert(
                    error.response?.data?.message ||
                        "Erreur lors de la suppression de l'utilisateur."
                );
            });
    };

    const filteredUsers = users.filter((user) => {
        const value = search.toLowerCase();

        return (
            user.name?.toLowerCase().includes(value) ||
            user.email?.toLowerCase().includes(value) ||
            user.role?.toLowerCase().includes(value)
        );
    });

    const getRoleLabel = (role) => {
        switch (role) {
            case "admin":
                return "Administrateur";

            case "technicien":
                return "Technicien";

            case "personnel":
                return "Personnel";

            default:
                return role || "-";
        }
    };

    const getRoleStyle = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-50 text-purple-700";

            case "technicien":
                return "bg-[#E6F8F7] text-[#0F7C7C]";

            case "personnel":
                return "bg-blue-50 text-blue-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Utilisateurs
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestion des utilisateurs et de leurs rôles
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-[#13B8B0] hover:bg-[#0F9E98] text-white px-5 py-3 rounded-xl font-medium transition"
                >
                    <Plus size={20} />
                    Ajouter un utilisateur
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Rechercher par nom, email ou rôle..."
                        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                    />
                </div>
            </div>

            {/* Users table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E6F8F7] flex items-center justify-center">
                            <UsersIcon
                                size={21}
                                className="text-[#0F7C7C]"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Liste des utilisateurs
                            </h2>

                            <p className="text-sm text-gray-500">
                                {filteredUsers.length} utilisateur(s)
                            </p>
                        </div>
                    </div>
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                        <UsersIcon
                            size={42}
                            className="mx-auto text-gray-300 mb-4"
                        />

                        <h3 className="text-lg font-semibold text-gray-700">
                            Aucun utilisateur trouvé
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Aucun utilisateur ne correspond à votre recherche.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Nom
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Email
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Rôle
                                    </th>

                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#E6F8F7] flex items-center justify-center text-[#0F7C7C] font-semibold">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        ID #{user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleStyle(
                                                    user.role
                                                )}`}
                                            >
                                                {getRoleLabel(
                                                    user.role
                                                )}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(
                                                            user
                                                        )
                                                    }
                                                    className="p-2 rounded-lg text-gray-500 hover:text-[#0F7C7C] hover:bg-[#E6F8F7] transition"
                                                    title="Modifier"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            user.id
                                                        )
                                                    }
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {editingUser
                                        ? "Modifier l'utilisateur"
                                        : "Ajouter un utilisateur"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {editingUser
                                        ? "Modifier les informations de l'utilisateur."
                                        : "Créer un nouveau compte utilisateur."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-5"
                        >
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom complet
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex : Salwa Amzane"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex : user@example.com"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editingUser
                                        ? "Nouveau mot de passe (optionnel)"
                                        : "Mot de passe"}
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!editingUser}
                                    placeholder={
                                        editingUser
                                            ? "Laisser vide pour conserver le mot de passe"
                                            : "••••••••"
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                />
                            </div>

                            {/* Password confirmation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editingUser
                                        ? "Confirmer le nouveau mot de passe"
                                        : "Confirmer le mot de passe"}
                                </label>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        formData.password_confirmation
                                    }
                                    onChange={handleChange}
                                    required={!editingUser}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rôle
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                >
                                    <option value="admin">
                                        Administrateur
                                    </option>

                                    <option value="technicien">
                                        Technicien
                                    </option>

                                    <option value="personnel">
                                        Personnel
                                    </option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-3 rounded-xl bg-[#13B8B0] hover:bg-[#0F9E98] text-white font-medium transition"
                                >
                                    {editingUser
                                        ? "Enregistrer"
                                        : "Créer l'utilisateur"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
