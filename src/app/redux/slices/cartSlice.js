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
      const {
        idArticle,
        qty,
        prixTtc,
        image,
        articleName,
        taille,
        tailleUnite,
      } = action.payload;

      // Calculer la quantité totale actuelle pour cette taille dans le panier
      const totalQty = state.cartItems.reduce((total, item) => {
        if (item.idArticle === idArticle && item.taille === taille) {
          return total + item.qty;
        }
        return total;
      }, 0);

      // Vérifier si ajouter cet article dépasserait la limite de 99 articles
      if (totalQty + qty > 99) {
        alert("La limite de 99 articles est atteinte !");
        return;
      }

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.idArticle === idArticle && item.taille === taille
      );

      if (existingItemIndex !== -1) {
        // Si l'article existe déjà, augmenter la quantité
        const existingItem = state.cartItems[existingItemIndex];
        const newQty = existingItem.qty + qty;
        if (newQty > 99) {
          existingItem.qty = 99; // Limiter la quantité à 99
        } else {
          existingItem.qty = newQty;
        }
      } else {
        // Sinon, ajouter un nouvel article
        state.cartItems.push({
          idArticle,
          qty,
          prixTtc,
          image,
          articleName,
          taille,
          tailleUnite,
        });
      }

      // Mettre à jour le prix total du panier
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.prixTtc * item.qty,
        0
      );

      // Sauvegarder le panier dans les cookies
      Cookies.set("cart", JSON.stringify({ ...state }));
    },
    removeFromCart: (state, action) => {
      const { idArticle, taille } = action.payload; // suppose que action.payload contient idArticle et taille
      const itemToRemove = state.cartItems.find(
        (item) => item.idArticle === idArticle && item.taille === taille
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.prixTtc * itemToRemove.qty;
        state.cartItems = state.cartItems.filter(
          (item) => !(item.idArticle === idArticle && item.taille === taille)
        );
      }
      Cookies.set("cart", JSON.stringify({ ...state }));
    },

    hideLoading: (state) => {
      state.loading = false;
    },

    hideLoading: (state) => {
      state.loading = false;
    },
    updateQuantity: (state, action) => {
      const { idArticle, taille, qty } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.idArticle === idArticle && item.taille === taille
      );

      if (existingItem) {
        // If the requested quantity is <= 0, remove the item from the cart
        if (qty <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => !(item.idArticle === idArticle && item.taille === taille)
          );
        } else {
          // Otherwise, update the quantity of the item
          existingItem.qty = qty;
        }
      } else {
        // If the item doesn't exist in the cart, add it if qty > 0
        if (qty > 0) {
          state.cartItems.push({
            idArticle,
            taille,
            qty,
            // You may need to add other properties from your payload here
          });
        }
      }

      // Recalculate the total price
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.prixTtc * item.qty,
        0
      );

      // Update the cart in cookies
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
