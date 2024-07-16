// src/app/LoginPage/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import pizzaApi from "@/app/api/pizzaApi";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(pizzaApi.getLogin(), data);
      const { token } = response.data;

      // Stocker le token dans le localStorage ou un cookie
      localStorage.setItem("token", token);

      // Rediriger l'utilisateur vers la page protégée
      router.push("/Dashboard");
    } catch (error) {
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register("adresse_mail", { required: true })} />
          {errors.adresse_mail && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("mot_de_passe", { required: true })}
          />
          {errors.mot_de_passe && <span>Ce champ est requis</span>}
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
