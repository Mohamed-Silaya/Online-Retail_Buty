import React from "react";
import { CartPlus } from "react-bootstrap-icons";
import "../Styles/ProductCards.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // Import addToCart action

export default function ProductCards({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch addToCart action
  };

  return (
    <div className="card mb-3 shadow-sm hover:shadow-md transition-all">
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <img
            src={product.thumbnail}
            className="img-fluid"
            style={{ maxHeight: "250px", objectFit: "cover" }}
            alt={product.title || "Product image"}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title fw-bold mb-1">{product.title}</h5>
            <p className="text-muted fw-light">{product.brand}</p>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h4 text-primary mb-0">${product.price}</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={() => handleView(product.id)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleAddToCart} // Add to Cart button
                >
                  <CartPlus size={24} color="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}