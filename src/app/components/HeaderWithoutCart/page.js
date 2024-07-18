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

export default function HeaderWithoutCart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch user info from API
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
        </div>
      </nav>
    </header>
  );
}
