import PropTypes from "prop-types";
import { CONSTANTS } from "../constants";
import { CartItem } from "./CartItem";
import { useCart } from "../hooks/useCart";
import "./../styles/cart.css";
export const Cart = ({ navigateTo }) => {
  const {
    cart: cartData,
    clearCart,
    clearItem,
    updateValue,
    updateCart,
    total,
  } = useCart();

  const selectMoney = CONSTANTS.CURRENCY_LIST.EURO;

  return (
    <>
      {Object.keys(cartData).length > 0 && cartData.products.length > 0 ? (
        <>
          <div className="table-responsive shopping-cart">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Subtotal</th>
                  <th className="text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={clearCart}
                    >
                      <i className="fas fa-trash-alt"></i> Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.products.map((product) => (
                  <CartItem
                    product={product}
                    key={product.id}
                    selectMoney={selectMoney}
                    updateValue={updateValue}
                    clearItem={clearItem}
                    navigateTo={navigateTo}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="shopping-cart-footer">
            <div className="column text-lg">
              To Pay:{" "}
              <span className="text-primary price-total">
                {" "}
                {CONSTANTS.CURRENCIES_SYMBOL[selectMoney]}{" "}
                {Number.parseFloat(total).toFixed(2)}{" "}
              </span>
            </div>
          </div>
          <div className="shopping-cart-footer">
            <div className="column">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigateTo("")}
              >
                <i className="fas fa-home"></i>&nbsp;Back to Shopping
              </button>
            </div>
            <div className="column">
              <button className="btn btn-danger" onClick={clearCart}>
                <i className="fas fa-trash-alt"></i> Clear Cart
              </button>
              <button className="btn btn-success" href="#">
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <span>
            No tienes elementos guardados en el carrito de compra. Añádelos
            desde los productos con la opción de Añadir a la cesta
          </span>
          <button onClick={() => updateCart()}>Load cart</button>
        </>
      )}
    </>
  );
};

Cart.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};