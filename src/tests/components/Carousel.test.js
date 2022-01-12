import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { Carousel } from "./../../lib/components/Carousel";
describe("Pruebas en Button", () => {
  let wrapper;
  const carouselItems = [
    {
      id: "01",
      title: "GTA IV",
      description: "Juego de Rockstar",
      url: "http://www.rockstargames.com/V/",
      background:
        "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
    },
    {
      id: "02",
      title: "Shadow of Tomb Raider",
      description: "Lara Croft...",
      url: "https://tombraider.square-enix-games.com/en-us",
      background:
        "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg",
    },
    {
      id: "03",
      title: "Tomb Raider (2013)",
      description: "Lara Croft...",
      url: "/anartz/prueba/valor",
      background:
        "https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg",
    },
  ];
  beforeEach(() => {
    wrapper = shallow(<Carousel carousel={carouselItems} />);
  });
  test("Debe de mostrar <Carousel /> correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Comprobar que se cargan número de elementos correctamente", () => {
    const textButton = wrapper.find(".carousel-item");
    expect(textButton.length).toBe(carouselItems.length);
  });
});
