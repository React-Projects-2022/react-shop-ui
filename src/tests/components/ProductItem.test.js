import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { ProductItem } from "./../../lib/components/ProductItem";
import { CONSTANTS } from "../../lib/constants";
describe("Pruebas en ProductItem", () => {
  let wrapper;
  const text = `<i className="fas fa-info-circle"></i>`;
  const handleAction = jest.fn();
  const showDetails = jest.fn();
  const addCart = jest.fn();
  const selectMoney = CONSTANTS.CURRENCY_LIST.EURO;
  const showDesc = true;
  const item = {
    id: "1222",
    price: 23,
    product: {
      img: "",
      name: "Super Mario",
      rating: {
        value: 1,
        count: 340,
      },
    },
    platform: {
      name: "Nintendo 64",
    },
  };
  beforeEach(() => {
    wrapper = shallow(
      <ProductItem
        item={item}
        addCart={addCart}
        showDesc={showDesc}
        showDetails={showDetails}
        selectMoney={selectMoney}
      />
    );
  });
  test("Debe de mostrar <ProductItem /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar que tenemos dos botones y Rating", () => {
    expect(wrapper.find("Button").length).toBe(2);
    expect(wrapper.find("Rating").length).toBe(1);
  });

  test("Comprobar las propiedades de los botones", () => {
    const buttonComponent = wrapper.find("Button");
    expect(buttonComponent.at(0).prop("params")).toBe(item.id);
    expect(buttonComponent.at(1).prop("params")).toBe(item.id);
    expect(buttonComponent.at(0).prop("text")).toMatchObject(
      <i className="fas fa-info-circle"></i>
    );
    expect(buttonComponent.at(1).prop("text")).toMatchObject(
      <i className="fas fa-cart-plus"></i>
    );
    // expect(buttonComponent.at(0).prop("handleAction")).toBeDefined(showDetails);
    // expect(buttonComponent.at(1).prop("handleAction")).toBeDefined(addCart);
  });

  test("Comprobar elementos con los datos si son correctos o no", () => {
    const productNameContent = wrapper.find(".truncate-one-line").text();
    expect(productNameContent).toBe(item.product.name);

    const productDescriptionElement = wrapper.find(".description");
    showDesc
      ? expect(productDescriptionElement.text()).toBe(item.platform.name)
      : expect(productDescriptionElement).toMatchObject({});

    const priceContent = wrapper.find(".top-div span").text();
    expect(priceContent).toBe(`€ ${item.price}`);
  });

  test("Comprobar que seleccionamos correctamente las monedas para mostrar", () => {
    const currenciesValues = Object.values(CONSTANTS.CURRENCY_LIST);
    Object.keys(CONSTANTS.CURRENCY_LIST).map((__, index) => {
      checkIfMoneySymbolIsCorrect(
        currenciesValues[index],
        CONSTANTS.CURRENCIES_SYMBOL[currenciesValues[index]],
        item
      );
    });
  });
});

const checkIfMoneySymbolIsCorrect = (selectMoney, expectedSymbol, item) => {
  const product = shallow(
    <ProductItem
      item={item}
      addCart={jest.fn()}
      showDesc={false}
      showDetails={jest.fn()}
      selectMoney={selectMoney}
    />
  );
  const priceContent = product.find(".top-div span").text();
  expect(priceContent).toBe(`${expectedSymbol} ${item.price}`);

  expect(product).toMatchSnapshot();
};
