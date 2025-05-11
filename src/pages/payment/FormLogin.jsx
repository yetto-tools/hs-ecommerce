import clsx from "clsx";
import { Loader2, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLogin } from "../../hooks/use-FetchUsuario";
import { logout } from "../../store/slices/usuario-slice";
import { Modal } from "react-bootstrap";
import RegisterForm from "../other/RegisterForm";
import { showToast } from "../../toast/toastManager";

export const FormLogin = ({ setFormValues, style, inputRef }) => {
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.usuario);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);

      await dispatch(fetchLogin(loginData, false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = typeof value === "string" ? value.trim() : value;

    setLoginData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    setFormValues((prev) => ({
      ...prev,
      idCliente: cleanedValue,
    }));
  };

  useEffect(() => {
    if (!usuario) {
      setLoginData({ id: 0, email: "", password: "" });
    } else {
      setFormValues((prev) => ({
        ...prev,
        ["idCliente"]: usuario.id,
        ["phone"]: usuario.phone1,
      }));
    }
  }, [usuario]);
  const handleDebug = () => {
    console.log(usuario);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleShowRegister = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit} method="post">
        <div className="billing-info pb-4" id="login-section">
          {usuario ? (
            <div className="mb-5">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h3 onClick={handleDebug}>Usuario</h3>
                </div>
                <div>
                  <h4
                    onClick={handleLogout}
                    className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-1"
                  >
                    Salir
                  </h4>
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="row">
                  <div className="">
                    <input
                      id="idCliente"
                      name="idCliente"
                      value={usuario.id}
                      readOnly
                      type="hidden"
                    />
                  </div>
                  <div className="col-6 mt-4 ">
                    <label htmlFor="name">Nombre:</label>
                    <input
                      id="name"
                      name="name"
                      value={usuario.name}
                      readOnly
                      className="read-only-input"
                      ref={inputRef}
                    />
                  </div>
                  <div className="col-6 mt-4">
                    <label htmlFor="email">Correo:</label>
                    <input
                      id="email"
                      name="email"
                      value={usuario.email}
                      readOnly
                      className="read-only-input"
                    />
                  </div>
                  <div className="col-6 mt-4">
                    <label htmlFor="phone">Telefono:</label>
                    <input
                      id="phone"
                      name="phone"
                      value={usuario.phone1}
                      readOnly
                      className="read-only-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 d-flex flex-wrap flex-row justify-content-between align-items-center container mb-4">
              <div
                className={clsx(
                  "px-0",
                  showLogin && "col-lg-12",
                  "col-lg-12  text-left"
                )}
              >
                <h3 className="container px-0 mx-0 row">
                  Información de Usuario
                </h3>
                <hr />

                {showLogin && (
                  <>
                    <div className="row">
                      <div className="row col-lg-12 col-md-12 mx-auto">
                        <div className="col-lg-6 col-md-6 col-12">
                          <label htmlFor="email" className="text-left w-100">
                            Correo:
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="correo"
                            onChange={handleLoginChange}
                            value={loginData.email}
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-12  pl-0 pr-1">
                          <label htmlFor="password" className="text-left w-100">
                            Contraseña:
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="contraseña"
                            onChange={handleLoginChange}
                            value={loginData.password}
                            required
                          />
                        </div>
                      </div>

                      <div className="row col-lg-12 col-md-12 mx-auto">
                        <div className="mt-4 row col-lg-12 col-md-12 mx-auto">
                          <div className="col-lg-5 col-md-5 col-5 px-0 pb-0">
                            <button
                              id="btn-login"
                              type="submit"
                              className="btn-hover-green text-center w-100 mt-2"
                              style={style}
                              disabled={loading}
                            >
                              {" "}
                              {loading ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                                  <span className="fw-bold">
                                    Iniciar Sesión
                                  </span>
                                  <LogIn className="postion-fixed" />
                                </div>
                              )}
                            </button>
                          </div>

                          <div className="col-lg-7 col-md-7 col-7 px-0 pb-0">
                            <div className="row col-lg-12 col-md-12 mx-auto">
                              <div className="d-flex flex-column justify-content-center align-items-center ">
                                <Link
                                  className="fw-bold fs-5 text-center w-100 px-4 py-2 row d-flex flex-column"
                                  onClick={handleShowRegister}
                                  to={process.env.PUBLIC_URL + "/checkout"}
                                >
                                  Registrate
                                  <span className="text-xs">
                                    ¿No tienes una cuenta?
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
      <Modal
        show={showRegister}
        onHide={handleShowRegister}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton>
          <div className="row col-md-12 text-center">
            <h3 className="modal-title fw-semibold">
              {" "}
              <span className="fw-bold">Registrate</span>
            </h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section className="modal-body py-0">
            <div className="row">
              <div className="col-md-8 col-sm-12 col-xs-12 mx-auto">
                <RegisterForm
                  showRegister={showRegister}
                  setShowRegister={setShowRegister}
                />
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <div className="py-10"></div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
