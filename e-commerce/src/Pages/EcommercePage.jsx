import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";

export default function EcommercePage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
      axios
    .get('https://dummyjson.com/products')
    .then((pro) => setProduct(pro.data.products))
    .then((err) => console.log(err));
  }, []);
  return <div>

    <h1>EcommercePage</h1>
    <div>
      {product.map((item)=> {
        return(
          <div key={item.id}>
           <ProductCards product= {item}/>
          </div>
        );
      })}
    </div>
  </div>;
}
