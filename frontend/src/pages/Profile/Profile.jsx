import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Shield,
    Edit3,
    X,
    Save,
    Lock,
} from "lucide-react";
import api from "../../api";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/user");

                const currentUser = response.data.user;

                setUser(currentUser);
                setName(currentUser.name);
                setEmail(currentUser.email);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement du profil :",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setPasswordConfirmation("");
        setMessage("");
        setError("");
        setEditing(true);
    };

    const handleCancel = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setPasswordConfirmation("");
        setMessage("");
        setError("");
        setEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const data = {
                name: name,
                email: email,
            };

            // On envoie le password seulement
            // s'il a été renseigné
            if (password.trim() !== "") {
                data.password = password;
                data.password_confirmation =
                    passwordConfirmation;
            }

            const response = await api.put(
                "/user/profile",
                data
            );

            const updatedUser = response.data.user;

            setUser(updatedUser);

            setName(updatedUser.name);
            setEmail(updatedUser.email);

            setPassword("");
            setPasswordConfirmation("");

            // Mise à jour du user dans localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setMessage(
                "Profil modifié avec succès !"
            );

            setEditing(false);

        } catch (error) {
            console.error(
                "Erreur lors de la modification du profil :",
                error
            );

            console.error(
                "Réponse backend :",
                error.response?.data
            );

            if (error.response?.data?.errors) {
                const validationErrors =
                    error.response.data.errors;

                const firstError = Object.values(
                    validationErrors
                )[0]?.[0];

                setError(
                    firstError ||
                        "Erreur de validation."
                );
            } else if (error.response?.data?.message) {
                setError(
                    error.response.data.message
                );
            } else {
                setError(
                    "Impossible de modifier le profil."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <p className="text-gray-500">
                    Chargement du profil...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8">
                <p className="text-red-500">
                    Impossible de charger le profil.
                </p>
            </div>
        );
    }

    const roleLabels = {
        admin: "Administrateur",
        technicien: "Technicien",
        personnel: "Personnel",
    };

    return (
        <div className="p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#172033]">
                    Mon Profil
                </h1>

                <p className="text-gray-500 mt-1">
                    Consultez et modifiez les informations de votre compte
                </p>
            </div>

            {/* Success */}
            {message && (
                <div className="max-w-3xl mb-5 px-4 py-3 rounded-lg bg-teal-50 border border-teal-200 text-[#0F7C7C]">
                    {message}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="max-w-3xl mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600">
                    {error}
                </div>
            )}

            {/* Profile Card */}
            <div className="max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div className="bg-[#13B8B0] px-8 py-8 text-white">
                    <div className="flex items-center gap-5">

                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                            <User size={40} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                {user.name}
                            </h2>

                            <p className="text-white/80 mt-1">
                                {roleLabels[user.role] ||
                                    user.role}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Content */}
                <div className="p-8">

                    {!editing ? (
                        <>
                            {/* Nom */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    Nom complet
                                </p>

                                <div className="flex items-center gap-3">
                                    <User
                                        size={20}
                                        className="text-[#13B8B0]"
                                    />

                                    <span className="text-gray-800 font-medium">
                                        {user.name}
                                    </span>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    Adresse email
                                </p>

                                <div className="flex items-center gap-3">
                                    <Mail
                                        size={20}
                                        className="text-[#13B8B0]"
                                    />

                                    <span className="text-gray-800 font-medium">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    Rôle
                                </p>

                                <div className="flex items-center gap-3">
                                    <Shield
                                        size={20}
                                        className="text-[#13B8B0]"
                                    />

                                    <span className="px-3 py-1 rounded-full bg-[#13B8B0]/10 text-[#0F7C7C] font-medium">
                                        {roleLabels[user.role] ||
                                            user.role}
                                    </span>
                                </div>
                            </div>

                            {/* Modifier */}
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#13B8B0] text-white hover:bg-[#0F7C7C] transition"
                                >
                                    <Edit3 size={18} />
                                    Modifier le profil
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSave}>

                            {/* Nom */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom complet
                                </label>

                                <div className="relative">
                                    <User
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nouveau mot de passe
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Laisser vide pour conserver le mot de passe actuel"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                    />
                                </div>
                            </div>

                            {/* Confirmation password */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirmer le mot de passe
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirmer le nouveau mot de passe"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13B8B0]"
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rôle
                                </label>

                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <Shield
                                        size={19}
                                        className="text-gray-400"
                                    />

                                    <span className="text-gray-600">
                                        {roleLabels[user.role] ||
                                            user.role}
                                    </span>

                                    <span className="ml-auto text-xs text-gray-400">
                                        Non modifiable
                                    </span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 border-t border-gray-200 flex gap-3">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#13B8B0] text-white hover:bg-[#0F7C7C] transition disabled:opacity-50"
                                >
                                    <Save size={18} />

                                    {saving
                                        ? "Enregistrement..."
                                        : "Enregistrer"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <X size={18} />
                                    Annuler
                                </button>

                            </div>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Profile;
