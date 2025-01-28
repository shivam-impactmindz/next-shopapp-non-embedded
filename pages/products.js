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
    
    } finally {
      
    }
  };

  useEffect(() => {
    getData();
  }, []); // Re-run effect when `shop` changes



  return (
    <div>
      <h1>Products for Shop</h1>
      {products.map((item)=>{
        return(
          <div key={item?.id}>
             <h1>{item?.
handle
}</h1>
          </div>
        )
      })}
    </div>
  );
}
