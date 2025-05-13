import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/slices/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const dispatch = useDispatch();

  if (totalCount === 0) {
    return <div className="container py-5">Your cart is empty.</div>;
  }

  return (
    <div className="container py-5">
      <h1>Your Shopping Cart</h1>
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-12 mb-3" key={item.id}>
            <div className="d-flex justify-content-between align-items-center border p-3">
              <div className="d-flex align-items-center">
                <img
                  src={item.thumbnail} // Display product image
                  alt={item.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                />
                <div>
                  <h5>{item.title}</h5>
                  <p>Price: ${item.price.toFixed(2)}</p> {/* Display product price */}
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p> {/* Display total cost */}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}