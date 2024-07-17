// src/components/LogoutButton.js
"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/LoginPage");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-[150px] bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
