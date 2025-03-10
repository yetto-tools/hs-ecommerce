import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import { fetchLogin } from "../../hooks/use-FetchUsuario";
import { useDispatch } from "react-redux";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determina la pestaña activa basándose en la ruta
  const [activeKey, setActiveKey] = useState(
    pathname.includes("/registrarse") ? "register" : "login"
  );

  useEffect(() => {
    // Actualiza la pestaña activa cuando cambia la ruta
    setActiveKey(pathname.includes("/registrarse") ? "register" : "login");
  }, [pathname]);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    usuario: "",
    password: "",
    email: "",
    telefono: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {};
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    await dispatch(fetchLogin(loginData));
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
                              <div className="button-box">
                                <div className="login-toggle-btn hidden">
                                  <input type="checkbox" />
                                  <label className="ml-10">
                                    {t("page_login_register.remember_me")}
                                  </label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    {t("page_login_register.forgot_password")}
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>{t("page_login_register.login")}</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder={t(
                                  "page_login_register.placeholder_input_user"
                                )}
                                onChange={handleLoginChange}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder={t(
                                  "page_login_register.placeholder_input_password"
                                )}
                                onChange={handleLoginChange}
                              />

                              <input
                                name="user-email"
                                placeholder={t(
                                  "page_login_register.placeholder_input_email"
                                )}
                                type="email"
                                onChange={handleLoginChange}
                              />
                              <input
                                name="telefono"
                                placeholder={t(
                                  "page_login_register.placeholder_input_phone"
                                )}
                                type="email"
                                onChange={handleLoginChange}
                              />

                              <div className="button-box">
                                <button type="button">
                                  <span>
                                    {t("page_login_register.register")}
                                  </span>
                                </button>
                              </div>
                            </form>
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

export default LoginRegister;
