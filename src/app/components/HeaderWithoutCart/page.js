"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { GiFullPizza } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "@/app/redux/slices/cartSlice";
import Cookies from "js-cookie";

export default function HeaderWithoutCart() {
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
        </div>
      </nav>
    </header>
  );
}
