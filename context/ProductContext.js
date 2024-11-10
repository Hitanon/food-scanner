import React, { createContext } from "react";
import { observer } from "mobx-react-lite";
import ProductListStore from "../stores/ProductListStore";

export const ProductContext = createContext();

export const ProductProvider = observer(({ children }) => {
  return (
    <ProductContext.Provider value={ProductListStore}>
      {children}
    </ProductContext.Provider>
  );
});
