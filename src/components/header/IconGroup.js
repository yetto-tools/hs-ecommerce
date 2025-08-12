import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { useTranslation } from "react-i18next";

import { useRef, useState } from "react";
import { logout } from "../../store/slices/usuario-slice";

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
            className="icon-cart"
            onClick={(e) => handleClick(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="currentColor"
              className="color-icon"
            >
              <path d="M185-80q-16.33 0-29.17-12.83Q143-105.67 143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
            </svg>
          </button>
          <div
            className="account-dropdown"
            style={{ width: "145px" }}
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

      <div className="same-style header-compare d-none d-lg-block ms-2">
        <div className="account-setting d-none d-lg-block">
          <button
            type="button"
            id="account-button"
            name="account"
            className="icon-cart"
            onClick={(e) => handleClick(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="currentColor"
            >
              <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
          <div
            className="account-dropdown"
            style={{ width: "145px" }}
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
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="color-icon"
          >
            <path d="M226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-506.66q0-27 19.83-46.84Q199.67-720 226.67-720h100v-6.67q0-64 44.66-108.66Q416-880 480-880t108.67 44.67q44.66 44.66 44.66 108.66v6.67h100q27 0 46.84 19.83Q800-680.33 800-653.33v506.66q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm0-66.67h506.66v-506.66h-100v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66H393.33v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66h-100v506.66ZM393.33-720h173.34v-6.67q0-36.33-25.17-61.5-25.17-25.16-61.5-25.16t-61.5 25.16q-25.17 25.17-25.17 61.5v6.67ZM226.67-146.67v-506.66 506.66Z" />
          </svg>

          {cartItems && cartItems.length > 0 ? (
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          ) : null}
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="color-icon"
          >
            <path d="M226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-506.66q0-27 19.83-46.84Q199.67-720 226.67-720h100v-6.67q0-64 44.66-108.66Q416-880 480-880t108.67 44.67q44.66 44.66 44.66 108.66v6.67h100q27 0 46.84 19.83Q800-680.33 800-653.33v506.66q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm0-66.67h506.66v-506.66h-100v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66H393.33v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66h-100v506.66ZM393.33-720h173.34v-6.67q0-36.33-25.17-61.5-25.17-25.16-61.5-25.16t-61.5 25.16q-25.17 25.17-25.17 61.5v6.67ZM226.67-146.67v-506.66 506.66Z" />
          </svg>
          {cartItems && cartItems.length > 0 ? (
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          ) : null}
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button text-white"
          onClick={() => triggerMobileMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
            className="color-icon"
          >
            <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
