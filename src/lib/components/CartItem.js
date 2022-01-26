import { useState } from "react";
import PropTypes from "prop-types";
import { CONSTANTS } from "./../constants";
import { QuantitySelector } from "./QuantitySelector";
export const CartItem = ({
  product,
  selectMoney,
  updateValue,
  clearItem,
  navigateTo
}) => {
  const [subtotal, setSubtotal] = useState(product.qty * product.price)
  return (
    <tr>
      <td>
        <div className="product-item" key={product.id} onClick={() => navigateTo("games/details", product.id)}>
          <span className="product-thumb">
            <img src={product.img} alt={product.name} />
          </span>
          <div className="product-info">
            <h4 className="product-title">{product.name}</h4>
            <span>
              <em>Price:</em> {CONSTANTS.CURRENCIES_SYMBOL[selectMoney]}{" "}
              {product.price}
            </span>
            <span>
              <em>Platform:</em> {product.description}
            </span>
          </div>
        </div>
      </td>
      <td className="text-center">
        <QuantitySelector
          stock={product.stock}
          updateValue={(counter) => {
            updateValue(counter, product.id);
            product.qty = counter;
            setSubtotal(product.price * product.qty);
          }}
          count={product.qty}
        />
      </td>
      <td className="text-center text-lg text-medium">
        {CONSTANTS.CURRENCIES_SYMBOL[selectMoney]}{" "}
        {Number.parseFloat(subtotal).toFixed(2)}
      </td>
      <td className="text-center">
        <button
          onClick={() => clearItem(product.id)}
          className="remove-from-cart btn btn-danger"
          title={ `Delete ${product.name} product in cart`}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  selectMoney: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  clearItem: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
};