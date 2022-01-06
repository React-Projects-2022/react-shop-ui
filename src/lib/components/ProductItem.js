import "./../styles/product-item.css";
import React from 'react';
import { Rating } from "./Rating";
import PropTypes from "prop-types";
import { Button } from "./Button";

export const ProducItem = ({ item, showDetails, addCart }) => {
  // https://bbbootstrap.com/snippets/product-card-template-hover-effect-and-animation-23224168

  return (
    <>
      {item ? (
        <div className="card">
          <div className="heart">
            <i className="fa fa-heart"></i>
          </div>
          <div className="top-div">
            <div className="border">
              <img src={item.product.img} alt="" />
            </div>
            <span>€ {item.price}</span>
          </div>
          <div className="bottom-div">
            <h5 className="truncate-one-line">{item.product.name}</h5>
            <p>{item.product.description ? item.product.description : ""}</p>
            <Rating
              max={5}
              ratingItem={{
                value: item.product.rating.value,
                count: item.product.rating.count,
              }}
            />
          </div>
          <div className="last-section text-center">
            <div className="buttons">
              <Button params={item.id}
                text={<i className="fas fa-info-circle"></i>}
                handleAction={showDetails}
              />
              &nbsp;
              <Button params={item.id}
                text={<i className="fas fa-cart-plus"></i>}
                handleAction={addCart}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

ProducItem.propTypes = {
  item: PropTypes.object.isRequired,
  showDetails: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
};
