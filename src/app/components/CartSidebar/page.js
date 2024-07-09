import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/app/redux/slices/cartSlice";
import Image from "next/image";

export default function CartSidebar() {
  const { loading, cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantityHandler = (item, newQty) => {
    dispatch(updateQuantity({ id: item.idArticle, qty: newQty }));
  };

  return (
    <div className="fixed right-0 top-0 w-48 h-screen shadow-lg border border-opacity-20 border-black flex flex-col pt-10">
      {loading ? (
        <div className="py-5 px-2 text-black">Chargement ...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2 text-black text-center">
          Le panier est vide
        </div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-black pb-4 ">
            <div className="text-black">Total :</div>
            <div className="font-bold text-red-700">{totalPrice} €</div>
            <button className="rounded-full bg-red-500 text-white mt-3 hover:bg-red-600 px-2 py-1 flex items-center justify-center space-x-2 mx-auto text-base">
              Commander
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.idArticle}
                className="p-4 flex flex-col items-center border-b border-b-gray-600"
              >
                <Link
                  href={`product/${item.idArticle}`}
                  className="flex items-center"
                >
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.articleName}
                    width={50}
                    height={50}
                    className="p-1 shadow-lg border-opacity-20 border-black border"
                  />
                </Link>
                <div className="text-black font-bold text-center">
                  {item.articleName}
                </div>
                <div className="text-black text-center">
                  {item.taille} {item.tailleUnite}
                </div>
                <div className="text-red-500 font-bold text-center">
                  {item.prixTtc} €
                </div>
                <div className="mt-2 flex items-center text-black">
                  <button
                    className="bg-black text-white rounded-l px-2 py-1 hover:bg-gray-800 h-8 w-6"
                    onClick={() => updateQuantityHandler(item, item.qty - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.qty}
                    onChange={(e) =>
                      updateQuantityHandler(item, parseInt(e.target.value))
                    }
                    className="w-12 h-8 text-center border"
                  />
                  <button
                    className="bg-black text-white rounded-r px-2 py-1 hover:bg-gray-800 h-8 w-6"
                    onClick={() => updateQuantityHandler(item, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white rounded-full mt-4 px-3 py-1 hover:bg-red-600"
                  onClick={() => removeFromCartHandler(item.idArticle)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
