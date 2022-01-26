import { useState } from "react";
import { SHOPING_CART_MOCK } from "../constants/shopping-cart";

export const useCart = () => {
  const emptyCartInfo = {
    products: []
  }
  const [cartData, setCartData] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : emptyCartInfo
  );
  const [total, setTotal] = useState(cartData ? cartData.total : 0);
  const [empty, setEmpty] = useState(localStorage.getItem("cart") ? false : true)

  const updateTotal = () => {
    if (!empty) {
      let total = 0;
      cartData.products.map(
        (product) => (total += product.price * product.qty)
      );
      setTotal(total);
    }
  };

  const getProductInfo = (id) => cartData.products.filter((product) => product.id === id)[0];
  const clearItem = (removeItem) => {
    cartData.products = cartData.products.filter(
      (value) => value.id !== removeItem
    );
    localStorage.setItem("cart", JSON.stringify(cartData));
    if (cartData.products.length === 0) {
      setInfo(cartData);
      return;
    }
    setCartData(JSON.parse(localStorage.getItem("cart")));
    updateTotal();
  };

  const updateValue = (counter, productId) => {
    if (Object.keys(cartData).length > 0 && cartData.products.length > 0) {
      const updateProduct =
        cartData.products[
          cartData.products.findIndex((el) => el.id === productId)
        ];
      updateProduct.qty = counter;
      // Update
      localStorage.setItem("cart", JSON.stringify(cartData));
      updateTotal();
    }
  };

  const manageProduct = (product) => {
    // Obtener cantidad de productps en el carrito
    const newCartData = cartData;
    const productTotal = newCartData.products.length;
    console.log(product)
    // Comprobamos si tenemos productos
    if (empty) {
      console.log('Añadiendo primer producto');
      newCartData.products.push(product);
    } else { // Si tenemos productos hacer lo siguiente
      let actionUpdateOk = false;
      for (let i = 0; i < productTotal; i++) {
        // COmprobar que coincide el producto con alguno de la lista
        if (product.id === newCartData.products[i].id) {
          console.log('Producto existente y vamos a gestionarlo');
          if (product.qty === 0) {
            console.log('Borrar item seleccionado');
            // Quitar elemento
            newCartData.products.splice(i, 1);
          } else { // Actualizar con la nueva información
            newCartData.products[i] = product;
          }
          actionUpdateOk = true;
          i = productTotal;
          // updateValue(product.qty, product.id)
        }
      }
      console.log(actionUpdateOk, newCartData);
      if (!actionUpdateOk) {
        newCartData.products.push(product);
      }
    }
    setInfo(newCartData);
  }

  const updateCart = (cartItems = SHOPING_CART_MOCK) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartData(JSON.parse(localStorage.getItem("cart")));
    setEmpty(false);
    updateTotal();
  };

  const clear = () => {
    setInfo(emptyCartInfo);
    console.log('Action to clear cart data');
  }

  const setInfo = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
    setTotal((cartData.total === 0) ? 0: cartData.total);
    setEmpty((cartData.total === 0));
    setCartData(cartData)
  }

  return {
    cart: cartData,
    clearItem,
    clearCart: clear,
    updateValue,
    updateCart,
    total,
    manageProduct,
    getProductInfo
  };
};
