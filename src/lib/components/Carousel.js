import React from "react";
import PropTypes, { object } from "prop-types";
import "./../styles/carousel.css";
const Carousel = ({ carousel }) => (
  <header>
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        {carousel.map((item, index) => (
          <button
            key={item.id ? item.id : index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current="true"
            aria-label={"Slide ".concat(index + 1)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carousel.map((item, index) => (
          <div
            key={item.id ? item.id : index}
            className={index === 0 ? "carousel-item active" : "carousel-item"}
            style={{
              backgroundImage: `url("${item.background}")`,
            }}
          >
            <div className="carousel-caption">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </header>
);

export { Carousel };

Carousel.propTypes = {
  carousel: PropTypes.array.isRequired
};


/**
 * {
          id: item.id,
          title: item.product.name,
          description: item.platform.name,
          url: window.location.origin.concat(`/games/details/${item.id}`),
          background: item.product.img,
        }
 */