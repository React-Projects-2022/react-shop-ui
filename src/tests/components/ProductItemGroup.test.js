import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { CONSTANTS } from "../../lib/constants";
import { ProductItemGroup } from "../../lib/components/ProductItemGroup";
describe("Pruebas en ProductItem", () => {
  let wrapper;
  const text = `<i className="fas fa-info-circle"></i>`;
  const handleAction = jest.fn();
  const showDetails = jest.fn();
  const addCart = jest.fn();
  const selectMoney = CONSTANTS.CURRENCY_LIST.EURO;
  const showDesc = true;
  const products = [
    {
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
    },
    {
      id: "123",
      price: 56,
      product: {
        img: "",
        name: "Tomb Raider",
        rating: {
          value: 1,
          count: 340,
        },
      },
      platform: {
        name: "Playstation",
      },
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<ProductItemGroup title={"Juegos"} products={products} showDesc={showDesc} showDetails={showDetails}
        addCart={addCart} selectMoney={selectMoney}/>);
  });
  test("Debe de mostrar <ProductItemGroup /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar que tenemos dos productos", () => {
    expect(wrapper.find("ProductItem").length).toBe(2);
  });
});