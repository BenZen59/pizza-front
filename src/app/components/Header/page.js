import React from "react";
import Link from "next/link";
import { GiFullPizza } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Header() {
  const { loading, cardItems } = useSelector((state) => state.cart);

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-black text-white">
        <Link href="/" className="text-xl font-bold flex">
          L'atelier Pizza
          <GiFullPizza className="mt-1 ml-4" />
        </Link>
        <div className="pr-10 flex">
          {/* {loading ? "" : cardItems.reduce((a, c) => a + c.qty, 0)} */}
          <Link href="/cart" className="text-xl">
            <BsCart4 />
          </Link>
          <span className="absolute font-bold text-red-600 text-xl ml-8  text-center w-4">
            0
          </span>
        </div>
      </nav>
    </header>
  );
}
