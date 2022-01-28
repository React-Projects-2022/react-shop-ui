import "@testing-library/jest-dom";
import { useCart } from "../../lib/hooks/useCart";
import { act, renderHook } from "@testing-library/react-hooks"; // will attempt to auto-detect
import { CART_DATA, CART_DATA_EMPTY } from "../mocks/cart-data";

describe("Pruebas en useCart", () => {
  test("Debe retornar estado inicial - Carrito lleno", async () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    checkInitValuesAndStates(result.current, false);
  });
  test("Debe retornar carrito vacio", async () => {
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    const { clearCart } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    act(() => {
      clearCart();
    });
    expect(result.current.cart).toEqual(CART_DATA_EMPTY);
  });

  test("Debe retornar estado inicial - Carrito vacio", async () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA_EMPTY));
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    checkInitValuesAndStates(result.current, true);
  });

  test("Debe de llenar el carrito con la información proporcionada", () => {
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    const { updateCart } = result.current;
    expect(result.current.cart).toEqual(CART_DATA_EMPTY);

    act(() => {
      updateCart(CART_DATA);
    });
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.total).toEqual(0);
  });

  test("Debe de obtener el total correctamente después de actualizar", () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    const { updateValue } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    // result.current.cart.products.map((product) => console.log(product));
    // Iterate
    result.current.cart.products.map((product) => {
      const initialQty = product.qty;
      expect(product.qty).toEqual(initialQty);
      act(() => {
        updateValue(product.qty + 1, product.id);
      });
      expect(product.qty).toEqual(initialQty + 1);
    });
  });

  test("Remover un item", () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    const { clearItem } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.cart.products.length).toBe(12);
    // result.current.cart.products.map((product) => console.log(product));
    // Iterate
    act(() => {
      clearItem(result.current.cart.products[0].id);
    });
    expect(result.current.cart.products.length).toBe(11);
  });

  test("Remover todos los items individualmente", () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const { result } = renderHook(() => useCart());
    // Obtener el resultado del estado inicial antes de la espera
    const { clearItem } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.cart.products.length).toBe(12);
    let totalProducts = 12;
    result.current.cart.products.map((product) => {
      act(() => {
        clearItem(product.id);
        totalProducts -= 1;
      });
      expect(result.current.cart.products.length).toBe(totalProducts);
    });
    expect(result.current.cart.products.length).toBe(0);
    expect(result.current.cart).toMatchObject(CART_DATA_EMPTY);
  });

  test("Carrito con productos - Añadir un producto nuevo", async () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const newProduct = {
      id: "10000000",
      img: "https://media.rawg.io/media/games/d2f/d2f925d2c1518d45c45f91cc32afce68.jpg",
      name: "Assassin's Creed 2120",
      rating: { value: 4.9, count: 23 },
      description: "PlayStation 4",
      qty: 3,
      price: 40,
      stock: 12,
    };
    const { result } = renderHook(() => useCart());
    const { manageProduct } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.cart.products.length).toBe(12);
    act(() => {
      manageProduct(newProduct);
    });
    expect(result.current.cart.products.length).toBe(13);
    expect(result.current.cart.products[12]).toBe(newProduct);
  });

  test("Carrito SIN productos - Añadir un producto nuevo", async () => {
    localStorage.removeItem("cart");
    const newProduct = {
      id: "10000000",
      img: "https://media.rawg.io/media/games/d2f/d2f925d2c1518d45c45f91cc32afce68.jpg",
      name: "Assassin's Creed 2120",
      rating: { value: 4.9, count: 23 },
      description: "PlayStation 4",
      qty: 3,
      price: 40,
      stock: 12,
    };
    const { result } = renderHook(() => useCart());
    const { manageProduct } = result.current;
    expect(result.current.cart).toEqual(CART_DATA_EMPTY);
    expect(result.current.cart.products.length).toBe(0);
    act(() => {
      manageProduct(newProduct);
    });
    expect(result.current.cart.products.length).toBe(1);
    expect(result.current.cart.products[0]).toBe(newProduct);
  });

  test("Carrito con productos - Actualizar información de un producto", async () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const newUpdateProduct = {
      id: "3558",
      img: "https://media.rawg.io/media/games/d2f/d2f925d2c1518d45c45f91cc32afce68.jpg",
      name: "Assassin's Creed Freedom Cry",
      rating: { value: 3.02, count: 283 },
      description: "PlayStation 4",
      qty: 3,
      price: 38.35,
      stock: 471,
    };
    const { result } = renderHook(() => useCart());
    const { manageProduct } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.cart.products.length).toBe(12);
    act(() => {
      manageProduct(newUpdateProduct);
    });
    expect(result.current.cart.products.length).toBe(12);
    expect(result.current.cart.products[0]).toBe(newUpdateProduct);
    expect(result.current.cart.products[0].qty).toBe(newUpdateProduct.qty);
  });

  test("Carrito con productos - Eliminar producto cuando qty = 0", async () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA));
    const newUpdateProduct = {
      id: "3558",
      img: "https://media.rawg.io/media/games/d2f/d2f925d2c1518d45c45f91cc32afce68.jpg",
      name: "Assassin's Creed Freedom Cry",
      rating: { value: 3.02, count: 283 },
      description: "PlayStation 4",
      qty: 0,
      price: 38.35,
      stock: 471,
    };
    const { result } = renderHook(() => useCart());
    const { manageProduct } = result.current;
    expect(result.current.cart).toEqual(CART_DATA);
    expect(result.current.cart.products.length).toBe(12);
    act(() => {
      manageProduct(newUpdateProduct);
    });
    const afterDeleteFirstItem = {
      id: "5259",
      img: "https://media.rawg.io/media/games/0df/0df3e72c789c89f7e29fe776acb40cfa.jpg",
      name: "OlliOlli",
      rating: { value: 4.02, count: 34 },
      description: "Xbox One",
      qty: 1,
      price: 83.29,
      stock: 23,
    };
    expect(result.current.cart.products.length).toBe(11);
    expect(result.current.cart.products[0]).toMatchObject(afterDeleteFirstItem);
  });
});

const checkInitValuesAndStates = (result, empty) => {
  const {
    cart,
    clearItem,
    clearCart,
    updateCart,
    updateValue,
    total,
    manageProduct,
    getProductInfo,
  } = result;
  expect(cart).toEqual(empty ? CART_DATA_EMPTY : CART_DATA);
  expect(typeof cart).toEqual("object");
  expect(typeof clearCart).toEqual("function");
  expect(typeof clearItem).toEqual("function");
  expect(typeof updateCart).toEqual("function");
  expect(typeof updateValue).toEqual("function");
  expect(typeof total).toEqual("undefined");
  expect(typeof manageProduct).toEqual("function");
  expect(typeof getProductInfo).toEqual("function");
};
