import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <div className="d-flex">
          <Link to="/cart" className="btn btn-outline-primary position-relative">
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}