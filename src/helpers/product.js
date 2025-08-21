export const getIdsFromUrl = (menu, path) => {
  const parts = path.replace(/^\/|\/$/g, "").split("/"); // Quita "/" inicial/final y separa por "/"

  let n1  = 0,
      n2  = 0,
      n3  = 0;

  // Buscar nivel 1
  const level1 = menu.find((item) => item.slug === parts[0]);
  if (level1) {
    n1 = level1.id;

    // Buscar nivel 2
    if (parts[1]) {
      const level2 = level1.subitems.find(
        (sub) => sub.slug === `${parts[0]}/${parts[1]}`
      );
      if (level2) {
        n2 = level2.id;

        // Buscar nivel 3 (si existe)
        if (parts[2] && level2.subitems?.length) {
          const level3 = level2.subitems.find(
            (subsub) => subsub.slug === `${parts[0]}${parts[1]}/${parts[2]}`
          );
          if (level3) {
            n3 = level3.id;
          }
        }
      }
    }
  }

  return { n1, n2, n3 };
};

// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) =>
          product.category.filter((single) => single.name === category)[0]
      )
    : products;
  
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single) => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  // return price > discountedPrice && discount < 0 ? discountedPrice : null;
  return discount && discount > 0 ? discount : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.find(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  );

  if (cartItems.length >= 1 && productInCart) {
    // Corrección: Verificar si se encuentra una coincidencia exacta antes de acceder a la propiedad 'quantity'
    const exactMatch = cartItems.find(
      (single) =>
        single.id === product.id &&
        single.selectedProductColor === color &&
        single.selectedProductSize === size
    );
  

    if (product.variation) {
      // Corrección: Asegurarse de que 'exactMatch' no es undefined
      return exactMatch ? exactMatch.quantity : 0;
    } else {
      // Corrección: Asegurarse de que 'productInCart' no es undefined
      return productInCart ? productInCart.quantity : 0;
    }
  } else {
    return 0;
  }
  // if (cartItems.length >= 1 && productInCart) {
  //   if (product.variation) {
  //     return cartItems.find(
  //       single =>
  //         single.id === product.id &&
  //         single.selectedProductColor === color &&
  //         single.selectedProductSize === size
  //     ).quantity;
  //   } else {
  //     return cartItems.find(single => product.id === single.id).quantity;
  //   }
  // } else {
  //   return 0;
  // }
};

export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "brands") {
      return products.filter(
        (product) =>
          product.brands.filter((single) => single.name === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product) =>
          product.tag.filter((single) => single.name === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) => single.color.name === sortValue
          )[0]
      );
    }
    if (sortType === "silueta") {
      return products.filter(
        (product) =>
          product.silueta.filter((single) => single.name === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) =>
              single.size.filter((single) => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
// export const getIndividualTags = (products) => {
//   let productTags = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.tag &&
//         product.tag.map((single) => {
//           return productTags.push(single);
//         })
//       );
//     });
//   const individualProductTags = getIndividualItemArray(productTags);
//   return individualProductTags;
// };

export const getIndividualTags = (products) => {
  const uniqueTags = products.tags?.map(item => (item.tag));

  return uniqueTags;
};

// get individual Silueta
export const getIndividualSilueta = (products) => {
  let productSilueta = [];
  products &&
    products.map((product) => {
      return (
        product.silueta &&
        product.silueta.map((single) => {
          return productSilueta.push(single);
        })
      );
    });
  const individualProductSilueta = getIndividualItemArray(productSilueta);
 
  return individualProductSilueta;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// // get individual sizes
// export const getProductsIndividualSizes = products => {
//   let productSizes = [];
//   products &&
//     products.map(product => {
//       return (
//         product.variation &&
//         product.variation.map(single => {
//           return single.size.map(single => {
//             return productSizes.push(single.name);
//           });
//         })
//       );
//     });
//   const individualProductSizes = getIndividualItemArray(productSizes);
//   return individualProductSizes;
// };
export const getProductsIndividualSizes = (products) => {
  const sizeSet = new Set();
  
  products.forEach((product) => {
    product.sizes?.forEach((size) => {
      if (size.name) sizeSet.add(size.name.trim());
    });
  });

  return Array.from(sizeSet).sort();
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
