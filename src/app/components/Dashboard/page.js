"use client";

import { useState, useEffect } from "react";
import withAuth from "../../components/withAuth";
import LogoutButton from "../../components/LogoutButton";

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
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedUserData = await fetchUserData();
      setUserData(fetchedUserData);

      const fetchedUserOrders = await fetchUserOrders();
      setOrders(fetchedUserOrders);
    };

    loadData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LogoutButton />

      <section>
        <h2>Informations</h2>
        <p>
          <strong>Nom:</strong> {userData.nom}
        </p>
        <p>
          <strong>Prénom:</strong> {userData.prenom}
        </p>
        <p>
          <strong>Adresse mail:</strong> {userData.adresse_mail}
        </p>
        <p>
          <strong>Téléphone:</strong> {userData.numero_de_telephone}
        </p>
      </section>

      <section>
        <h2>Ma Liste de Commande</h2>
        Commande
      </section>
    </div>
  );
}

export default withAuth(Dashboard);
