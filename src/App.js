import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import { FormWithNavi } from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import ProductItemDetails from "./components/ProductItemDetails";
import CardContext from "./context/CartContext";
class App extends Component {
  state = { cartList: [] };

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      }),
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === id
    );
    if (productObject.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        }),
      }));
    } else {
      this.deleteCartItem(id);
    }
  };

  deleteCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.id !== id
    );
    this.setState({ cartList: updatedCartList });
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === product.id
    );
    if (productObject) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;

            return { ...eachCartItem, quantity: updatedQuantity };
          }

          return eachCartItem;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];
      this.setState({ cartList: updatedCartList });
    }
  };
  render() {
    return (
    <CardContext.Provider
      value={{
        cartList:this.state.cartList,
        addCartItem: this.addCartItem,
        deleteCartItem: this.deleteCartItem,
        incrementCartItemQuantity: this.incrementCartItemQuantity,
        decrementCartItemQuantity: this.decrementCartItemQuantity,
        removeAllCartItems: this.removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<FormWithNavi />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductItemDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </CardContext.Provider>
    )
  }
}

export default App;
