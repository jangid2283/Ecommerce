import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import CardContext from "../../context/CartContext";
import './index.css'

function Header() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  function onClickLogout() {
    cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  }
  const renderCartItemsCount = () => (
    <CardContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartItemCount = cartList.length;
        return (
          <>
            {cartItemCount > 0 ? (
              <span className="cart-count-badge">{cartItemCount}</span>
            ) : null}
          </>
        );
      }}
    </CardContext.Consumer>
  );
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/cart" className="nav-link">
              Cart
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        
      </div>
    </nav>
  );
}
export default Header;
