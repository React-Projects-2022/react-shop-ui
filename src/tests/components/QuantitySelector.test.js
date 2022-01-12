import React from "react";
import { mount } from "enzyme";
import { QuantitySelector } from "../../lib/components/QuantitySelector";
// https://stackoverflow.com/questions/65404663/mocking-custom-hook-with-jest-and-enzyme-results-in-xxx-is-not-a-function-or-it
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

  test("Comprobar cambios de valores incrementando", () =>{
    const ButtonsElements = wrapper.find("Button");
    const DecrementButton = ButtonsElements.at(0);
    const IncrementButton = ButtonsElements.at(1);
    makeClickAction(IncrementButton);
    expect(wrapper.find("input").at(0).prop("value")).toBe(2);
    [IncrementButton, IncrementButton, IncrementButton].map((button) => (
      makeClickAction(button)
    ));
    expect(wrapper.find("input").at(0).prop("value")).toBe(5);
    [IncrementButton, IncrementButton, IncrementButton].map((button) => (
      makeClickAction(button)
    ));
    expect(wrapper.find("input").at(0).prop("value")).toBe(8);
  });
  test("Comprobar cambios de valores decrementando", () => {
    const ButtonsElements = wrapper.find("Button");
    const DecrementButton = ButtonsElements.at(0);
    const IncrementButton = ButtonsElements.at(1);
    makeClickAction(IncrementButton);
    expect(wrapper.find("input").at(0).prop("value")).toBe(2);
    makeClickAction(DecrementButton);
    expect(wrapper.find("input").at(0).prop("value")).toBe(1);
  })
});

const makeClickAction = (buttonElement) => buttonElement.simulate("click");
