import { APP_VERSION } from "../../config"
import PageContentBlank from "./PageContentBlank"

export const PageVersion = () => {
 return (
    <PageContentBlank>
         <div className="container-fluid ">            
            <div className="d-flex justify-content-center align-items-center h-100" style={{minHeight: "12dvh"}}>
                <h1>Versión: { APP_VERSION} </h1>                
            </div>
        </div>   
    </PageContentBlank>
 )
}

export default PageVersion