"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { GiFullPizza } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { RiLoginCircleLine, RiAccountCircleFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "@/app/redux/slices/cartSlice";
import Cookies from "js-cookie";
import LogoutButton from "../LogoutButton";
import pizzaApi from "@/app/api/pizzaApi";

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Calculer le nombre total d'articles dans le panier
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  useEffect(() => {
    // Initialiser le panier à partir des cookies côté client
    const persistedState = Cookies.get("cart");
    if (persistedState) {
      dispatch(initializeCart(JSON.parse(persistedState)));
    }
  }, [dispatch]);

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
          console.log(prenom + nom);
          setUserName(`${prenom} ${nom}`);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    console.log(`Total items in cart: ${totalItems}`);
  }, [totalItems]);

  // Fonction pour formatter le nombre d'articles
  const formatTotalItems = (total) => {
    // Limiter le nombre à 99 maximum
    return total > 99 ? "99+" : total.toString();
  };

  const toggleMenu = useCallback(() => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }, []);

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-black text-white">
        <Link href="/" className="text-xl font-bold flex">
          L'atelier Pizza
          <GiFullPizza className="mt-1 ml-4" />
        </Link>
        <div className="pr-10 flex relative items-center">
          {isLoggedIn ? (
            <div className="flex items-center font-bold relative">
              <button
                className="flex text-black bg-white rounded-md p-2 h-9 z-30 mr-6"
                onClick={toggleMenu}
              >
                <RiAccountCircleFill className="text-[26px] mt-[-2px]" />
                <span className="ml-2">{userName}</span>
              </button>
              {showMenu && (
                <div className="absolute top-12 right-0 bg-white border border-black border-opacity-20 text-black shadow-md rounded-md p-2 z-30">
                  <Link href="/Dashboard">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 text-center h-10 z-30 mb-2 w-[150px] transition duration-200">
                      <span className="text-center">Dashboard</span>
                    </button>
                  </Link>
                  <LogoutButton />
                </div>
              )}
            </div>
          ) : (
            <Link href="/LoginPage" className=" font-bold flex mr-6">
              <button className="flex text-black bg-white rounded-md p-2 h-9 z-30 ">
                <span className="mt-[-2px]">Connexion</span>
                <RiLoginCircleLine className=" mt-[-2px] ml-4 text-[26px]" />
              </button>
            </Link>
          )}
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
