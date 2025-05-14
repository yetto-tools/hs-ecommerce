import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../toast/toastManager";
import { addToCart } from "../store/slices/cart-slice";

export const useProductDetailLogic = (articleDetail) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [productStock, setProductStock] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const [selectedVariantImage, setSelectedVariantImage] = useState([]);

  const cartItem = cartItems.find(
    (item) =>
      item.id === selectedVariant?.id &&
      item.selectedProductColor === selectedVariant?.selectedProductColor &&
      item.selectedProductSize === selectedVariant?.selectedProductSize
  );

  const cartQty = cartItem?.quantity || 0;
  const maxQtyDisponible = productStock - cartQty;
  const canAddToCart = productStock > 0 && quantityCount <= productStock;

  useEffect(() => {
    if (articleDetail?.variants?.length > 0) {
      const variant = articleDetail.variants[0];
      setSelectedVariant(variant);
      setProductStock(variant.stock);
      setSelectedVariantImage(variant.images);
    }
  }, [articleDetail]);

  const handleAddToCart = () => {
    if (!selectedVariant || productStock === 0) return;

    const existingItem = cartItems.find(
      (item) =>
        item.id === selectedVariant.id &&
        item.selectedProductColor === selectedVariant.selectedProductColor &&
        item.selectedProductSize === selectedVariant.selectedProductSize
    );

    const currentCartQty = existingItem?.quantity || 0;
    const newTotalQty = currentCartQty + quantityCount;

    if (newTotalQty > productStock) {
      showToast("Cantidad excede el stock disponible", "warn", "top-center");
      return;
    }

    dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
  };

  return {
    selectedVariant,
    productStock,
    quantityCount,
    selectedVariantImage,
    maxQtyDisponible,
    canAddToCart,
    setSelectedVariant,
    setProductStock,
    setQuantityCount,
    setSelectedVariantImage,
    handleAddToCart,
  };
};

export default useProductDetailLogic;
