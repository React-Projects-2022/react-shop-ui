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

  /*test("Comprobar valores por defecto", () => {
    const textButton = wrapper.find("button");
    expect(textButton.text()).toBe("Details");
    expect(textButton.prop("className")).toBe("btn btn-primary");
  });

  test("Probar acción de click", () => {
    const textButton = wrapper.find("button");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(1);
    textButton.simulate("click");
    textButton.simulate("click");
    textButton.simulate("click");
    expect(handleAction).toHaveBeenCalledTimes(4);
  });*/
});
