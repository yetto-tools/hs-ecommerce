import React, { Fragment, useEffect, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import {
  fetchLogin,
  fetchRegister,
  fetchResetPassword,
} from "../../hooks/use-FetchUsuario";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, Loader2 } from "lucide-react";

const LoginRegister = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.usuario);
  const [visible, setVisible] = useState(true);
  const [activeKey, setActiveKey] = useState(
    pathname.includes("/registrarse") ? "register" : "login"
  );
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const { usuario } = useSelector((state) => state.usuario);
  useEffect(() => {
    setActiveKey(pathname.includes("/registrarse") ? "register" : "login");
  }, [pathname]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const showPasswordReset = () => {
    setVisible((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await dispatch(fetchLogin(loginData, false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [resetUsuario, setResetUsuario] = useState({
    tipo: 1,
    usuario: usuario?.usuario || "",
    claveAnterior: "",
    claveNueva: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    await dispatch(fetchResetPassword(resetUsuario));
    setResetUsuario({
      tipo: 1,
      usuario: usuario?.usuario || "",
      claveAnterior: "",
      claveNueva: "",
    });
  };
  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <SEO
        titleTemplate={t("seo.page_login_register.title")}
        description={t("seo.login_register")}
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            {
              label: t("page_login_register.label_home"),
              path: process.env.PUBLIC_URL + "/",
            },
            {
              label: t("page_login_register.label_login"),
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container
                    activeKey={activeKey}
                    onSelect={(k) => setActiveKey(k)}
                  >
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="login"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          <h4>{t("page_login_register.login")}</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="register"
                          onClick={() => {
                            navigate("/registrarse");
                          }}
                        >
                          <h4>{t("page_login_register.register")}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          {visible ? (
                            <div className="login-register-form">
                              <form onSubmit={handleLoginSubmit}>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder={t(
                                    "page_login_register.placeholder_input_user"
                                  )}
                                  required={true}
                                  onChange={handleLoginChange}
                                />
                                <input
                                  type="password"
                                  name="password"
                                  placeholder={t(
                                    "page_login_register.placeholder_input_password"
                                  )}
                                  onChange={handleLoginChange}
                                  required={true}
                                />
                                <div className="button-box text-center">
                                  <div className="login-toggle-btn">
                                    <span onClick={showPasswordReset}>
                                      {t("page_login_register.forgot_password")}
                                    </span>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn-hover-green text-center w-75 mt-2"
                                    disabled={loading}
                                  >
                                    <span>
                                      {t("page_login_register.login")}{" "}
                                      {loading ? (
                                        <Loader2 className="animate-spin" />
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <>
                              <form onSubmit={handleResetPassword}>
                                <div className="myaccount-info-wrapper login-register-form">
                                  <div className="account-info-wrapper">
                                    <h4 className="fw-600 d-flex inline-flex gap-4 mb-2">
                                      <ChevronLeft
                                        size={30}
                                        onClick={showPasswordReset}
                                      />
                                      {t("page_my_account.change_password")}
                                    </h4>
                                  </div>
                                  <div className="row mb-3">
                                    <div class="billing-info">
                                      <label htmlFor="usuario">
                                        {t("page_login_register.email")}
                                      </label>
                                      <input
                                        type="hidden"
                                        name="tipo"
                                        value="1"
                                        className="bg-white"
                                      />
                                      <input
                                        type="email"
                                        name="usuario"
                                        value={resetUsuario.usuario}
                                        placeholder="correo"
                                        onChange={handleResetPasswordChange}
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "1px solid #ebebeb",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>
                                          {t("page_my_account.password_after")}
                                        </label>
                                        <input
                                          type="password"
                                          maxLength={50}
                                          name="claveAnterior"
                                          value={resetUsuario.claveAnterior}
                                          placeholder="Contraseña Anterio"
                                          onChange={handleResetPasswordChange}
                                          style={{
                                            backgroundColor: "transparent",
                                            border: "1px solid #ebebeb",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mt-3">
                                      <div className="billing-info">
                                        <label>
                                          {t("page_my_account.password_new")}
                                        </label>
                                        <input
                                          type="password"
                                          maxLength={50}
                                          name="claveNueva"
                                          value={resetUsuario.claveNueva}
                                          placeholder="Contraseña Nueva"
                                          onChange={handleResetPasswordChange}
                                          style={{
                                            backgroundColor: "transparent",
                                            border: "1px solid #ebebeb",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="billing-back-btn">
                                      <div className="billing-btn mt-3">
                                        <button
                                          type="submit"
                                          className="px-4 py-2 button-active-hs btn-black"
                                        >
                                          {t("page_my_account.submit")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </>
                          )}
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <FormRegister />
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const FormRegister = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    idUsuario: 0,
    usuario: "",
    nombre: "",
    correo: "",
    clave: "",
    telefono: "",
  });
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(fetchRegister(registerData, false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <input
        type="hidden"
        name="idUsuario"
        value={registerData.idUsuario}
      ></input>
      <label htmlFor="usuario">{t("page_login_register.username")}</label>
      <input
        type="text"
        name="usuario"
        placeholder={t("page_login_register.placeholder_input_user")}
        onChange={handleRegisterChange}
        required={true}
        value={registerData.usuario}
      />
      <label htmlFor="usuario">{t("page_login_register.name")}</label>
      <input
        type="text"
        name="nombre"
        placeholder={t("page_login_register.placeholder_input_name")}
        onChange={handleRegisterChange}
        required={true}
        value={registerData.nombre}
      />
      <label htmlFor="correo">{t("page_login_register.email")}</label>
      <input
        name="correo"
        placeholder={t("page_login_register.placeholder_input_email")}
        type="email"
        onChange={handleRegisterChange}
        required={true}
        value={registerData.correo}
      />
      <label htmlFor="clave">{t("page_login_register.password")}</label>
      <input
        type="password"
        name="clave"
        placeholder={t("page_login_register.placeholder_input_password")}
        onChange={handleRegisterChange}
        required={true}
        value={registerData.clave}
      />

      <label htmlFor="telefono">{t("page_login_register.phone")}</label>
      <input
        name="telefono"
        placeholder={t("page_login_register.placeholder_input_phone")}
        type="tel"
        onChange={handleRegisterChange}
        required={true}
        value={registerData.telefono}
      />

      <div className="button-box text-center">
        <button
          type="submit"
          className="btn-hover-green text-center w-75 mt-2"
          disabled={loading}
        >
          <span>{t("page_login_register.register")}</span>
          {loading ? <Loader2 className="animate-spin" /> : ""}
        </button>
      </div>
    </form>
  );
};

export default LoginRegister;
