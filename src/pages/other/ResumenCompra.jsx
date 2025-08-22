import clsx from "clsx";

export const ResumenCompra = ({
  cartItems,
  currency,
  getDiscountPrice,
  t,
  i18n,
}) => {
  // Calcular total
  const total = cartItems.reduce((acc, cartItem) => {
    const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
    const finalProductPrice = cartItem.price * currency.currencyRate;
    const finalDiscountedPrice = discountedPrice * currency.currencyRate;

    return (
      acc +
      (discountedPrice != null
        ? finalDiscountedPrice * cartItem.quantity
        : finalProductPrice * cartItem.quantity)
    );
  }, 0);

  return (
    <div className="your-order-area sticky-column">
      <h3>{t("page_checkout.your_order")}</h3>
      <div className="your-order-wrap gray-bg-4">
        <div className="your-order-product-info">
          <div className="your-order-top">
            <ul>
              <li className="fw-bold">{t("page_checkout.product")}</li>
              <li className="fw-bold">{t("page_checkout.quantity")}</li>
              <li className="fw-bold">Total</li>
            </ul>
          </div>

          <div className="your-order-middle">
            <ul>
              {cartItems.map((cartItem, key) => {
                const discountedPrice = getDiscountPrice(
                  cartItem.price,
                  cartItem.discount
                );
                const finalProductPrice = (
                  cartItem.price * currency.currencyRate
                ).toFixed(2);
                const finalDiscountedPrice = (
                  discountedPrice * currency.currencyRate
                ).toFixed(2);

                return (
                  <li key={key}>
                    <span className="order-middle-left text-truncate">
                      {cartItem.name} - {cartItem.size}
                      <div className="d-flex justify-content-start gap-2">
                        {discountedPrice !== null && discountedPrice > 0 ? (
                          <>
                            
                            {/* Precio original tachado */}
                            <p className="text-xs fw-bold muted tached">
                              {new Intl.NumberFormat(i18n.language, {
                                style: "currency",
                                currency: currency.currencyName,
                              }).format(finalProductPrice)}
                            </p>
                            {/* Precio con descuento */}
                            <p className="text-xs fw-bold">
                              {new Intl.NumberFormat(i18n.language, {
                                style: "currency",
                                currency: currency.currencyName,
                              }).format(finalDiscountedPrice)}
                            </p>

                          </>
                        ) : (
                          // Solo precio normal si no hay descuento
                          <p className="text-xs fw-bold">
                            {new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: currency.currencyName,
                            }).format(finalProductPrice)}
                          </p>
                        )}
                      </div>

                    </span>

                    <strong>{cartItem.quantity}</strong>

                    <span className="order-price fw-bold">
                      {discountedPrice !== null
                        ? new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: currency.currencyName,
                          }).format(finalDiscountedPrice * cartItem.quantity)
                        : new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: currency.currencyName,
                          }).format(finalProductPrice * cartItem.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="your-order-bottom">
            <ul>
              <li className="your-order-shipping">
                {t("page_checkout.shipping")}
              </li>
              <li>{t("page_checkout.free_shipping")}</li>
            </ul>
          </div>

          <div className="your-order-total">
            <ul>
              <li className="order-total fw-bold">Total</li>
              <li>
                {new Intl.NumberFormat(i18n.language, {
                  style: "currency",
                  currency: currency.currencyName,
                }).format(total.toFixed(2))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
