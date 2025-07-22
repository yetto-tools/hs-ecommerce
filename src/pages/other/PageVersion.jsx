import { APP_ENV, APP_VERSION, DB_ENV } from "../../config";
import PageContentBlank from "./PageContentBlank";

export const PageVersion = () => {
  return (
    <PageContentBlank>
      <div className="container-fluid ">
        <div
          className="d-flex justify-content-center flex-column align-items-center h-100"
          style={{ minHeight: "12dvh" }}
        >
          <h1>Versión: {APP_VERSION} </h1>

          <p>env: {APP_ENV} </p>
          <p>db: {DB_ENV} </p>
          <p>{`${window.location.origin}`}</p>
        </div>
      </div>
    </PageContentBlank>
  );
};

export default PageVersion;
