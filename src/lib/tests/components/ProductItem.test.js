import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { ProductItem } from "./../../components/ProductItem";
describe("Pruebas en ProductItem", () => {
  let wrapper;
  const text = `<i className="fas fa-info-circle"></i>`;
  const handleAction = jest.fn();
  const showDetails = jest.fn();
  const addCart = jest.fn();
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
        showDesc={true}
        showDetails={showDetails}
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

});
