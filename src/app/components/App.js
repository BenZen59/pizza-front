"use client";
import { useEffect } from "react";
import CartSidebar from "./CartSidebar/page";
import MenuArticle from "./MenuArticle/page";
import Header from "./Header/page";
import { hideLoading } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Header />
      <main>
        <CartSidebar />
        <MenuArticle />
      </main>
    </div>
  );
}
