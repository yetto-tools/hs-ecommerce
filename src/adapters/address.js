
export const NewAddressData = (data) =>{
    return {
       idUsuario:data.idUser, 
       nombre : data.name, 
       idPais : data.idPais, 
       idDepartamento : data.idDepto, 
       idMunicipio : data.idCity, 
       telefono : data.phone, 
       direccion : data.address, 
       observaciones : data.comment, 
       predeterminada : data.default, 
       estado :data.estate
    }
   } ;



export const NewAddress = () =>{
 return {
    idUsuario:"", 
    nombre : "", 
    idPais : "", 
    idDepartamento : "", 
    idMunicipio : "", 
    telefono : "", 
    direccion : "", 
    observaciones : "", 
    predeterminada : "", 
    estado :""
 }
} ;