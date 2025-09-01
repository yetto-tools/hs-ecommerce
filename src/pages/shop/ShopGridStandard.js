import { Fragment, useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {
  fetchArticles,
  fetchSearchArticles,
} from "../../hooks/use-FetchArticles";
import ShopSidebarFilters from "./ShopSidebarFilters";

const ShopProducts = lazy(() => import("../../wrappers/product/ShopProducts"));

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { filteredArticles } = useSelector((state) => state.articles);
  const { params } = useSelector((state) => state.urlParams);
  const filters = useSelector((state) => state.filters);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda");

  const { pathname } = location;
  const dispatch = useDispatch();

  const [n1 = 0, n2 = 0, n3 = 0] = params?.split("/").map(Number) || [];

  useEffect(() => {
    if (!busqueda) {
      dispatch(fetchArticles(n1 || 0, n2 || 0, n3 || 0));
    } else {
      dispatch(fetchSearchArticles(busqueda));
    }
  }, [dispatch, searchParams, params]); // eslint-disable-line

  const getLayout = (layout) => setLayout(layout);

  // Bloquear el scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [drawerOpen]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Tienda en Línea"
        description="Adidas, Nike, New balance, Jordan, Puma, Reebok."
        image={`${process.env.REACT_APP_IMAGE_ROOT}/logo-w-colors.png`}
      />

      {/* Estilos mínimos del drawer */}
      <style>{`
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          visibility: hidden;
          transition: opacity .2s ease, visibility .2s ease;
          z-index: 1040;
        }
        .drawer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: min(85vw, 360px);
          max-width: 100%;
          background: #fff;
          transform: translateX(-100%);
          transition: transform .25s ease;
          z-index: 1050;
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          display: flex;
          flex-direction: column;
        }
        .drawer-header {
          padding: 1rem 1rem;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .drawer-body {
          overflow: auto;
          padding: .75rem 1rem 1rem;
          flex: 1;
        }
        .drawer-open .drawer-overlay {
          opacity: 1;
          visibility: visible;
        }
        .drawer-open .drawer {
          transform: translateX(0);
        }
        .btn-filter {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
        }
      `}</style>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Tienda", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className={`shop-area pt-10 pb-100 ${drawerOpen ? "drawer-open" : ""}`}>
          <div className="container-fluid">
            <div className="row col-lg-12 mx-auto">
              {/* Sidebar desktop (oculto en móvil) */}
              <aside className="col-xl-2 col-lg-3 order-2 order-lg-1 border-right d-none d-lg-block">
                <ShopSidebarFilters filters={filters} sideSpaceClass="" />
              </aside>

              <main className="col-xl-10 col-lg-9 order-1 order-lg-2 mx-auto">
                {/* Barra superior móvil con botón de filtros */}
                <div className="d-flex d-lg-none justify-content-between align-items-center mb-3 px-2">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm btn-filter"
                    onClick={() => setDrawerOpen(true)}
                    aria-controls="mobile-filters-drawer"
                    aria-expanded={drawerOpen}
                    aria-label="Abrir filtros"
                  >
                    {/* Ícono simple de “hamburguesa” */}
                    <span style={{ display: "inline-block", width: 18 }}>
                      <span style={{ display: "block", height: 2, margin: "3px 0", background: "currentColor" }}></span>
                      <span style={{ display: "block", height: 2, margin: "3px 0", background: "currentColor" }}></span>
                      <span style={{ display: "block", height: 2, margin: "3px 0", background: "currentColor" }}></span>
                    </span>
                    Filtros
                  </button>

                  {/* (Opcional) selector de layout u ordenamiento aquí */}
                </div>

                {/* Productos */}
                <ShopProducts
                  layout={layout}
                  products={filteredArticles.length ? filteredArticles : null}
                />

                {/* paginación */}
                <div className="pro-pagination-style text-center mt-30"></div>
              </main>
            </div>
          </div>

          {/* Drawer móvil */}
          <div
            className="drawer-overlay d-lg-none"
            onClick={() => setDrawerOpen(false)}
            aria-hidden={!drawerOpen}
          />
          <section
            id="mobile-filters-drawer"
            className="drawer d-lg-none"
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
            tabIndex="-1"
          >
            <div className="drawer-header">
              <h6 className="m-0">Filtros</h6>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar filtros"
              >
                Cerrar
              </button>
            </div>
            <div className="drawer-body">
              <ShopSidebarFilters filters={filters} sideSpaceClass="" />
            </div>
          </section>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
