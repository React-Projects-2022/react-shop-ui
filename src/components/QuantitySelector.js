import React from "react";
import "./../styles/quantity-selector.css";
import { useCounter } from "../hooks/useCounter";

export const QuantitySelector = ({ stock, updateValue }) => {
  const { counter, increment, decrement } = useCounter(1);

  const changeValue = (action) => {
    if (action === "-" && qty > 1) {
      decrement();
    } else if (action === "+" && qty < stock) {
      increment();
    }
    // updateValue(counter);
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-dark qty-btn"
        onClick={() => changeValue("-")}
      >
        -
      </button>
      <input
        type="text"
        value={counter}
        name="quantity"
        class="text-center quantity"
        disabled
      />
      <button
        type="button"
        class="btn btn-dark qty-btn"
        onClick={() => changeValue("+")}
      >
        +
      </button>
    </div>
  );
};
