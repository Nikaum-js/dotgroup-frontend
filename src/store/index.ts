// @ts-nocheck
import { createStore } from "vuex";
import type { Movie } from "../types/movie";
import { calculateMoviePrice } from "../utils/price";

interface CartItem extends Movie {
  quantity: number;
  price: number;
}

interface State {
  cart: {
    items: CartItem[];
    isOpen: boolean;
  };
  favorites: {
    items: Movie[];
  };
}

const loadFavoritesFromStorage = (): Movie[] => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const saveFavoritesToStorage = (favorites: Movie[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export default createStore<State>({
  state: {
    cart: {
      items: [],
      isOpen: false,
    },
    favorites: {
      items: loadFavoritesFromStorage(),
    },
  },

  getters: {
    cartItems: (state) => state.cart.items,
    cartTotal: (state) =>
      state.cart.items.reduce((total, item) => total + item.quantity, 0),
    cartTotalPrice: (state) =>
      state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    cartIsOpen: (state) => state.cart.isOpen,
    isInCart: (state) => (movieId: number) => {
      return state.cart.items.some((item) => item.id === movieId);
    },
    favoriteItems: (state) => state.favorites.items,
    isFavorite: (state) => (movieId: number) => {
      return state.favorites.items.some((item) => item.id === movieId);
    },
    favoritesCount: (state) => state.favorites.items.length,
  },

  mutations: {
    ADD_TO_CART(state, movie: Movie) {
      const existingItem = state.cart.items.find(
        (item) => item.id === movie.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.items.push({
          ...movie,
          quantity: 1,
          price: calculateMoviePrice(movie.vote_average),
        });
      }
    },

    REMOVE_FROM_CART(state, movieId: number) {
      state.cart.items = state.cart.items.filter((item) => item.id !== movieId);
    },

    UPDATE_QUANTITY(
      state,
      { movieId, quantity }: { movieId: number; quantity: number }
    ) {
      const item = state.cart.items.find((item) => item.id === movieId);
      if (item) {
        item.quantity = quantity;
      }
    },

    CLEAR_CART(state) {
      state.cart.items = [];
    },

    SET_CART_OPEN(state, isOpen: boolean) {
      state.cart.isOpen = isOpen;
    },

    ADD_TO_FAVORITES(state, movie: Movie) {
      if (!state.favorites.items.some((item) => item.id === movie.id)) {
        state.favorites.items.push(movie);
        saveFavoritesToStorage(state.favorites.items);
      }
    },

    REMOVE_FROM_FAVORITES(state, movieId: number) {
      state.favorites.items = state.favorites.items.filter(
        (item) => item.id !== movieId
      );
      saveFavoritesToStorage(state.favorites.items);
    },

    CLEAR_FAVORITES(state) {
      state.favorites.items = [];
      saveFavoritesToStorage(state.favorites.items);
    },
  },

  actions: {
    addToCart({ commit }, movie: Movie) {
      commit("ADD_TO_CART", movie);
    },

    removeFromCart({ commit }, movieId: number) {
      commit("REMOVE_FROM_CART", movieId);
    },

    updateQuantity({ commit }, payload: { movieId: number; quantity: number }) {
      commit("UPDATE_QUANTITY", payload);
    },

    clearCart({ commit }) {
      commit("CLEAR_CART");
    },

    toggleCart({ commit, state }) {
      commit("SET_CART_OPEN", !state.cart.isOpen);
    },

    addToFavorites({ commit }, movie: Movie) {
      commit("ADD_TO_FAVORITES", movie);
    },

    removeFromFavorites({ commit }, movieId: number) {
      commit("REMOVE_FROM_FAVORITES", movieId);
    },

    toggleFavorite({ commit, getters }, movie: Movie) {
      if (getters.isFavorite(movie.id)) {
        commit("REMOVE_FROM_FAVORITES", movie.id);
      } else {
        commit("ADD_TO_FAVORITES", movie);
      }
    },

    clearFavorites({ commit }) {
      commit("CLEAR_FAVORITES");
    },
  },
});
