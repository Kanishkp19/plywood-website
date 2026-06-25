/**
 * QuoteContext.jsx
 * Global state management for the wholesale Request for Quote (RFQ) basket.
 * Handles adding, removing, updating quantities, and clearing quote items.
 */

import { createContext, useContext, useReducer, useCallback } from "react";

// ─────────────────────────────────────────────
//  Shape of a single quote item
//  { id, name, category, thickness, quantity, unit }
// ─────────────────────────────────────────────

const QuoteContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false, // drawer / panel visibility
};

// ── Reducer ──────────────────────────────────
function quoteReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };

    case "CLEAR_QUOTE":
      return { ...state, items: [] };

    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ── Provider ─────────────────────────────────
export function QuoteProvider({ children }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD_ITEM", payload: { quantity: 1, ...item } });
    dispatch({ type: "OPEN_DRAWER" });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearQuote = useCallback(() => {
    dispatch({ type: "CLEAR_QUOTE" });
  }, []);

  const toggleDrawer = useCallback(() => {
    dispatch({ type: "TOGGLE_DRAWER" });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "CLOSE_DRAWER" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    totalItems,
    addItem,
    removeItem,
    updateQuantity,
    clearQuote,
    toggleDrawer,
    closeDrawer,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────
export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
