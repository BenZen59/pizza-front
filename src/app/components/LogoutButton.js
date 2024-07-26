// src/components/LogoutButton.js
"use client";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = (event) => {
    event.preventDefault(); // Empêche la réactualisation de la page
    localStorage.removeItem("token");
    router.push("/");

    // Rediriger vers la page d'accueil et recharger la page
    try {
      router.push("/");
      router.reload();
    } catch (error) {
      // En cas d'échec, utiliser window.location
      window.location.href = "/";
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="text-center h-10 w-[150px] bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200"
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
