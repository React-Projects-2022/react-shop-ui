import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./../styles/quantity-selector.css";
import { useCounter } from "../hooks/useCounter";

export const QuantitySelector = ({ stock, updateValue }) => {
  const { counter, increment, decrement } = useCounter(1);

  const changeValue = (action) => {
    if (action === "-" && counter > 1) {
      decrement();
    } else if (action === "+" && counter < stock) {
      increment();
    }
  };

  useEffect(() => {
    updateValue(counter);
  }, [updateValue, counter]);

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-minus qty-btn"
          onClick={() => changeValue("-")}
        >
          -
        </button>
        <input
          type="text"
          value={counter}
          name="quantity"
          className="text-center quantity"
          disabled
        />
        <button
          type="button"
          className="btn btn-plus qty-btn"
          onClick={() => changeValue("+")}
        >
          +
        </button>
      </div>
      {counter === stock ? (
        <p className="alert alert-danger">
          No puedes seleccionar más cantidad por no haber + stock
        </p>
      ) : (
        ""
      )}
    </>
  );
};

QuantitySelector.propTypes = {
  stock: PropTypes.number.isRequired,
  updateValue: PropTypes.func.isRequired,
};
