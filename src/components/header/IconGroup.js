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

      <div className="same-style header-compare d-none d-lg-block ms-2">
        <div className="account-setting d-none d-lg-block">
          <button
            type="button"
            id="account-button"
            name="account"
            className="account-setting-active"
            onClick={(e) => handleClick(e)}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>

          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z"/></svg>
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
