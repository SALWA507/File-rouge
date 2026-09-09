
import { useState } from "react";
import loginImage from "../assets/login-medical.png";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

   
      localStorage.setItem("token", response.data.token);

 
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Connexion réussie");

    
      navigate("/dashboard");

    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Les identifiants sont incorrects"
        );
      } else {
        setMessage("Impossible de contacter le serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">

 
      <div className="flex w-1/2 bg-[#0F7C7C] text-white relative overflow-hidden">

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
            Plateforme de gestion des équipements
            biomédicaux
          </p>

      
          <div className="flex-1 flex items-center justify-center">
            <div className="w-72 h-72 rounded-[35px] bg-white/10 flex items-center justify-center p-8">
              <img
                src={loginImage}
                alt="BioMaintenix"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

         
          <div className="pb-2">
            <h2 className="text-lg font-bold text-[#25BDB5]">
              PRÉCISION & TRAÇABILITÉ
            </h2>

            <p className="mt-2 text-sm text-white/70 leading-5 max-w-lg">
              Garantissez la conformité de vos dispositifs
              médicaux selon les normes cliniques internationales
            </p>
          </div>

        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

        
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

       
          <h3 className="text-center text-xl font-bold text-[#172033] mb-5">
            BIENVENUE SUR BIOMAINTENIX
          </h3>

       
          <form onSubmit={handleSubmit}>

            <div className="mb-7">

              <label className="block text-base text-[#202020] mb-2">
                Adresse e-mail
              </label>

              <div className="relative">

                <Mail
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            
            <div className="mb-3">

              <label className="block text-base text-[#202020] mb-2">
                Mot de passe
              </label>

              <div className="relative">

                <Lock
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-600
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <div className="flex items-center justify-between mb-5 text-xs">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="
                    w-4
                    h-4
                    accent-[#13B8B0]
                  "
                />

                <span className="text-gray-600">
                  Se souvenir de moi
                </span>

              </label>

              <button
                type="button"
                className="text-[#13B8B0] hover:underline"
              >
                Mot de passe oublié ?
              </button>

            </div>

            
            {message && (
              <div className="mb-4 text-center text-sm text-red-500">
                {message}
              </div>
            )}

         
            <button
              type="submit"
              disabled={loading}
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
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

          </form>

         
          <div className="flex items-center gap-5 my-6">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="text-sm text-gray-400">
              ou
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="
              w-full
              h-10
              rounded-lg
              border
              border-gray-300
              text-[#13B8B0]
              font-medium
              hover:bg-gray-50
              transition
            "
          >
            Créer un compte
          </button>

          <p className="text-center text-xs text-gray-600 mt-5">

            Besoin d'aide?

            <button
              type="button"
              className="ml-1 text-[#13B8B0] hover:underline"
            >
              Contactez le support
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;

