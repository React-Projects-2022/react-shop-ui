import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { Cart } from "./../../lib/components/Cart";
import { CART_DATA } from "../mocks/cart-data";

describe("Pruebas en Cart", () => {
  let wrapper;
  const navigateTo = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Cart navigateTo={navigateTo}/>
    );
  });
  test("Debe de mostrar <Cart /> correctamente - Sin información", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar valores por defecto -  Sin información", () => {
    const spanText = wrapper.find("span");
    expect(spanText.text()).toBe("No tienes elementos guardados en el carrito de compra. Añádelos desde los productos con la opción de Añadir a la cesta");
    // expect(textButton.prop("className")).toBe("btn btn-primary");
  });

  test("Debe de mostrar <Cart /> correctamente - Con información", () => {
    localStorage.setItem("cart", JSON.stringify(CART_DATA))
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar valores por defecto -  Con información", () => {
    const cartItemElement = wrapper.find("CartItem");
    expect(cartItemElement.length).toBe(CART_DATA.products.length);
    // expect(spanText.text()).toBe("No tienes elementos guardados en el carrito de compra. Añádelos desde los productos con la opción de Añadir a la cesta");
    // expect(textButton.prop("className")).toBe("btn btn-primary");
  });

  /*test("Probar acción de click", () => {
    const textButton = wrapper.find("button");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(1);
    textButton.simulate("click");
    textButton.simulate("click");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(4);
  });*/
});
