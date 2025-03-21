
import { useSelector } from "react-redux";
import MarkdownRenderer from "./MarkdownRenderer";
import PageContentBlank from "./PageContentBlank";
import { useEffect, useState } from "react";




export const PageTerminosYCondiciones = () => {

 const { params } = useSelector((state) => state.paramsWeb);
const [storeInfo, setStoreInfo] = useState ({});
  

  useEffect(() => {    
    if (params?.length) {
      const mapping = {
        NOMBRETIENDA: "tienda",
        TELEFONO: "telefono",
        CORREO: "correo",
        HORARIO: "horario"
      };
  
      const newStoreInfo = params.reduce((acc, param) => {
        const key = mapping[param.Nombre];
        if (key) {
          acc[key] = param.Valor;
        }
        return acc;
      }, {});
  
      // Actualizar el estado con la información de la tienda
      
      setStoreInfo(newStoreInfo);
      
    }
  }, [params]);


  const empresaInfo = {
    company: storeInfo.tienda,
    email: storeInfo.correo,
    phone: storeInfo.telefono,
    schedule: storeInfo.horario
  };
  console.log(empresaInfo)
  const generateMarkdown = ({ company, email, phone, schedule }) => `
# Términos del Servicio

---  


## Servicio al Cliente 

En **${company}** esperamos que disfrutes la experiencia de compra online y que encuentres aquellos productos que estás buscando. Si tienes cualquier duda o comentario, puedes comunicarte con nosotros a través de nuestro número de Atención al Cliente:

📞 **[${phone}](tel:502${phone})**

O bien, enviándonos un correo a 📧 [${email}](mailto:${email})

Nuestro horario de atención es de **${schedule}**  
¡Llámanos o mándanos un correo, y con gusto te atenderemos! 😊


---  
<br/>

## Entrega del Producto

**${company}** se compromete a entregar los productos adquiridos por el cliente en perfecto estado, en el domicilio que el cliente señale en el formulario de pedido, siempre que éste se ubique dentro del **Territorio Nacional**.

Con el fin de optimizar la entrega, el Cliente deberá indicar un domicilio en el cual el pedido pueda ser entregado dentro de un horario laboral habitual, es decir entre:

📅 🕘 **${schedule}**  


### Consideraciones sobre la entrega:

1. **${company}** no será responsable por los errores causados en la entrega cuando el domicilio introducido por el Cliente en el formulario del pedido no exista, no se ajuste a la realidad o haya datos omitidos.
2. **${company}** informa al Cliente que es posible que un mismo pedido se divida en varias entregas.
3. **${company}** se reserva el derecho de cancelar o limitar la entrega de un pedido con base en la cobertura de la mensajería y la particularidad de la campaña.
`;

    return (
        <PageContentBlank>
            <MarkdownRenderer  content={generateMarkdown(empresaInfo)} />
        </PageContentBlank>
    )
}

export default PageTerminosYCondiciones;