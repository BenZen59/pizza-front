import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/app/redux/slices/cartSlice';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import MessageConfirmationCommande from '../MessageConfirmationCommande/page';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function CartSidebar() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const removeFromCartHandler = (item) => {
    dispatch(
      removeFromCart({
        idArticle: item.idArticle,
        taille: item.taille,
        compositions: item.compositions,
      })
    );
  };

  const updateQuantityHandler = (item, newQty) => {
    dispatch(
      updateQuantity({
        idArticle: item.idArticle,
        taille: item.taille,
        qty: newQty,
        compositions: item.compositions,
      })
    );
  };

  const handleShowConfirmation = () => {
    if (isLoggedIn) {
      setShowConfirmation(true);
    } else {
      router.push('/LoginPage'); // Rediriger vers la page de connexion
    }
  };

  const handleHideConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='fixed right-0 top-0 w-52 h-screen shadow-lg border border-opacity-20 border-black flex flex-col pt-10 z-10'>
      {loading ? (
        <div className='py-5 px-2 text-black'>Chargement ...</div>
      ) : cartItems.length === 0 ? (
        <div className='py-5 px-2 text-black text-center'>
          Le panier est vide
        </div>
      ) : (
        <>
          <div className='p-2 flex flex-col items-center border-b border-b-black pb-4'>
            <div className='text-black'>Total :</div>
            <div className='font-bold text-red-700'>{totalPrice} €</div>

            <button
              className='rounded-full bg-red-500 text-white mt-3 hover:bg-red-600 px-2 py-1 flex items-center justify-center space-x-2 mx-auto text-base'
              onClick={handleShowConfirmation}
            >
              Commander
            </button>

            {showConfirmation && (
              <MessageConfirmationCommande
                onClose={handleHideConfirmation}
                cartItems={cartItems}
              />
            )}
          </div>
          <div className='flex-1 overflow-y-auto'>
            {cartItems.map((item) => (
              <div
                key={`${item.idArticle}-${item.taille}-${JSON.stringify(
                  item.compositions
                )}`}
                className='p-4 flex flex-col items-center border-b border-b-gray-600'
              >
                <Link
                  href={`product/${item.idArticle}`}
                  className='flex items-center'
                >
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.articleName}
                    width={50}
                    height={50}
                    className='p-1 shadow-lg border-opacity-20 border-black border'
                  />
                </Link>
                <div className='text-black font-bold text-center'>
                  {item.articleName}
                </div>
                <div className='text-black text-center'>
                  {item.taille} {item.tailleUnite}
                </div>
                <div className='text-red-500 font-bold text-center'>
                  {item.prixTtc} €
                </div>

                {/* Affichage des compositions */}
                {item.compositions && item.compositions.length > 0 && (
                  <div className=' text-black mt-2 text-center'>
                    <div className='font-semibold'>Compositions</div>
                    <div>
                      {item.compositions.map((comp, index) => (
                        <p key={index}>
                          {comp.libelle} ({comp.qty})
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className='flex'>
                  <div className='mt-2 flex justify-around items-center text-black space-x-2'>
                    <button
                      className='bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center'
                      onClick={() => updateQuantityHandler(item, item.qty - 1)}
                    >
                      <FaMinus />
                    </button>
                    <input
                      type='text'
                      value={item.qty}
                      onChange={(e) =>
                        updateQuantityHandler(item, parseInt(e.target.value))
                      }
                      className='w-12 h-8 text-center border border-gray-500 rounded-md'
                    />
                    <button
                      className='bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center'
                      onClick={() => updateQuantityHandler(item, item.qty + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    className='bg-red-500 text-white rounded-md px-2 py-1 h-8 w-8 hover:bg-red-600 mt-2 ml-4'
                    onClick={() => removeFromCartHandler(item)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
