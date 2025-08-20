// ProductBadges.jsx
import React from "react";

export const ProductBadges = ({ product, t }) => {
  if (!product) return null;

  // Caso 1: Sin stock → mostrar Agotado
  if (product.stock === 0) {
    return (
      <div className="product-img-badges bg-secondary pill-62">
        <span className="text-white fw-bold p-2">
          {t("general_words.stock_out")}
        </span>
      </div>
    );
  }

  // Caso 2: Con stock → mostrar descuento o "Nuevo"
  if (product.discount > 0 || product.new) {
    return (
      <div className="product-img-badges-hs">
        {product.discount > 0 && (
          <span className="hs-discount">{t("product.special_price")}</span>
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
