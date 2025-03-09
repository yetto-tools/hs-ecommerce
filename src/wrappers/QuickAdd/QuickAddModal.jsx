import React from "react";
import "./QuickAddModal.scss";
const QuickAddModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Fondo oscuro detrás del modal */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Contenedor del modal */}
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {/* Contenido del modal */}
        <div className="modal-content">
          {/* Imagen del producto */}
          <img
            src={product.Imagen_1}
            alt={product.Nombre_Comercial}
            className="modal-image"
            loading="lazy"
          />

          {/* Nombre del producto */}
          <h3 className="modal-title">{product.Nombre_Comercial}</h3>

          {/* Precio con descuento (si aplica) */}
          {product.Descuento_Porcentaje > 0 ? (
            <p className="modal-price">
              <span className="modal-price-original">
                Q {product.Precio_SD?.toFixed(2)}
              </span>
              <span className="modal-price-discount">
                Q {product.Precio_CD?.toFixed(2)}
              </span>
            </p>
          ) : (
            <p className="modal-price">Q {product.Precio_SD?.toFixed(2)}</p>
          )}

          {/* Botón de agregar al carrito */}
          {/* <button
            className="modal-button"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            Agregar al Carrito
          </button> */}
        </div>
      </div>
    </>
  );
};

export default QuickAddModal;
