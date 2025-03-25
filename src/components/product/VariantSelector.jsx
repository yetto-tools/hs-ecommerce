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
              {articleDetail.sizes.map((size) => (
                <label
                  className={clsx("pro-details-size-content--single")}
                  key={size.id}
                  style={{
                    backgroundColor:
                      selectedSizeId === size.id ? "#b9db00" : "transparent",
                    cursor:
                      articleDetail.variation.find((v) => v.idSize === size.id)
                        .stock > 0
                        ? "pointer"
                        : "not-allowed",
                    opacity:
                      articleDetail.variation.find((v) => v.idSize === size.id)
                        .stock > 0
                        ? "1"
                        : "0.5",
                  }}
                >
                  <input
                    type="radio"
                    name="sizeSelection"
                    className=" visually-hidden"
                    checked={selectedSizeId === size.id}
                    onChange={() => {
                      setSelectedSizeId(size.id);
                      setQuantityCount(1);
                    }}
                    disabled={
                      articleDetail.variation.find((v) => v.idSize === size.id)
                        .stock === 0
                    }
                  />

                  <span className="size-name d-flex inline-block align-items-end justify-content-center text-black">
                    {size.name}
                    <small className="lowercase fs-6">{size.unit || ""}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="pro-details-color-wrap">
          <h5 className="fw-bold">Color:</h5>
          <div className="pro-details-color-content">
            {articleDetail.colors && (
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
                      onChange={() => setSelectedColorId(color.id)}
                    />
                    <span></span>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
