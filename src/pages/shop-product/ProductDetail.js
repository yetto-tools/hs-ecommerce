
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import Product from "./Product";
import ProductModal2 from "../../components/product/ProductModal2";

const ProductDetail = () => {
  let { pathname } = useLocation();
  let { sku } = useParams();
  const { articles } = useSelector((state) => state.articles);
  const currency = useSelector((state) => state.currency);
  const product = articles.find(product => product.sku === sku);
const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
        <ProductModal2
          show={modalShow}
          onHide={() => setModalShow(false)}
          currency={currency}
        />

    </Fragment>    
  );
};

export default ProductDetail;
