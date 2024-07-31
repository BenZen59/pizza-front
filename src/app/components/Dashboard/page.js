'use client';

import { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
import HeaderWithoutCart from '../HeaderWithoutCart/page';
import pizzaApi from '@/app/api/pizzaApi';
import Cookies from 'js-cookie';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);

      const fetchUserInfo = async () => {
        try {
          const response = await pizzaApi.getAccountDetail(token);
          const idClient = response.data.idClient;
          const prenom = response.data.prenom;
          const nom = response.data.nom;
          const telephone = response.data.numeroDeTelephone;
          const mail = response.data.adresseMail;
          console.log(prenom + nom);
          setUserData({
            idClient: idClient,
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            mail: mail,
          });
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    const fetchCommande = async () => {
      if (userData && userData.idClient) {
        try {
          const response = await pizzaApi.getCommande(userData.idClient);
          setOrders(response.data);
        } catch (error) {
          console.error('Failed to fetch orders', error);
        }
      }
    };

    fetchCommande();
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderWithoutCart />
      <div className='flex justify-center mt-4'>
        <section className='bg-white text-black p-4 w-auto h-[180px] shadow-lg border-opacity-20 border-black border rounded-md text-center mb-4 mr-4'>
          <h2 className='font-bold text-2xl'>Informations</h2>
          <p className='mt-4'>
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

        <section className='bg-white text-black p-4 w-[300px] h-auto shadow-lg border-opacity-20 border-black border rounded-md text-center mb-4'>
          <h2 className='font-bold text-2xl '>Ma Liste de Commande</h2>
          {orders.map((order) => (
            <div key={order.numero_commande} className='mt-4'>
              <p>
                <strong>Commande n°:</strong> {order.numeroCommande}
              </p>
              {/* Vous pouvez ajouter plus de détails sur la commande ici */}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
