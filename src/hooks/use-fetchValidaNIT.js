import { API_NIT } from "../config";
import cogoToast from "cogo-toast";
import { setLoading, setValidacionNit, setError } from "../store/slices/validaNit-slice";

export const fetchValidaNIT = (nit) => async (dispatch) => {
  

  
    const url = `${API_NIT || "https://api.hypestreet.dssolutionsgt.com"}/api/Validar/validar-nit`;
  try {
    const body = {
        tokenCliente: "5NWyDcVJ76Fqv99",
        origen: "1",
        nit: nit,
    }
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });


    if (!response.ok) {
      throw new Error( `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
    }

    const data = await response.json(); // Primero obtener la respuesta y luego verificar el estado
    
    const {Encabezado: [Encabezado] } = data;    
    if(!Encabezado ){
      dispatch(setError(true));
      throw new Error("Error al validar NIT");
    }
    
    if(Encabezado.Respuesta === "False"){
      dispatch(setError(true));
      throw new Error(Encabezado.Descripcion);
    }    
    
    if(Encabezado.Descripcion.includes("[CF]")){
      const regex = /\[(.+?)\]/g;
      const Nombre =  [...Encabezado.Descripcion.matchAll(regex)].map(m => m[1]).toString() ; 
      const Nit = Nombre.split(',')[0];
      const Nombre_Comercial = Nombre
      dispatch(setValidacionNit({Nit,Nombre, Nombre_Comercial}));
    }
    else{
      const { Detalle:[Detalle] } =  data;
      console.log(Detalle);
      dispatch(setValidacionNit(Detalle));
    }
      
    
    cogoToast.success( Encabezado.Descripcion, {
      position: "top-center",
    });
    dispatch(setError(false));
  } catch (error) {
    dispatch(setError(true));
    const  { hide } = cogoToast.warn(`${error.message}`, {
      position: "top-center",
      onClick: () => {
        hide()
      }
    });
    
  } finally {
    dispatch(setLoading(false));
  }
};
