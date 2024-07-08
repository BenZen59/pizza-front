import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, qty, prixTtc, image, articleName } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.cartItems.push({ id, qty, prixTtc, image, articleName });
      }

      state.totalPrice += prixTtc * qty; // Mise à jour du prix total
      Cookies.set("cart", JSON.stringify({ ...state })); // Utilisation de l'opérateur spread pour créer une copie de l'état
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const itemToRemove = state.cartItems.find(
        (item) => item.id === idToRemove
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.prixTtc * itemToRemove.qty; // Déduction du prix total
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== idToRemove
        );
      }
      Cookies.set("cart", JSON.stringify({ ...state })); // Utilisation de l'opérateur spread pour créer une copie de l'état
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;
export default cartSlice.reducer;
