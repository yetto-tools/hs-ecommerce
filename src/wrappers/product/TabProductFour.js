// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { Link } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SectionTitleThree from "../../components/section-title/SectionTitleThree";
// import ProductGridTwo from "./ProductGridTwo";
// import { useTranslation } from "react-i18next";

// const TabProductFour = ({ spaceBottomClass, category, productTabClass }) => {

//   const {t} = useTranslation();

//   return (
//     <div className={clsx("product-area", spaceBottomClass)}>
//       <div className="container">
//         <SectionTitleThree
//           titleText="Featured Product"
//           positionClass="text-center"
//         />
//         <Tab.Container defaultActiveKey="bestSeller">
//           <Nav
//             variant="pills"
//             className={clsx("product-tab-list pt-35 pb-60 text-center", productTabClass)}
//           >
//             <Nav.Item>
//               <Nav.Link eventKey="newArrival">
//                 <h4>Nuevas Producciones</h4>
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="bestSeller">
//                 <h4>Lo más Vendido</h4>
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="saleItems">
//                 <h4>Colecciones</h4>
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//           <Tab.Content>
//             <Tab.Pane eventKey="newArrival">
//               <div className="row">
//                 <ProductGridTwo
//                   category={category}
//                   type="new"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//             <Tab.Pane eventKey="bestSeller">
//               <div className="row">
//                 <ProductGridTwo
//                   category={category}
//                   type="bestSeller"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//             <Tab.Pane eventKey="saleItems">
//               <div className="row">
//                 <ProductGridTwo
//                   category={category}
//                   type="saleItems"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//           </Tab.Content>
//         </Tab.Container>
//         <div className="view-more text-center mt-20 toggle-btn6 col-12">
//         <Link
//             className="loadMore6 uppercase"
//             to={process.env.PUBLIC_URL + "/productos"}
//           >
//             {t("general_words.view_more_products")}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// TabProductFour.propTypes = {
//   category: PropTypes.string,
//   spaceBottomClass: PropTypes.string
// };

// export default TabProductFour;
