import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";

import "./../styles/quantity-selector.css";
import { useCounter } from "../hooks/useCounter";

export const QuantitySelector = ({ stock, updateValue, count = 1 }) => {
  const { counter, increment, decrement } = useCounter(count);

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
        <Button
          params={"-"}
          className={"btn btn-minus qty-btn"}
          text={"-"}
          handleAction={changeValue}
        />

        <input
          type="text"
          value={counter}
          name="quantity"
          className="text-center quantity"
          disabled
        />
        <Button
          params={"+"}
          className={"btn btn-plus qty-btn"}
          text={"+"}
          handleAction={changeValue}
        />
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
