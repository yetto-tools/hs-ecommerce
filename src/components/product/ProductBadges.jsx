// ProductBadges.jsx
import React from "react";

export const ProductBadges = ({ product, t }) => {
  if (!product) return null;

  // Caso 1: Sin stock → mostrar Agotado
  if (product.stock === 0) {
    return (
      <div className="product-img-badges bg-secondary">
        <span className="text-white fw-bold p-2">
          {t("general_words.stock_out")}
        </span>
      </div>
    );
  }

  // Caso 2: Con stock → mostrar descuento o "Nuevo"
  if (product.discount > 0 || product.new) {
    return (
      <div className="product-img-badges">
        {product.discount > 0 && (
          <span className="pink fw-bold text-dark">{ product.discount } {t("general_words.discount")}</span>
        )}
        {product.new && (
          <span className="purple">{t("general_words.new")}</span>
        )}
      </div>
    );
  }

  // Caso 3: Si no aplica nada
  return null;
};
