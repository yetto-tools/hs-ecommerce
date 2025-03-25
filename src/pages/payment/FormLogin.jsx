import clsx from "clsx";
import { Loader2, LogIn } from "lucide-react";
import { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLogin } from "../../hooks/use-FetchUsuario";

export const FormLogin = ({ style , inputRef}) => {
  
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.usuario);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleShowLogin = () => {
    setShowLogin((prev) => !prev);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
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
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!usuario) {
      setLoginData({ id: 0, email: "", password: "" });
    }
  }, [usuario]);



  return (
    <form onSubmit={handleLoginSubmit} method="post">
      <div className="billing-info pb-4">
        {usuario ? (
          <div className="mb-5">
            <h3>Usuario</h3>
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
              <h3 className="container px-0 row">
                <span
                  onClick={handleShowLogin}
                  aria-expanded={showLogin}
                  className="col-lg-6 col-md-6 px-0"
                >
                  {showLogin ? (
                    <b>{!usuario ? "Credenciales" : ""}</b>
                  ) : (
                    <b>Iniciar sesión</b>
                  )}
                </span>
                <span className="col-lg-6 col-md-6  text-end">
                  <Link to={process.env.PUBLIC_URL + "/registrarse"}>
                    <small>Registrarse</small>
                  </Link>
                </span>
              </h3>
              {showLogin && (
                <>
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-12 pl-0 pr-1">
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
                    <div className="col-lg-5 col-md-5 col-12  pl-0 pr-1">
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
                    <div className="col-md-2 col-12 px-0 pb-0">
                      <label htmlFor=""></label>
                      <button
                        type="submit"
                        className="btn-hover-green text-center w-100 mt-2"
                        style={style}
                        disabled={loading}
                      >
                        {" "}
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <LogIn className="postion-fixed" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <hr></hr>
      </div>
    </form>
  );
};
