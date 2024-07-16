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
        compositions = [],
      } = action.payload;

      const totalQty = state.cartItems.reduce((total, item) => {
        if (item.idArticle === idArticle && item.taille === taille) {
          return total + item.qty;
        }
        return total;
      }, 0);

      if (totalQty + qty > 99) {
        alert("La limite de 99 articles est atteinte !");
        return;
      }

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.idArticle === idArticle &&
          item.taille === taille &&
          JSON.stringify(item.compositions) === JSON.stringify(compositions)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        const newQty = existingItem.qty + qty;
        if (newQty > 99) {
          existingItem.qty = 99;
        } else {
          existingItem.qty = newQty;
        }
      } else {
        state.cartItems.push({
          idArticle,
          qty,
          prixTtc,
          image,
          articleName,
          taille,
          tailleUnite,
          compositions,
        });
      }

      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.prixTtc * item.qty;
      }, 0);

      Cookies.set("cart", JSON.stringify({ ...state }));
    },

    addToCartPersonnaliser: (state, action) => {
      const {
        idArticle,
        qty,
        prixTtc,
        image,
        articleName,
        taille,
        tailleUnite,
        compositions = [],
      } = action.payload;

      const totalQty = state.cartItems.reduce((total, item) => {
        if (item.idArticle === idArticle && item.taille === taille) {
          return total + item.qty;
        }
        return total;
      }, 0);

      if (totalQty + qty > 99) {
        alert("La limite de 99 articles est atteinte !");
        return;
      }

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.idArticle === idArticle &&
          item.taille === taille &&
          JSON.stringify(item.compositions) === JSON.stringify(compositions)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        existingItem.qty += qty;
      } else {
        state.cartItems.push({
          idArticle,
          qty,
          prixTtc,
          image,
          articleName,
          taille,
          tailleUnite,
          compositions,
        });
      }

      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.prixTtc * item.qty;
      }, 0);

      Cookies.set("cart", JSON.stringify({ ...state }));
    },

    hideLoading: (state) => {
      state.loading = false;
    },

    removeFromCart: (state, action) => {
      const { idArticle, taille, compositions = [] } = action.payload;
      const itemToRemoveIndex = state.cartItems.findIndex(
        (item) =>
          item.idArticle === idArticle &&
          item.taille === taille &&
          JSON.stringify(item.compositions) === JSON.stringify(compositions)
      );

      if (itemToRemoveIndex !== -1) {
        const itemToRemove = state.cartItems[itemToRemoveIndex];

        state.totalPrice -= itemToRemove.prixTtc * itemToRemove.qty;
        state.cartItems.splice(itemToRemoveIndex, 1); // Remove the item from the array
      }

      Cookies.set("cart", JSON.stringify({ ...state }));
    },

    updateQuantity: (state, action) => {
      const { idArticle, taille, qty, compositions = [] } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.idArticle === idArticle &&
          item.taille === taille &&
          JSON.stringify(item.compositions) === JSON.stringify(compositions)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        // If the requested quantity is <= 0, remove the item from the cart
        if (qty <= 0) {
          state.cartItems.splice(existingItemIndex, 1); // Remove the item from the array
        } else {
          // Otherwise, update the quantity of the item
          existingItem.qty = qty;
        }

        // Recalculate the total price
        state.totalPrice = state.cartItems.reduce((total, item) => {
          return total + item.prixTtc * item.qty;
        }, 0);

        // Update the cart in cookies
        Cookies.set("cart", JSON.stringify({ ...state }));
      }
    },
  },
});

export const {
  initializeCart,
  addToCart,
  addToCartPersonnaliser,
  removeFromCart,
  hideLoading,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
