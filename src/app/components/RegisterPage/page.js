"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import pizzaApi from "@/app/api/pizzaApi";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data); // Log the data to be sent
      await pizzaApi.register(data);
      router.push("/LoginPage");
    } catch (error) {
      console.error("Registration error:", error.response || error.message);
      if (error.response && error.response.data) {
        setSubmitError(
          error.response.data.message ||
            "L'inscription a échoué. Veuillez réessayer."
        );
      } else {
        setSubmitError(
          "L'inscription a échoué. Veuillez vérifier votre connexion réseau et réessayer."
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium">
              Nom
            </label>
            <input
              id="nom"
              type="text"
              {...register("nom", { required: "Le nom est requis" })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.nom && (
              <span className="text-red-500">{errors.nom.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-medium">
              Prénom
            </label>
            <input
              id="prenom"
              type="text"
              {...register("prenom", { required: "Le prénom est requis" })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.prenom && (
              <span className="text-red-500">{errors.prenom.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="adresse_mail" className="block text-sm font-medium">
              Adresse Mail
            </label>
            <input
              id="adresse_mail"
              type="email"
              {...register("adresse_mail", {
                required: "L'adresse mail est requise",
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.adresse_mail && (
              <span className="text-red-500">
                {errors.adresse_mail.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="numero_de_telephone"
              className="block text-sm font-medium"
            >
              Numéro de Téléphone
            </label>
            <input
              id="numero_de_telephone"
              type="text"
              {...register("numero_de_telephone", {
                required: "Le numéro de téléphone est requis",
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.numero_de_telephone && (
              <span className="text-red-500">
                {errors.numero_de_telephone.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="adresse" className="block text-sm font-medium">
              Adresse
            </label>
            <input
              id="adresse"
              type="text"
              {...register("adresse", { required: "L'adresse est requise" })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.adresse && (
              <span className="text-red-500">{errors.adresse.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="mot_de_passe" className="block text-sm font-medium">
              Mot de Passe
            </label>
            <input
              id="mot_de_passe"
              type="password"
              {...register("mot_de_passe", {
                required: "Le mot de passe est requis",
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.mot_de_passe && (
              <span className="text-red-500">
                {errors.mot_de_passe.message}
              </span>
            )}
          </div>
          {submitError && (
            <div className="text-red-500 mb-4">{submitError}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
