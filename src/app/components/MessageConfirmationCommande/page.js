import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import pizzaApi from '@/app/api/pizzaApi';

export default function MessageConfirmationCommande({ onClose, cartItems }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);

      const fetchUserInfo = async () => {
        try {
          const response = await pizzaApi.getAccountDetail(token);
          const idClient = response.data.idClient;
          console.log(idClient);
          setUserData({
            idClient: idClient,
          });
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      // Créer une commande pour l'utilisateur
      const response = await pizzaApi.createCommande(userData.idClient);
      const numeroCommande = response.data.numeroCommande;

      // Ajouter chaque article du panier à la commande
      const addArticlesPromises = cartItems.map((item) => {
        return pizzaApi
          .addArticleToCommande(
            numeroCommande,
            item.idArticle,
            item.qty,
            item.compositions
          )
          .catch((err) => {
            // Gestion individuelle des erreurs pour chaque article
            console.error(
              `Erreur lors de l'ajout de l'article ${item.idArticle}`,
              err
            );
          });
      });

      // Attendre que toutes les promesses soient résolues
      await Promise.all(addArticlesPromises);

      // Vérifiez que `response` est défini et contient les données attendues
      alert('Commande créée avec succès');
      onClose(); // Fermez le modal ou effectuez une autre action
    } catch (error) {
      // Utilisez `console.error` pour vérifier le contenu de l'erreur
      console.error('Erreur lors de la création de la commande', error);
      // Ajustez le message d'erreur en fonction de la structure de l'erreur retournée par l'API
      setError(
        error.response?.data?.error ||
          'Erreur lors de la création de la commande'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-md shadow-lg p-6 text-center'>
        <p>Voulez-vous valider votre panier ?</p>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='mt-4 flex justify-around'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Oui'}
          </button>
          <button
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
            onClick={onClose}
            disabled={loading}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
