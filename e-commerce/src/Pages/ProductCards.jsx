import React from "react";
import { CartPlus } from "react-bootstrap-icons";
import "../Styles/ProductCards.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function ProductCards({ product }) {
  console.log(product);

  const dispatch = useDispatch();

  // Calculate discounted price
  const discountedPrice =
    product.discountPercentage > 0
      ? (
          product.price -
          product.price * (product.discountPercentage / 100)
        ).toFixed(2)
      : product.price?.toFixed(2);

  // Format original price
  const formattedPrice =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : product.price;

  // Determine if product is in stock
  const isInStock =
    product.availabilityStatus === "In Stock" || product.stock > 0;

  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="card mb-3 shadow-sm hover:shadow-md transition-all">
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <img
            src={product.thumbnail}
            className="img-fluid "
            style={{ maxHeight: "250px", objectFit: "cover" }}
            alt={product.title || "Product image"}
          />

          {/* Category badge */}
          {product.category && (
            <span className="position-absolute top-0 start-0 m-2 badge bg-primary text-white rounded-pill">
              {product.category}
            </span>
          )}

          {/* Discount badge */}
          {product.discountPercentage > 0 && (
            <span className="position-absolute top-0 end-0 m-2 badge bg-danger text-white">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            {/* Title and brand */}
            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title fw-bold mb-1">{product.title}</h5>

                {/* Stock status */}
                {isInStock ? (
                  <span className="badge text-bg-success ms-2">
                    {product.availabilityStatus || "In Stock"}
                  </span>
                ) : (
                  <span className="badge text-bg-danger ms-2">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-muted fw-light">{product.brand}</p>
            </div>

            {/* Description - only show if available */}
            {product.description && (
              <p
                className="card-text small mb-2 text-truncate"
                title={product.description}
              >
                {product.description}
              </p>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="d-flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark">
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="badge bg-light text-dark">
                    +{product.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="d-flex flex-wrap gap-3 mb-2 small text-muted">
              {/* SKU */}
              {product.sku && (
                <div>
                  <i className="bi bi-tag me-1"></i>
                  <span>SKU: {product.sku}</span>
                </div>
              )}

              {/* Shipping info */}
              {product.shippingInformation && (
                <div>
                  <i className="bi bi-truck me-1"></i>
                  <span>{product.shippingInformation}</span>
                </div>
              )}
            </div>

            <div className="mt-auto">
              {/* Price and rating */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Price */}
                <div className="d-flex align-items-baseline gap-2">
                  <span className="h4 text-primary mb-0">
                    ${discountedPrice}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-decoration-line-through text-muted small">
                      ${formattedPrice}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="d-flex align-items-center">
                  <span className="text-warning me-1">★</span>
                  <span>{product.rating?.toFixed(1) || "N/A"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex gap-2">
                <button
                  className={`btn ${
                    isInStock ? "btn-primary" : "btn-secondary"
                  } flex-grow-1`}
                  onClick={() => handleView(product.id)}
                  disabled={!isInStock}
                >
                  View Details
                </button>

                <button
                  className={`btn ${
                    isInStock ? "btn-outline-primary" : "btn-outline-secondary"
                  }`}
                  disabled={!isInStock}
                >
                  <CartPlus
                    onClick={() => dispatch(addToCart(product))}
                    size={24}
                    color="currentColor"
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
