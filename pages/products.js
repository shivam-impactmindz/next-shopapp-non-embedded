'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      let res = await fetch(`/api/product`);
      let data = await res.json();
      console.log(data.data);
      setProducts(data.data); // Update products state
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Re-run effect when `shop` changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h1>Products for Shop</h1>
      {products.map((item) => (
        <div key={item?.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h2>Title: {item?.title}</h2>
          <p>ID: {item?.id}</p>
          <p>Handle: {item?.handle}</p>
          <p>Product Type: {item?.product_type}</p>
          <p>Vendor: {item?.vendor}</p>
          <p>Created At: {item?.created_at}</p>
          <p>Updated At: {item?.updated_at}</p>
          <p>Published At: {item?.published_at}</p>
          <p>Status: {item?.status}</p>
          <p>Tags: {item?.tags}</p>
          <p>Body HTML: {item?.body_html}</p>
          {item?.image && (
            <div>
              <h3>Image:</h3>
              <img src={item.image.src} alt={item.image.alt || item.title} style={{ width: '200px' }} />
              <p>Image ID: {item.image.id}</p>
              <p>Image Width: {item.image.width}</p>
              <p>Image Height: {item.image.height}</p>
            </div>
          )}
          <h3>Variants:</h3>
          {item?.variants?.length > 0 ? (
            item.variants.map((variant) => (
              <div key={variant.id} style={{ marginLeft: '20px' }}>
                <p>Variant ID: {variant.id}</p>
                <p>Variant Title: {variant.title}</p>
                <p>Variant Price: {variant.price}</p>
              </div>
            ))
          ) : (
            <p>No variants available</p>
          )}
        </div>
      ))}
    </div>
  );
}