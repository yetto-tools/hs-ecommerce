import { Fragment, use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setUsuario } from "../../store/slices/usuario-slice";
import cogoToast from "cogo-toast";

const deptos = [
  { id: 1, name: "ALTA VERAPAZ" },
  { id: 2, name: "BAJA VERAPAZ" },
  { id: 3, name: "CHIMALTENANGO" },
  { id: 4, name: "CHIQUIMULA" },
  { id: 5, name: "EL PROGRESO" },
  { id: 6, name: "ESCUINTLA" },
  { id: 7, name: "GUATEMALA" },
  { id: 8, name: "HUEHUETENANGO" },
  { id: 9, name: "IZABAL" },
  { id: 10, name: "JALAPA" },
  { id: 11, name: "JUTIAPA" },
  { id: 12, name: "PETÉN" },
  { id: 13, name: "QUETZALTENANGO" },
  { id: 14, name: "QUICHÉ" },
  { id: 15, name: "RETALHULEU" },
  { id: 16, name: "SACATEPÉQUEZ" },
  { id: 17, name: "SAN MARCOS" },
  { id: 18, name: "SANTA ROSA" },
  { id: 19, name: "SOLOLÁ" },
  { id: 20, name: "SUCHITEPÉQUEZ" },
  { id: 21, name: "TOTONICAPÁN" },
  { id: 22, name: "ZACAPA" },
];

const MyAccount = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.usuario.isLoggedIn);
  const { usuario } = useSelector((state) => state.usuario);
  const direcciones = useSelector((state) => state.usuario.address);

  // const {
  //   usuario: { usuario, direcciones, token },
  // } = useSelector((state) => state.usuario);

  useEffect(() => {
   
    if (!isLoggedIn) {  
      navigate("/login");
      const { hide } =  cogoToast.warn("Necesita iniciar Sessión " , {
        position: "bottom-left",
        onClick: () => {
          hide();
        },
      });
    }
    
  
  }, [isLoggedIn]);



  const [localUsuario, setLocalUsuario] = useState({
    id: usuario?.id || "",
    user: usuario?.user || "",
    email:usuario?.email || "",
    phone1: usuario?.phone1 || "",
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUsuario({ ...usuario, ...localUsuario }));
  };

  return (
    <Fragment>
      <SEO
        titleTemplate={t("page_my_account.title")}
        description={t("seo.my_account")}
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Mi Cuenta", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span className="fw-600">1 .</span>
                        {t("page_my_account.step_one")}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4 className="fw-600">
                              {t("page_my_account.my_account_information")}
                            </h4>
                            <h5>{t("page_my_account.my_personal_detail")}</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <input
                                  type="hidden"
                                  name="IdUsuario"
                                  min={0}
                                  value={usuario?.id}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>{t("page_my_account.first_name")}</label>
                                <input
                                  name="Nombre"
                                  type="text"
                                  maxLength={300}
                                  value={usuario?.name}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>{t("page_my_account.username")}</label>
                                <input
                                  name="Usuario"
                                  type="text"
                                  maxLength={50}
                                  value={usuario?.user}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>
                                  {t("page_my_account.email_address")}
                                </label>
                                <input
                                  name="Correo"
                                  type="email"
                                  maxLength={150}
                                  value={usuario?.email}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>{t("page_my_account.phone")}</label>
                                <input
                                  name="Telefono"
                                  type="phone"
                                  maxLength={50}
                                  value={usuario?.phone1}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">
                                {t("page_my_account.submit")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span className="fw-600">2 .</span>{" "}
                        {t("page_my_account.step_two")}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4 className="fw-600">
                              {t("page_my_account.change_password")}
                            </h4>
                            <h5>{t("page_my_account.password")}</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>{t("page_my_account.password")}</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>
                                  {t("page_my_account.password_confirm")}
                                </label>
                                <input type="password" />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">
                                {t("page_my_account.submit")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> {t("page_my_account.step_three")}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4 className="fw-600">
                              {t("page_my_account.address_entry")}
                            </h4>
                          </div>
                          {direcciones &&
                           direcciones.map((direccion) => (
                              <div className="entries-wrapper">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-info text-center">
                                      <div className="row">
                                        <form>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="billing-info">
                                              <input
                                                type="hidden"
                                                value={direccion.idUser}
                                              />
                                            </div>
                                            <div class="form-check">
                                              <input
                                                class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckChecked"
                                                checked
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexCheckChecked"
                                              >
                                                Direccion Predeterminada
                                              </label>
                                            </div>
                                            <div className="billing-info text-left">
                                              <label>
                                                {t(
                                                  "page_my_account.address_name"
                                                )}
                                              </label>
                                              <input
                                                type="text"
                                                value={direccion.name}
                                              />
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                              <div className="billing-info text-left">
                                                <label>
                                                  {t(
                                                    "page_my_account.address_street"
                                                  )}
                                                </label>
                                                <input
                                                  type=""
                                                  value={direccion.address}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                              <div className="billing-info text-left">
                                                <label>
                                                  {t(
                                                    "page_my_account.address_country"
                                                  )}
                                                </label>
                                                <select className="form-select">
                                                  <optgroup label="Paises">
                                                    <option value={1} selected>
                                                      Guatemala
                                                    </option>
                                                  </optgroup>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                              <div className="billing-info text-left">
                                                <label>
                                                  {t(
                                                    "page_my_account.address_city"
                                                  )}
                                                </label>
                                                <select className="form-select">
                                                  <optgroup label="Departamentos">
                                                    {deptos &&
                                                      deptos.map((depto) => (
                                                        <option
                                                          value={1}
                                                          selected
                                                        >
                                                          {depto.name}
                                                        </option>
                                                      ))}
                                                  </optgroup>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                              <div className="billing-info text-left">
                                                <label>
                                                  {t(
                                                    "page_my_account.address_phone"
                                                  )}
                                                </label>
                                                <input
                                                  type="tel"
                                                  value={direccion.phone}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                              <div className="billing-info text-left">
                                                <label>
                                                  {t(
                                                    "page_my_account.address_comment"
                                                  )}
                                                </label>
                                                <textarea
                                                  cols={40}
                                                  rows={3}
                                                  value={direccion.comment}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-edit-delete text-center">
                                      <button className="edit">
                                        {t("page_my_account.edit")}
                                      </button>
                                      <button>
                                        {t("page_my_account.delete")}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">
                                {t("page_my_account.submit")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;

