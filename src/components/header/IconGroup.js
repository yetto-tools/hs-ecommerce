import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { fetchSearchArticles } from "../../hooks/use-FetchArticles";
import { useRef, useState } from "react";
import { logout } from "../../store/slices/usuario-slice";
import { setLoading } from "../../store/slices/articleDetail-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef(null);

  const handleClick = (e) => {
    if (!userRef.current.contains(e.target)) {
      e?.currentTarget?.nextSibling?.classList?.toggle("active");
    }
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const { cartItems } = useSelector((state) => state.cart);

  const { usuario } = useSelector((state) => state.usuario);
  const isLoggedIn = useSelector((state) => state.usuario.isLoggedIn);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const isSearchingRef = useRef(false); // Nuevo: para bloquear Enter de verdad
  const debounceRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout()); // Disparar la acción de logout
    navigate("/inicio");
  };

  const handleKeyUp = (e) => {
    try {
      if (e.key === "Enter" && !isLoading) {
        setIsLoading(true);
        e.preventDefault();

        const cleanedValue = value.trim().toLowerCase();

        // 🚫 No permitir si ya estoy buscando
        if (isSearchingRef.current) {
          console.log("Ya estoy buscando, ignoro el Enter");
          return;
        }

        // 🚫 No permitir buscar si el valor no cambió
        if (cleanedValue === "" || cleanedValue === lastSearch) {
          console.log("Búsqueda vacía o repetida");
          return;
        }

        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        isSearchingRef.current = true; // 🔥 Bloqueo Enter apenas arranco

        debounceRef.current = setTimeout(() => {
          navigate("/productos?busqueda=" + cleanedValue);
          setLastSearch(cleanedValue);

          // 🔥 Después de 1 segundo (o puedes esperar respuesta del API), liberamos el bloqueo
          setTimeout(() => {
            isSearchingRef.current = false;
          }, 1200); // da un pequeño colchón para evitar spam
        }, 300); // puedes ajustar el tiempo de debounce si quieres
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        />
      </div>
      <div className="same-style header-compare d-none d-lg-block ms-2">
        <div className="account-setting d-none d-lg-block">
          <button
            type="button"
            id="account-button"
            name="account"
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
          <div
            className="account-dropdown"
            style={{ width: "280px" }}
            ref={userRef}
          >
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login"}>
                  <span className="text-ellipsis">
                    {(usuario && usuario.id && `${usuario.email}`) ||
                      t("icon_group.login")}
                  </span>
                </Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to={process.env.PUBLIC_URL + "/registrarse"}>
                    <span className="text-ellipsis">
                      {t("icon_group.register")}
                    </span>
                  </Link>
                </li>
              )}

              <li>
                <Link to={process.env.PUBLIC_URL + "/mi-cuenta"}>
                  {t("icon_group.my_account")}
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link
                    to={""}
                    onClick={handleLogout}
                    className="text-sm text-black"
                  >
                    {t("icon_group.logout")}
                    <i className="pe-7s-exit" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="same-style cart-wrap d-none d-lg-block ms-2">
        <button
          type="button"
          id="cart-button"
          name="cart"
          className="icon-cart"
          onClick={(e) => handleClick(e)}
        >
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
