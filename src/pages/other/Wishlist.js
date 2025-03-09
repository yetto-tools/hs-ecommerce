// import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { getDiscountPrice } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import { addToCart } from "../../store/slices/cart-slice";
// import { deleteFromWishlist, deleteAllFromWishlist } from "../../store/slices/wishlist-slice"
// import { useTranslation } from "react-i18next";

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   let { pathname } = useLocation();

//   const currency = useSelector((state) => state.currency);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const { cartItems } = useSelector((state) => state.cart);
//   const {i18n} =useTranslation();

//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="Favoritos"
//         description="Lista de Favoritos, New Era Guatemala"
//       />
//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         <Breadcrumb
//           pages={[
//             {label: "Inicio", path: process.env.PUBLIC_URL + "/" },
//             {label: "Favoritos", path: process.env.PUBLIC_URL + pathname }
//           ]}
//         />
//         <div className="cart-main-area pt-90 pb-100">
//           <div className="container">
//             {wishlistItems && wishlistItems.length >= 1 ? (
//               <Fragment>
//                 <h3 className="cart-page-title">Mi Lista de Favoritos</h3>
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="table-content table-responsive cart-table-content">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>Imagen</th>
//                             <th>Producto</th>
//                             <th>Precio Unitario</th>
//                             <th>Añadir</th>
//                             <th>acción</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {wishlistItems.map((wishlistItem, key) => {
//                             const discountedPrice = getDiscountPrice(
//                               wishlistItem.price,
//                               wishlistItem.discount
//                             );
//                             const finalProductPrice = (
//                               wishlistItem.price * currency.currencyRate
//                             ).toFixed(2);
//                             // const finalDiscountedPrice =
//                             // (
//                             //   discountedPrice * currency.currencyRate
//                             // ).toFixed(2);
//                             const cartItem = cartItems.find(
//                               item => item.id === wishlistItem.id
//                             );
//                             return (
//                               <tr key={key}>
//                                 <td className="product-thumbnail">
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       wishlistItem.id
//                                     }
//                                   >
//                                     <img
//                                       className="img-fluid"
//                                       src={
//                                         process.env.PUBLIC_URL +
//                                         wishlistItem.image[0]
//                                       }
//                                       alt=""
//                                     />
//                                   </Link>
//                                 </td>

//                                 <td className="product-name text-center">
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       wishlistItem.id
//                                     }
//                                   >
//                                     {wishlistItem.name}
//                                   </Link>
//                                 </td>

//                                 <td className="product-price-cart">
//                                   {discountedPrice !== null ? (
//                                     <Fragment>
//                                       <span className="amount old">
//                                       {new Intl.NumberFormat(i18n.language, {style: "currency", currency: currency.currencyName}).format(finalProductPrice)}
//                                       </span>
//                                       <span className="amount">
//                                       {new Intl.NumberFormat(i18n.language, {style: "currency", currency: currency.currencyName}).format(finalProductPrice)}
//                                       </span>
//                                     </Fragment>
//                                   ) : (
//                                     <span className="amount">
//                                       {new Intl.NumberFormat(i18n.language, {style: "currency", currency: currency.currencyName}).format(finalProductPrice)}
//                                     </span>
//                                   )}
//                                 </td>

//                                 <td className="product-wishlist-cart">
//                                   {wishlistItem.affiliateLink ? (
//                                     <a
//                                       href={wishlistItem.affiliateLink}
//                                       rel="noopener noreferrer"
//                                       target="_blank"
//                                     >
//                                       {" "}
//                                       Buy now{" "}
//                                     </a>
//                                   ) : wishlistItem.variation &&
//                                     wishlistItem.variation.length >= 1 ? (
//                                     <Link
//                                       to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
//                                     >
//                                       Ver detalle
//                                     </Link>
//                                   ) : wishlistItem.stock &&
//                                     wishlistItem.stock > 0 ? (
//                                     <button
//                                       onClick={() =>
//                                         dispatch(addToCart(wishlistItem))
//                                       }
//                                       className={
//                                         cartItem !== undefined &&
//                                         cartItem.quantity > 0
//                                           ? "active"
//                                           : ""
//                                       }
//                                       disabled={
//                                         cartItem !== undefined &&
//                                         cartItem.quantity > 0
//                                       }
//                                       title={
//                                         wishlistItem !== undefined
//                                           ? "Ya añadido"
//                                           : "Añadir"
//                                       }
//                                     >
//                                       {cartItem !== undefined &&
//                                       cartItem.quantity > 0
//                                         ? "Ya Añadido"
//                                         : "Añadir"}
//                                     </button>
//                                   ) : (
//                                     <button disabled className="active">
//                                       Out of stock
//                                     </button>
//                                   )}
//                                 </td>

//                                 <td className="product-remove">
//                                   <button
//                                     onClick={() =>
//                                       dispatch(deleteFromWishlist(wishlistItem.id))
//                                     }
//                                   >
//                                     <i className="fa fa-times"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="cart-shiping-update-wrapper">
//                       <div className="cart-shiping-update">
//                         <Link
//                           to={process.env.PUBLIC_URL + "/productos"}
//                         >
//                           Continuar Comprando
//                         </Link>
//                       </div>
//                       <div className="cart-clear">
//                         <button onClick={() => dispatch(deleteAllFromWishlist())}>
//                           Limpiar Lista de Favoritos
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="item-empty-area text-center">
//                     <div className="item-empty-area__icon mb-30">
//                       <i className="pe-7s-like"></i>
//                     </div>
//                     <div className="item-empty-area__text">
//                     Aun no has Añadido nada a Favoritos <br />{" "}

//                       <Link to={process.env.PUBLIC_URL + "/productos"}>
//                         Añadir
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default Wishlist;
