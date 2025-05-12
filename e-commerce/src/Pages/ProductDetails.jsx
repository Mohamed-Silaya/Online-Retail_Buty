import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
   const params = useParams();
    console.log(params);

    const [product, setProduct] = useState([]);


    useEffect(() => {
        axios(`https://dummyjson.com/products/${params.id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    },[params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Calculate discounted price
  const discountedPrice =
    product.discountPercentage > 0
      ? (
          product.price -
          product.price * (product.discountPercentage / 100)
        ).toFixed(2)
      : product.price?.toFixed(2);

 return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
        
        <div className="col-md-6">
          <h1 className="mb-4">{product.title}</h1>
          <p className="lead">{product.description}</p>
          
          <div className="mb-4">
            <h3 className="text-primary">
              ${discountedPrice}{' '}
              <small className="text-muted text-decoration-line-through">
                ${product.price?.toFixed(2)}
              </small>
            </h3>
            <span className="badge bg-danger">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Product Details</h5>
              <dl className="row">
                <dt className="col-sm-4">Brand</dt>
                <dd className="col-sm-8">{product.brand}</dd>

                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 text-capitalize">{product.category}</dd>

                <dt className="col-sm-4">Rating</dt>
                <dd className="col-sm-8">{product.rating}/5</dd>

                <dt className="col-sm-4">Stock Available</dt>
                <dd className="col-sm-8">{product.stock} units</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {product.images?.length > 0 && (
        <div className="row mt-4">
          <h3>Product Images</h3>
          {product.images.map((img, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <img
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className="img-thumbnail"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}