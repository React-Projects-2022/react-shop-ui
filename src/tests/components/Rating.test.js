import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Rating } from "./../../lib/components/Rating";
describe("Pruebas en Button", () => {
  let wrapper;
  const ratingItem = {
    value: 4.1,
    count: 50,
  }
  beforeEach(() => {
    wrapper = mount(
      <Rating
        max={5}
        ratingItem={ratingItem}
      />
    );
  });
  test("Debe de mostrar <Rating /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

});
