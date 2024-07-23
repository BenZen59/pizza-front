"use client";

import { useState, useEffect } from "react";
import withAuth from "../../components/withAuth";
import HeaderWithoutCart from "../HeaderWithoutCart/page";
import pizzaApi from "@/app/api/pizzaApi";

// Mock function to simulate fetching user data from an API
const fetchUserData = async () => {
  // Replace this with your actual API call
  return {
    nom: "Doe",
    prenom: "John",
    adresse_mail: "john.doe@example.com",
    numero_de_telephone: "123-456-7890",
  };
};

// Mock function to simulate fetching user orders from an API
const fetchUserOrders = async () => {
  // Replace this with your actual API call
  return [
    { id: 1, item: "Product 1", quantity: 2, price: 50 },
    { id: 2, item: "Product 2", quantity: 1, price: 100 },
  ];
};

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Vérifier si le client est connecté
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const fetchUserInfo = async () => {
        try {
          const response = await pizzaApi.getAccountDetail(token);
          const prenom = response.data.prenom;
          const nom = response.data.nom;
          const telephone = response.data.numeroDeTelephone;
          const mail = response.data.adresseMail;
          console.log(prenom + nom);
          setUserData({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            mail: mail,
          });
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderWithoutCart />
      <div className="flex justify-center mt-4">
        <section className="bg-white text-black p-4 w-auto h-auto shadow-lg border-opacity-20 border-black border rounded-md text-center mb-4 mr-4">
          <h2 className="font-bold text-2xl">Informations</h2>
          <p className="mt-4">
            <strong>Nom:</strong> {userData.nom}
          </p>
          <p>
            <strong>Prénom:</strong> {userData.prenom}
          </p>
          <p>
            <strong>Adresse mail:</strong> {userData.mail}
          </p>
          <p>
            <strong>Téléphone:</strong> {userData.telephone}
          </p>
        </section>

        <section className="bg-white text-black p-4 w-[300px] h-auto shadow-lg border-opacity-20 border-black border rounded-md text-center mb-4">
          <h2 className="font-bold text-2xl ">Ma Liste de Commande</h2>
          <p className="mt-4">
            <strong>Commande n°:</strong> 123456789
          </p>
        </section>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
