import React from "react";
import clsx from "clsx";

const BrandGrid = () => {
  const brands = [
    {
      id: 1,
      logo: "",
      image: "/assets/img/marcas/new era.jpg",
      name: "new era",
    },
    {
      id: 2,
      logo: "",
      image: "/assets/img/marcas/mitchelle & ness.jpg",
      name: "mitchell & ness",
    },
    {
      id: 3,
      logo: "",
      image: "/assets/img/marcas/adidas.jpg",
      name: "adidas",
    },
    {
      id: 4,
      logo: "",
      image: "/assets/img/marcas/nike.jpg",
      name: "nike",
    },
    {
      id: 5,
      logo: "",
      image: "/assets/img/marcas/jordan.jpg",
      name: "jordan",
    },
    {
      id: 6,
      logo: "",
      image: "/assets/img/marcas/puma.jpg",
      name: "puma",
    },
    {
      id: 7,
      logo: "",
      image: "/assets/img/marcas/new balance.jpg",
      name: "new balance",
    },
    {
      id: 8,
      logo: "",
      image: "/assets/img/marcas/asics.jpg",
      name: "asics",
    },
  ];

  return (
    <div className="mt-40">
      <div className="container">
        <div className="row col-12 mx-auto mb-4 mt-40 text-center">
          <h2 className="text-6xl font-medium uppercase stretch-pro">Marcas</h2>
        </div>
        <div className="row">
          {brands.map((brand) => (
            <div key={brand.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="position-relative brand-card">
                <img src={brand.image} alt={brand.name} className="img-fluid" />
                <div className="overlay"></div>
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{ width: "128px", height: "128px" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-xl">
            VER MÁS
            <span className="d-block text-center">&#9662;</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandGrid;
