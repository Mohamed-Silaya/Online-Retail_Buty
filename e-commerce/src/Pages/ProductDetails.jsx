import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // Import addToCart action

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`https://dummyjson.com/products/${params.id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch addToCart action
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">{product.title}</h1>
          <p className="lead">{product.description}</p>
          <h3 className="text-primary">${product.price}</h3>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart} // Add to Cart button
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}