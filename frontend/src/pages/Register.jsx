import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F7C7C] text-white">
        <div className="w-full px-14 py-10 flex flex-col">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Stethoscope size={24} />
            </div>

            <h1 className="text-2xl font-bold">
              BioMaintenix
            </h1>
          </div>

          <p className="mt-3 text-lg text-white/80 max-w-md leading-7">
            Plateforme de gestion des équipements biomédicaux
          </p>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <h2 className="text-3xl font-bold">
                Rejoignez BioMaintenix
              </h2>

              <p className="mt-4 text-white/70 leading-6">
                Créez votre compte pour accéder à la plateforme
                de gestion et de suivi des équipements biomédicaux.
              </p>
            </div>
          </div>

          <div className="pb-2">
            <h2 className="text-lg font-bold text-[#25BDB5]">
              PRÉCISION & TRAÇABILITÉ
            </h2>

            <p className="mt-2 text-sm text-white/70 leading-5">
              Garantissez la conformité et le suivi de vos
              équipements médicaux.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* BACK TO LOGIN */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#13B8B0] mb-6"
          >
            <ArrowLeft size={18} />
            Retour à la connexion
          </button>

          {/* LOGO */}
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#E6F8F7] flex items-center justify-center">
              <Stethoscope
                size={22}
                className="text-[#0FA9A2]"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#172033]">
              BIOMAINTENIX
            </h2>
          </div>

          <h3 className="text-center text-xl font-bold text-[#172033] mb-2">
            CRÉER UN COMPTE
          </h3>

          <p className="text-center text-sm text-gray-500 mb-7">
            Créez votre compte pour commencer
          </p>

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="mb-5">
              <label className="block text-base text-[#202020] mb-2">
                Nom complet
              </label>

              <div className="relative">
                <User
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-4
                    border
                    border-gray-300
                    rounded-lg
                    outline-none
                    text-gray-800
                    placeholder-gray-400
                    focus:border-[#12B8B0]
                    focus:ring-2
                    focus:ring-[#12B8B0]/20
                  "
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block text-base text-[#202020] mb-2">
                Adresse e-mail
              </label>

              <div className="relative">
                <Mail
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nom@clinique.com"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-4
                    border
                    border-gray-300
                    rounded-lg
                    outline-none
                    text-gray-800
                    placeholder-gray-400
                    focus:border-[#12B8B0]
                    focus:ring-2
                    focus:ring-[#12B8B0]/20
                  "
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="block text-base text-[#202020] mb-2">
                Mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-12
                    border
                    border-gray-300
                    rounded-lg
                    outline-none
                    text-gray-800
                    placeholder-gray-400
                    focus:border-[#12B8B0]
                    focus:ring-2
                    focus:ring-[#12B8B0]/20
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <label className="block text-base text-[#202020] mb-2">
                Confirmer le mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-12
                    border
                    border-gray-300
                    rounded-lg
                    outline-none
                    text-gray-800
                    placeholder-gray-400
                    focus:border-[#12B8B0]
                    focus:ring-2
                    focus:ring-[#12B8B0]/20
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="
                w-full
                h-12
                rounded-lg
                bg-[#13B8B0]
                text-white
                font-medium
                hover:bg-[#0FA59E]
                transition
                duration-200
              "
            >
              Créer mon compte
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Vous avez déjà un compte ?

            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-1 text-[#13B8B0] hover:underline font-medium"
            >
              Se connecter
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;