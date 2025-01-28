// pages/products.js
'use client'
import { useEffect, useState } from 'react';



export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.body_html}</p>
            <p>Vendor: {product.vendor}</p>
            <p>Price: {product.variants[0].price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}