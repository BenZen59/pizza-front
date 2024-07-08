import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/app/redux/slices/cartSlice";
import Image from "next/image";

export default function CartSidebar() {
  const { loading, cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="fixed right-0 w-48 h-full shadow-lg border border-opacity-20 border-black overflow-scroll">
      {loading ? (
        <div className="py-5 px-2 text-black">Chargement ...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2 text-black text-center">
          Le panier est vide
        </div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-black">
            <div className="text-black">Total :</div>
            <div className="font-bold text-red-700">{totalPrice} €</div>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-2 flex flex-col items-center border-b border-b-gray-600"
            >
              <Link href={`product/${item.id}`} className="flex items-center">
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
              </div>{" "}
              {/* Nom de l'article en noir */}
              <div className="text-red-500 font-bold text-center">
                {item.prixTtc} €
              </div>{" "}
              {/* Prix de l'article en rouge */}
              <select
                value={item.qty}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                className="mt-2 text-black"
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                className="bg-red-500 text-white rounded-full mt-2 px-3 py-1 hover:bg-red-600"
                onClick={() => removeFromCartHandler(item.id)}
              >
                Supprimer
              </button>{" "}
              {/* Bouton supprimer en rouge avec coins arrondis */}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
