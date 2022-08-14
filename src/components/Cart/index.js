import React from "react";

import Header from "../Header";
import CartListView from "../CartListView";
import CardContext from "../../context/CartContext";
import EmptyCartView from "../EmptyCartView";
import CartSummary from "../CartSummary"
import './index.css'

const Cart = () => (
  <>
    <CardContext.Consumer>
      {(value) => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        const onClickRemoveAllBtn = () => {
          removeAllCartItems()
        }
        return (
          <>
            <Header />
            <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
          </>
        );
      }}
    </CardContext.Consumer>
  </>
);

export default Cart;
