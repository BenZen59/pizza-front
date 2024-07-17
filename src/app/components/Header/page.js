import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { GiFullPizza } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "@/app/redux/slices/cartSlice";
import Cookies from "js-cookie";

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculer le nombre total d'articles dans le panier
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  useEffect(() => {
    // Initialize cart from cookies on client-side
    const persistedState = Cookies.get("cart");
    if (persistedState) {
      dispatch(initializeCart(JSON.parse(persistedState)));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(`Total items in cart: ${totalItems}`);
  }, [totalItems]);

  // Fonction pour formatter le nombre d'articles
  const formatTotalItems = (total) => {
    // Limiter le nombre à 99 maximum
    return total > 99 ? "99+" : total.toString();
  };

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-black text-white">
        <Link href="/" className="text-xl font-bold flex">
          L'atelier Pizza
          <GiFullPizza className="mt-1 ml-4" />
        </Link>
        <div className="pr-10 flex relative items-center">
          <Link href="/LoginPage" className=" font-bold flex mr-6">
            <button className="flex text-black bg-white rounded-md p-2 h-9 z-30">
              {" "}
              <span className="mt-[-2px]">Connexion</span>
              <RiLoginCircleLine className=" mt-[-2px] ml-4 text-[26px]" />
            </button>
          </Link>
          <div className="text-xl relative">
            <BsCart4 className="mr-2" /> {/* Ajout de marge à droite */}
          </div>
          {typeof window !== "undefined" && (
            <span className="absolute font-bold text-red-500 text-xl ml-1 top-0 right-0 w-10 h-7 flex items-center justify-center bg-white rounded-md">
              {formatTotalItems(totalItems)}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}
