import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function CartSidebar() {
  const { loading, cartItems } = useSelector((state) => state.cart);

  return (
    <div className="fixed  right-0 w-32 h-full shadow-lg border border-opacity-20 border-black overflow-scroll">
      {loading ? (
        <div className="py-5 px-2 text-black">Chargement ...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2 text-black">Le panier est vide</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-black">
            <div>Total : </div>
            <div className="font-bold text-red-700">${itemsPrice}</div>
            <div>
              <Link
                href="/"
                className="w-full text-center p-1 rounded-2xl border-2"
              >
                Allez au paniez
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
