// import PropTypes from "prop-types";
// import clsx from "clsx";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SectionTitle from "../../components/section-title/SectionTitle";
// import ProductGrid from "./ProductGrid";

// const TabProduct = ({
//   spaceTopClass,
//   spaceBottomClass,
//   bgColorClass,
//   category
// }) => {
//   return (
//     <div
//       className={clsx("product-area", spaceTopClass, spaceBottomClass, bgColorClass)}
//     >
//       <div className="container">
//         <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
//         <Tab.Container defaultActiveKey="bestSeller">
//           <Nav
//             variant="pills"
//             className="product-tab-list pt-30 pb-55 text-center"
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
//                 <ProductGrid
//                   category={category}
//                   type="new"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//             <Tab.Pane eventKey="bestSeller">
//               <div className="row">
//                 <ProductGrid
//                   category={category}
//                   type="bestSeller"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//             <Tab.Pane eventKey="saleItems">
//               <div className="row">
//                 <ProductGrid
//                   category={category}
//                   type="saleItems"
//                   limit={8}
//                   spaceBottomClass="mb-25"
//                 />
//               </div>
//             </Tab.Pane>
//           </Tab.Content>
//         </Tab.Container>
//       </div>
//     </div>
//   );
// };

// TabProduct.propTypes = {
//   bgColorClass: PropTypes.string,
//   category: PropTypes.string,
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string
// };

// export default TabProduct;
