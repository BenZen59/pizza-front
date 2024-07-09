import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const persistedState = Cookies.get("cart");
const initialState = persistedState
  ? JSON.parse(persistedState)
  : {
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
    initializeCart: (state, action) => {
      return { ...state, ...action.payload };
    },
    addToCart: (state, action) => {
      const { idArticle, qty, prixTtc, image, articleName } = action.payload;

      // Calculer la quantité totale actuelle dans le panier
      const totalQty = state.cartItems.reduce(
        (total, item) => total + item.qty,
        0
      );

      // Vérifier si ajouter cet article dépasserait la limite de 99 articles
      if (totalQty + qty > 99) {
        alert("La limite de 99 articles est atteinte !");
        return;
      }

      const existingItem = state.cartItems.find(
        (item) => item.idArticle === idArticle
      );

      if (existingItem) {
        if (existingItem.qty + qty > 99) {
          existingItem.qty = 99; // Limiter la quantité à 99
        } else {
          existingItem.qty += qty;
        }
      } else {
        state.cartItems.push({ idArticle, qty, prixTtc, image, articleName });
      }

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.prixTtc * item.qty,
        0
      );
      Cookies.set("cart", JSON.stringify({ ...state }));
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const itemToRemove = state.cartItems.find(
        (item) => item.idArticle === idToRemove
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.prixTtc * itemToRemove.qty;
        state.cartItems = state.cartItems.filter(
          (item) => item.idArticle !== idToRemove
        );
      }
      Cookies.set("cart", JSON.stringify({ ...state }));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.idArticle === id
      );

      if (existingItem) {
        const totalQty = state.cartItems.reduce(
          (total, item) => total + item.qty,
          0
        );
        if (totalQty > 98 && qty > existingItem.qty) {
          alert("La limite de 99 articles est atteinte !");
          return;
        }

        if (qty <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.idArticle !== id
          );
        } else if (qty > 99) {
          existingItem.qty = 99; // Limiter la quantité à 99
        } else {
          existingItem.qty = qty;
        }

        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.prixTtc * item.qty,
          0
        );
      }
      Cookies.set("cart", JSON.stringify({ ...state }));
    },
  },
});

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  hideLoading,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
