'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const { shop } = router.query; // Access the `shop` parameter from the URL
console.log(shop);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
   

    try {
      let res = await fetch(`/api/product?shop=${shop}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      let data = await res.json();
      console.log(data);
      setProducts(data.products); // Update products state
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Re-run effect when `shop` changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products for Shop: {shop}</h1>
     
    </div>
  );
}
