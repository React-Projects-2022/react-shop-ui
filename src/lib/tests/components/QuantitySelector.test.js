import React from "react";
import { mount } from "enzyme";
import { QuantitySelector } from "./../../components/QuantitySelector";

describe("Pruebas en QuantitySelector", () => {
  const updateValue = jest.fn();
  
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <QuantitySelector updateValue={updateValue} stock={10} />
    );
  });
  test("Debe de mostrar <QuantitySelector /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar características de los botones", () => {
    const ButtonsElements = wrapper.find("Button");
    expect(ButtonsElements.length).toBe(2);

    // Decrement quantity button
    const DecrementButton = ButtonsElements.at(0);
    expect(DecrementButton.prop("className")).toBe("btn btn-minus qty-btn");
    expect(DecrementButton.prop("text").trim()).toBe("-");

    // Increment quantity button
    const IncrementButton = ButtonsElements.at(1);
    expect(IncrementButton.prop("className")).toBe("btn btn-plus qty-btn");
    expect(IncrementButton.prop("text").trim()).toBe("+");
  });

  test("Comprobar características del contador", () => {
    
    const inputElement = wrapper.find("input").at(0);
    expect(inputElement.prop("value")).toBe(1);
    expect(inputElement.prop("type")).toBe("text");
    expect(inputElement.prop("name")).toBe("quantity");
    expect(inputElement.prop("className")).toBe("text-center quantity");
    expect(inputElement.prop("disabled")).toBe(true);
  });

  test("Comprobar cambios de valores incrementando / decrementando", () =>{
    /*const ButtonsElements = wrapper.find("Button");
    const DecrementButton = ButtonsElements.at(0);
    const IncrementButton = ButtonsElements.at(1);
    const inputElement = wrapper.find("input").at(0);
    expect(inputElement.prop("value")).toBe(1);
    DecrementButton.simulate("click");
    expect(inputElement.prop("value")).toBe(1);
    IncrementButton.simulate("click");
    IncrementButton.simulate("click");
    console.log(wrapper.find("input").at(0).prop("value"))
    expect(inputElement.prop("value")).toBe(3);*/
    // const mockSetState = jest.spyOn(React, "useState");


  });
  /*
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
