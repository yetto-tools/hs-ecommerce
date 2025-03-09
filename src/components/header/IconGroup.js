import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";

const IconGroup = ({ iconWhiteClass }) => {
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block mx-2 ">
        <input
          type="search"
          placeholder="Buscar..."
          className="rounded px-2 py-1 text-black row col-8 col-md-5 col-lg-8 col-xxl-11"
          style={{
            background: "#ebebeb",
            border: "none",
            height: "32px",
            color: "#000",
            marginLeft: "10px",
          }}
        />
        {/* 
        
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Buscar..." />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div> 
        
        */}
      </div>
      <div className="same-style header-compare d-none d-lg-block ms-2">
        <div className="account-setting d-none d-lg-block">
          <button
            className="account-setting-active"
            onClick={(e) => handleClick(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                fill: "currentColor",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                width: "24px",
                height: "24px",
              }}
            >
              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
            </svg>
          </button>
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {t("icon_group.login")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {t("icon_group.register")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {t("icon_group.my_account")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="same-style header-wishlist d-none d-lg-block mx-3">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
              {
                wishlistItems.length > 0
                ? <i className="fa fa-heart" style={{color: "#d21425"}}/> 
                : <i className="pe-7s-like" /> 
              }
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style cart-wrap d-none d-lg-block ms-2">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              fill: "rgb(255, 255, 255)",
            }}
          >
            <path d="M21 4H2v2h2.3l3.521 9.683A2.004 2.004 0 0 0 9.7 17H18v-2H9.7l-.728-2H18c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 4z"></path>
            <circle cx="10.5" cy="19.5" r="1.5"></circle>
            <circle cx="16.5" cy="19.5" r="1.5"></circle>
          </svg>

          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <ShoppingCart size={24} color="#ffffff" strokeWidth={1.5} />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button text-white"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
