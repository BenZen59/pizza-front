"use client";
import { useEffect } from "react";
import Header from "./Header/page";
import CartSidebar from "./CartSidebar/page";
import MenuArticle from "./MenuArticle/page";
import { hideLoading } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className="bg-gray-100">
        <CartSidebar />
        <MenuArticle />
      </main>
    </div>
  );
}
