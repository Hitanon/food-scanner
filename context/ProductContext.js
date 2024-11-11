import React, { createContext } from "react";
import { observer } from "mobx-react-lite";
import ProductListStore from "../stores/ProductListStore";
import Product from "../stores/ProductStore";

export const ProductContext = createContext();

export const ProductProvider = observer(({ children }) => {
  const selectedProduct = new Product({
    id: "",
    name: "",
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    weight: 0,
    dateAdded: "",
  });

  return (
    <ProductContext.Provider value={{ ProductListStore, selectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
});
