import React from "react";

const CardContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  deleteCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
});

export default CardContext;
