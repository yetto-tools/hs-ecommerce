export const ResumenCompra = ({
  cartItems,
  cartTotalPrice,
  currency,
  getDiscountPrice,
  t,
  i18n,
}) => {

  const Total = cartTotalPrice.toFixed(2);

  return (
    <div className="your-order-area sticky-column">
      <h3>{t("page_checkout.your_order")}</h3>
      <div className="your-order-wrap gray-bg-4">
        <div className="your-order-product-info">
          <div
            className="your-order-top"
            onClick={() => console.log(cartItems)}
          >
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

                discountedPrice != null
                  ? (cartTotalPrice += finalDiscountedPrice * cartItem.quantity)
                  : (cartTotalPrice += finalProductPrice * cartItem.quantity);
                return (
                  <li key={key}>
                    <span className="order-middle-left text-truncate">
                      {cartItem.name} - {cartItem.size}
                      <p className="text-xs fw-bold">
                        {new Intl.NumberFormat(i18n.language, {
                          style: "currency",
                          currency: currency.currencyName,
                        }).format(finalProductPrice)}
                      </p>
                    </span>
                    <strong> {cartItem.quantity} </strong>

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
                }).format(Total)}
              </li>
            </ul>
          </div>
        </div>
        <div className="payment-method"></div>
      </div>
    </div>
  );
};
