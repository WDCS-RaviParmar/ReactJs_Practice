import { Link } from "react-router-dom";
import { useProductContext } from './Context/ProductContext';

export default function Cart() {

  let {cartProducts, dispatch, totalPrice} = useProductContext()

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {(cartProducts?.length === 0 || cartProducts?.length === undefined) ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartProducts &&
              cartProducts.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => dispatch({ type: 'minus', productId: cartItem.id, quantity: 0 })}> Remove </button>
                    </div>
                  </div>
                  <div className="cart-product-price">{cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => dispatch({ type: 'minus', productId: cartItem.id, quantity: cartItem.quantity })}> - </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => dispatch({type: 'add', product: cartItem,})}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.total}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button onClick={() => dispatch({type: 'clear'})} className="clear-btn">
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">
                {/* ${cart.cartTotalAmount} */}
               {totalPrice}
                </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
