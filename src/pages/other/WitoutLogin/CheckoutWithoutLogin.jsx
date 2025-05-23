// BacCheckout.jsx
import { Fragment, use, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader2, Send } from "lucide-react";

import SEO from "../../../components/seo";
import { ResumenCompra } from "../ResumenCompra";
import { Breadcrumb } from "react-bootstrap";
import LayoutOne from "../../../layouts/LayoutOne";
import { getDiscountPrice } from "../../../helpers/product";
import FormDeliveryAddress from "./FormAddress";
import { useDeliveryAddressForm } from "./useDeliveryAddressForm";
import { useCheckoutWithoutLogin } from "./useCheckoutWithoutLogin";
import { addressJsonToXml, calcularIVAIncluido } from "../../../helpers/validator";
import { CreditCardForm } from "../../payment/CreditCardForm";
import { adapterFormBAC, dataPaymentForm } from "../../../adapters/DataPaymentForm";
import { fetchCartOrder } from "../../../hooks/useFetchCartOrder";
import { showToast } from "../../../toast/toastManager";






const CheckoutWithoutLogin = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const {cartOrder} = useSelector((state) => state.cartOrder);
  const [formBAC, setFormBAC ] = useState(adapterFormBAC);
  const [disableButton, setDisableButton] = useState(false);

  const {
    formData,
    country,
    paisesFiltrados,
    deptosFiltrados,
    municipiosFiltrados,
    isValid,
    isFormValid,
    handleChange,
    setFormData,

  } = useDeliveryAddressForm();

  const { cartTotalPrice, handleSendOrder, loadingOrder,handleSaveCartToOrder, postToCredomatic } =
    useCheckoutWithoutLogin();


  const handleSubmitInvoces = (e) => {
    e.preventDefault();
    const {
      nombre,
      nameCliente,
      nitCliente,
      correo,
      direccion,
      idPais,
      idDepartamento,
      idMunicipio,
      observaciones,
    } = formData;

    const clienteDireccion = addressJsonToXml(
      {
        nombre,
        nameCliente,
        nitCliente,
        correo,
        direccion,
        idPais,
        idDepartamento,
        idMunicipio,
        observaciones,
      },
      "clienteDireccion"
    );
    console.log(clienteDireccion);

    handleSendOrder(e, formData, clienteDireccion);
  };
  const handleDEBUG = () => {
    console.log(isValid);
  };

  const [cardValues, setCardValues] = useState(dataPaymentForm());

  const handleCardDebug = () => {
    console.log(cardValues);
  };




  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDisableButton(true);
    console.log({formData, cardValues});

   if(formData.nombre === "" || formData?.nombre?.length === 0){
      document.getElementById('nombre')?.focus();
      showToast("Falta el NOMBRE del cliente", "warn",'top-center');
      setDisableButton(false);
      return
    }

    if(formData.correo === "" || formData?.correo?.length === 0){
      document.getElementById('correo')?.focus();
      showToast("Falta el CORREO electronico del cliente", "warn",'top-center');
      setDisableButton(false);
      return
    }
    if(formData.telefono === "" || formData?.telefono?.length === 0 || formData?.telefono?.length < 7 || isNaN(formData?.telefono?.toString()) || formData?.telefono?.toString()?.length >= 12){
      document.getElementById('telefono')?.focus();
      showToast("Falta el TELEFONO del cliente, debe ser de 8 digitos: ejeplo: 32323232", "warn",'top-center');
      setDisableButton(false);
      return
    }
    if(formData.idPais === "" || formData?.idPais?.length === 0){
      document.getElementById('idPais')?.focus();
      showToast("falta el PAIS ", "warn",'top-center');
      setDisableButton(false);
      return
    }
    if(formData.idDepartamento === "" || formData?.idDepartamento?.length === 0){
      document.getElementById('idDepartamento')?.focus();
      showToast("falta el DEPARTAMENTO ", "warn",'top-center');
      setDisableButton(false);
      return
    }
    if(formData.idMunicipio === "" || formData?.idMunicipio?.length === 0){
      document.getElementById('idMunicipio')?.focus();
      showToast("falta el MUNICIPIO ", "warn",'top-center');
      setDisableButton(false);
      return
    }
 
    if(formData.direccion === "" || formData?.direccion?.length === 0){
      document.getElementById('direccion')?.focus();
      showToast("Falta la DIRECCION del cliente", "warn",'top-center');
      setDisableButton(false);
      return
    }
    
    if(formData.nitInput === "" || formData?.nitInput?.length === 0){
      document.getElementById('nitInput')?.focus();
      showToast("falta el NIT", "warn",'top-center');
      setDisableButton(false);
      return
    }
    else{
      document.getElementById('btn-validar-nit')?.click();
    }
    if(formData.nitCliente === "" || formData?.nitCliente?.length === 0 || formData?.nitCliente?.toString()?.length >= 15){
      document.getElementById('nitInput')?.focus();
      showToast("falta el Validar el NIT ingresado", "warn",'top-center');
      setDisableButton(false);
      return
    }
    

    await setTimeout(async () => {
      setDisableButton(false);
    },5000)

    
    
    // 1. verificar stock y formatear datos de la orden y pago
    const  Order = await handleSaveCartToOrder(e, formData, formBAC.clienteDireccion);
    
    // 2. Crear el carrito y esperar la respuesta
    const cartOrderData = await dispatch(fetchCartOrder(Order));

    if (!cartOrderData || cartOrderData.length === 0) {
      showToast("No se pudo generar el carrito", "error");
      return;
    }

    // 3. Extraer el UIdCarrito y continuar con el proceso de pago
    const { UIdCarrito } = cartOrderData;
    if (!UIdCarrito) {
      showToast("No se pudo recuperar el UIdCarrito", "error");
      return;
    }

    if (cartOrderData ) {
      await postToCredomatic(UIdCarrito, cardValues);
    }





  
};


  return (
    <Fragment>
      <SEO
        titleTemplate="Confirmación"
        description="Confirmación de compra, HypeStreet Guatemala"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Confirmación", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container-xl">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-6 border-end border-end-lg-0">
                  <div className="billing-info-wrap mb-5">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="border-bottom p-4 rounded mt-0">
                          <FormDeliveryAddress
                            formData={formData}
                            setFormData={setFormData}
                            country={country}
                            paisesFiltrados={paisesFiltrados}
                            deptosFiltrados={deptosFiltrados}
                            municipiosFiltrados={municipiosFiltrados}
                            isValid={isValid}
                            handleChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  <div className="billing-info-wrap mb-5">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="border-bottom p-4 rounded mt-0">
                          <h3 onClick={() => handleCardDebug()}>
                            Confirmar Orden de Compra
                          </h3>

                          <CreditCardForm
                            handleSubmitPayment={handleSubmitPayment}
                            cardValues={cardValues}
                            setCardValues={setCardValues}
                            setDisableButton={setDisableButton}
                            disableButton={disableButton}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />
       
                </div>

                <div className="col-lg-1"></div>

                <div className="col-lg-5">
                  <ResumenCompra
                    cartItems={cartItems}
                    cartTotalPrice={cartTotalPrice}
                    currency={currency}
                    getDiscountPrice={getDiscountPrice}
                    t={t}
                    i18n={i18n}
                  />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      <Link to={process.env.PUBLIC_URL + "/"}>Ir a Inicio</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default CheckoutWithoutLogin;
