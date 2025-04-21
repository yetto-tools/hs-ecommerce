import clsx from "clsx";
import { useEffect, useState } from "react";

export const VariantSelector = ({
  articleDetail,
  setSelectedVariant,
  setProductStock,
  setQuantityCount,
  setSelectedVariantImage
}) => {
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [saleOut, setSaleOut] = useState(false);

  
  
  useEffect(() => {
    if (articleDetail?.variation?.length > 0) {
      const firstAvailable = articleDetail.variation[0];
      if (firstAvailable) {
        setSelectedSizeId(firstAvailable.idSize);
        setSelectedColorId(firstAvailable.idcolor);
        setQuantityCount(1);
      }
    }
  }, [articleDetail]);

  useEffect(() => {
    if (articleDetail.variation) {
      const variant = articleDetail.variation.find((v) => {
        const matchesSize = selectedSizeId ? v.idSize === selectedSizeId : true;
        const matchesColor = selectedColorId ? v.idcolor === selectedColorId : true;
        return matchesSize && matchesColor;
      });

      setSelectedVariant(variant || null);
      setProductStock(variant ? variant.stock : 0);
      setSelectedVariantImage(variant ? variant.images : []);
    } else {
      setSelectedVariant(null);
      setProductStock(0);
      setSelectedVariantImage([]);
    }
  }, [selectedSizeId, selectedColorId, articleDetail.variation]);
 
  return (
    <div className="pro-details-size-color mt-3">
      <div className="d-flex flex-column ">
        {articleDetail.sizes && (
          <div className="pro-details-size mb-4">
            <h5 className="fw-bold mb-4">Talla:</h5>
            <div className="pro-details-size-content mb-2">
            {articleDetail.sizes && (
                  <SizeSelector
                    sizes={articleDetail.sizes}
                    variation={articleDetail.variation}
                    selectedSizeId={selectedSizeId}
                    selectedColorId={selectedColorId}
                    setSelectedSizeId={setSelectedSizeId}
                    setQuantityCount={setQuantityCount}
                  />
                )}
            </div>
          </div>
        )}
     

        <div className="pro-details-color-wrap">
          <h5 className="fw-bold">Color:</h5>
          <div className="pro-details-color-content">
            {/* {articleDetail.colors && (
              <>
                {articleDetail.colors.map((color) => (
                  <label
                    className="pro-details-color-content--single"
                    key={color.id}
                    style={{
                      backgroundColor: color.colorHex,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      outline: "1px solid #00000038",
                      opacity: selectedColorId === color.id ? "1" : "0.3",
                      border: `1px solid ${color.colorHex}ff`,
                      boxShadow: selectedColorId === color.id
                      ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                      : "none"
                    }}
                  >
                    <input
                      type="radio"
                      name="colorSelection"
                      className="hidden"
                      checked={selectedColorId === color.id}
                      // onChange={() => setSelectedColorId(color.id)}
                      onChange={() => {
                        setSelectedColorId(color.id);
                      
                        // Buscar variaciones disponibles para el color seleccionado
                        const availableSizes = articleDetail.variation.filter(
                          (v) => v.idcolor === color.id && v.stock > 0
                        );
                      
                        if (availableSizes.length > 0) {
                          // Selecciona la primera talla disponible para ese color
                          setSelectedSizeId(availableSizes[0].idSize);
                        } else {
                          // Si no hay tallas disponibles para ese color, resetea
                          setSelectedSizeId(null);
                        }
                      
                        setQuantityCount(1);
                      }}
                      
                    />
                    <span></span>
                  </label>
                ))}
              </>
            )} */}

              <ColorSelector
                colors={articleDetail.colors}
                selectedColorId={selectedColorId}
                setSelectedColorId={setSelectedColorId}
                variation={articleDetail.variation}
                setSelectedSizeId={setSelectedSizeId}
                setQuantityCount={setQuantityCount}
              />

          </div>
        </div>
      </div>
    </div>
  );
};





// export const SizeSelector = ({
//   sizes,
//   variation,
//   selectedSizeId,
//   selectedColorId,
//   setSelectedSizeId,
//   setQuantityCount,
// }) => {
//   return (
//     <div className="pro-details-size mb-4">
//       <h5 className="fw-bold mb-4">Talla:</h5>
//       <div className="pro-details-size-content mb-2">
//         {sizes.map((size) => {
//           const variationForSizeAndColor = variation.find(
//             (v) => v.idSize === size.id && v.idcolor === selectedColorId
//           );

//           const isDisabled =
//             !variationForSizeAndColor || variationForSizeAndColor.stock === 0;

//           return (
//             <label
//               key={size.id}
//               className={clsx("pro-details-size-content--single", {
//                 "disabled-size": isDisabled,
//               })}
//               style={{
//                 backgroundColor:
//                   selectedSizeId === size.id ? "#b9db00" : "transparent",
//                 cursor: isDisabled ? "not-allowed" : "pointer",
//                 opacity: isDisabled ? 0.5 : 1,
//               }}
//             >
//               <input
//                 type="radio"
//                 name="sizeSelection"
//                 className="visually-hidden"
//                 checked={selectedSizeId === size.id}
//                 onChange={() => {
//                   setSelectedSizeId(size.id);
//                   setQuantityCount(1);
//                 }}
//                 disabled={isDisabled}
//               />
//               <span className="size-name d-flex inline-block align-items-end justify-content-center text-black"
//               dataset-stock={variationForSizeAndColor?.stock}
//               >
//                 {size.name}
//                 <small className="lowercase fs-6">{size.unit || ""}</small>
//               </span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

const SizeSelector = ({
  sizes,
  variation,
  selectedSizeId,
  selectedColorId,
  setSelectedSizeId,
  setQuantityCount,
}) => {
  // Filtrar solo las tallas que existen y tienen stock > 0 para el color seleccionado
  const availableSizes = sizes.filter((size) =>
    variation.some(
      (v) => v.idSize === size.id && v.idcolor === selectedColorId && v.stock >= 0
    )
  );

  return (
    <div className="pro-details-size-content mb-2">
      {availableSizes.map((size) => {
        const matchedVariation = variation.find(
          (v) => v.idSize === size.id && v.idcolor === selectedColorId
        );

        const isDisabled = !matchedVariation || matchedVariation.stock === 0;

        return (
          <label
            key={size.id}
            className={clsx("pro-details-size-content--single", {
              "disabled-size": isDisabled,
            })}
            style={{
              backgroundColor: selectedSizeId === size.id ? "#b9db00" : "transparent",
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            <input
              type="radio"
              name="sizeSelection"
              className="visually-hidden"
              checked={selectedSizeId === size.id}
              onChange={() => {
                setSelectedSizeId(size.id);
                setQuantityCount(1);
              }}
              disabled={isDisabled}
            />
            <span className="size-name d-flex inline-block align-items-end justify-content-center text-black">
              {size.name}
              <small className="lowercase fs-6">{size.unit || ""}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
};


export const ColorSelector = ({
  colors,
  selectedColorId,
  setSelectedColorId,
  variation,
  setSelectedSizeId,
  setQuantityCount
}) => {
  const handleColorChange = (colorId) => {
    setSelectedColorId(colorId);

    // Buscar tallas disponibles para ese color
    const availableSizes = variation.filter(
      (v) => v.idcolor === colorId && v.stock > 0
    );

    if (availableSizes.length > 0) {
      // Selecciona la primera talla disponible
      setSelectedSizeId(availableSizes[0].idSize);
    } else {
      setSelectedSizeId(null);
    }

    setQuantityCount(1);
  };

  return (
    <div className="pro-details-color-content">
      {colors.map((color) => (
        <label
          className="pro-details-color-content--single p-"
          key={color.id}
          style={{
            backgroundColor: color.colorHex,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer",
            opacity: selectedColorId === color.id ? "1" : "0.95",
            border: `1px solid ${color.colorHex}fff`,
            outline:
              selectedColorId === color.id
                ? "rgb(0, 0, 0) solid 2px"
                : "none",
            boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
          
          }}
        >
          <input
            type="radio"
            name="colorSelection"
            className="hidden"
            checked={selectedColorId === color.id}
            onChange={() => handleColorChange(color.id)}
          />
          <span></span>
        </label>
      ))}
    </div>
  );
};
