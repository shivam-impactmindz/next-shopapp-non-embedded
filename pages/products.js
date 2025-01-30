import { MongoClient } from "mongodb";
import Cookies from "cookies";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  const shopData = cookies.get("shopify-app");

  if (!shopData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { shop, installed } = JSON.parse(shopData);

  if (!installed) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const database = client.db("shopifyapp");
  const sessions = database.collection("sessions");
  const session = await sessions.findOne({ shop });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      shop,
      accessToken: session.accessToken,
    },
  };
}

export default function ProductsPage({ shop, accessToken }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch(`/api/product`);
        let data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div style={loadingStyle}>Loading...</div>;
  if (error) return <div style={errorStyle}>Error loading products</div>;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <h1 style={pageTitle}>Products for {shop}</h1>

        <div style={gridContainer}>
          {products.map((item) => (
            <div key={item?.id} style={cardStyle}>
              {item?.image && (
                <img
                  src={item.image.src}
                  alt={item.image.alt || item.title}
                  style={imageStyle}
                />
              )}

              <div style={cardContent}>
                <h2 style={titleStyle}>{item?.title}</h2>
                <p style={infoText}><strong>ID:</strong> {item?.id}</p>
                <p style={infoText}><strong>Product Type:</strong> {item?.product_type}</p>
                <p style={infoText}><strong>Vendor:</strong> {item?.vendor}</p>

                {item?.body_html && (
                  <div style={descContainer}>
                    <h3 style={descHeading}>Description:</h3>
                    <p 
                      style={expanded[item?.id] ? descExpanded : descCollapsed} 
                      dangerouslySetInnerHTML={{ __html: expanded[item?.id] ? item.body_html : item.body_html.substring(0, 120) + '...' }} 
                    />
                    {item.body_html.length > 120 && (
                      <button 
                        style={expandButton} 
                        onClick={() => toggleExpand(item?.id)}
                      >
                        {expanded[item?.id] ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                )}

                {item?.variants?.length > 0 ? (
                  <div>
                    <h3 style={variantHeading}>Variants:</h3>
                    {item.variants.map((variant) => (
                      <p key={variant.id} style={infoText}>
                        {variant.title} - ${variant.price}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p style={infoText}>No variants available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const loadingStyle = { textAlign: "center", fontSize: "1.5rem", padding: "20px", color: "#333" };
const errorStyle = { textAlign: "center", fontSize: "1.5rem", padding: "20px", color: "red" };
const pageTitle = { textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#333", marginBottom: "20px" };
const gridContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" };
const cardStyle = { backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden", transition: "transform 0.2s ease-in-out" };
const imageStyle = { width: "100%", height: "200px", objectFit: "cover" };
const cardContent = { padding: "15px" };
const titleStyle = { fontSize: "1.3rem", fontWeight: "bold", color: "#333", marginBottom: "5px" };
const infoText = { fontSize: "0.9rem", color: "#555", margin: "3px 0" };
const descContainer = { marginTop: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "5px" };
const descHeading = { fontSize: "1rem", fontWeight: "bold" };
const descCollapsed = { fontSize: "0.9rem", color: "#444", lineHeight: "1.5", height: "40px", overflow: "hidden" };
const descExpanded = { fontSize: "0.9rem", color: "#444", lineHeight: "1.5" };
const expandButton = { backgroundColor: "#007bff", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "0.9rem", marginTop: "5px" };
const variantHeading = { fontSize: "1rem", fontWeight: "bold", marginTop: "10px" };
















// import Layout from '../components/Layout';
// import { useEffect, useState } from 'react';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         let res = await fetch(`/api/product`);
//         let data = await res.json();
//         setProducts(data.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   if (loading) return <div style={loadingStyle}>Loading...</div>;
//   if (error) return <div style={errorStyle}>Error loading products</div>;

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <Layout>
//       <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
//         <h1 style={pageTitle}>Products</h1>

//         <div style={gridContainer}>
//           {products.map((item) => (
//             <div key={item?.id} style={cardStyle}>
//               {/* Product Image */}
//               {item?.image && (
//                 <img
//                   src={item.image.src}
//                   alt={item.image.alt || item.title}
//                   style={imageStyle}
//                 />
//               )}

//               {/* Product Details */}
//               <div style={cardContent}>
//                 <h2 style={titleStyle}>{item?.title}</h2>
//                 <p style={infoText}><strong>ID:</strong> {item?.id}</p>
//                 <p style={infoText}><strong>Product Type:</strong> {item?.product_type}</p>
//                 <p style={infoText}><strong>Vendor:</strong> {item?.vendor}</p>

//                 {/* Product Description */}
//                 {item?.body_html && (
//                   <div style={descContainer}>
//                     <h3 style={descHeading}>Description:</h3>
//                     <p 
//                       style={expanded[item?.id] ? descExpanded : descCollapsed} 
//                       dangerouslySetInnerHTML={{ __html: expanded[item?.id] ? item.body_html : item.body_html.substring(0, 120) + '...' }} 
//                     />
//                     {item.body_html.length > 120 && (
//                       <button 
//                         style={expandButton} 
//                         onClick={() => toggleExpand(item?.id)}
//                       >
//                         {expanded[item?.id] ? 'Show Less' : 'Read More'}
//                       </button>
//                     )}
//                   </div>
//                 )}

//                 {/* Variants Section */}
//                 {item?.variants?.length > 0 ? (
//                   <div>
//                     <h3 style={variantHeading}>Variants:</h3>
//                     {item.variants.map((variant) => (
//                       <p key={variant.id} style={infoText}>
//                         {variant.title} - ${variant.price}
//                       </p>
//                     ))}
//                   </div>
//                 ) : (
//                   <p style={infoText}>No variants available</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// // Styles
// const loadingStyle = { textAlign: 'center', fontSize: '1.5rem', padding: '20px', color: '#333' };
// const errorStyle = { textAlign: 'center', fontSize: '1.5rem', padding: '20px', color: 'red' };

// const pageTitle = {
//   textAlign: 'center',
//   fontSize: '2rem',
//   fontWeight: 'bold',
//   color: '#333',
//   marginBottom: '20px',
// };

// const gridContainer = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//   gap: '20px',
// };

// const cardStyle = {
//   backgroundColor: '#fff',
//   borderRadius: '10px',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   overflow: 'hidden',
//   transition: 'transform 0.2s ease-in-out',
// };

// const imageStyle = {
//   width: '100%',
//   height: '200px',
//   objectFit: 'cover',
// };

// const cardContent = {
//   padding: '15px',
// };

// const titleStyle = {
//   fontSize: '1.3rem',
//   fontWeight: 'bold',
//   color: '#333',
//   marginBottom: '5px',
// };

// const infoText = {
//   fontSize: '0.9rem',
//   color: '#555',
//   margin: '3px 0',
// };

// const descContainer = {
//   marginTop: '10px',
//   padding: '10px',
//   background: '#f9f9f9',
//   borderRadius: '5px',
// };

// const descHeading = {
//   fontSize: '1rem',
//   fontWeight: 'bold',
// };

// const descCollapsed = {
//   fontSize: '0.9rem',
//   color: '#444',
//   lineHeight: '1.5',
//   height: '40px',
//   overflow: 'hidden',
// };

// const descExpanded = {
//   fontSize: '0.9rem',
//   color: '#444',
//   lineHeight: '1.5',
// };

// const expandButton = {
//   backgroundColor: '#007bff',
//   color: '#fff',
//   padding: '5px 10px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   fontSize: '0.9rem',
//   marginTop: '5px',
// };

// const variantHeading = {
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   marginTop: '10px',
// };
