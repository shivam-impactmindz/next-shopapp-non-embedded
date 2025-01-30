import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function ProductsPage() {
  const router = useRouter();
  const { shop } = router.query;
  const [session, setSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shop) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/get-session?shop=${shop}`);
        const data = await res.json();

        if (data.session) {
          setSession(data.session);
        } else {
          console.error("Session not found. Redirecting to authentication...");
          router.push("/");
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        router.push("/");
      }
    };

    fetchSession();
  }, [shop]);

  useEffect(() => {
    if (!session) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
        setTimeout(() => {
          router.push("/"); // Redirect to authentication
        }, 3000); // 3-second delay before redirecting
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [session]);

  if (!session) return <div>Loading session...</div>;
  if (loading) return <div style={{ textAlign: "center" }}>Loading products...</div>;
  if (error)
    return (
      <div style={errorContainer}>
        <p>Error loading products. Redirecting to authentication...</p>
      </div>
    );

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Styles
const errorContainer = { textAlign: "center", fontSize: "1.2rem", padding: "20px", color: "red" };
const pageTitle = { textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#333", marginBottom: "20px" };
const gridContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" };
const cardStyle = { backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden", transition: "transform 0.2s ease-in-out" };
const imageStyle = { width: "100%", height: "200px", objectFit: "cover" };
const cardContent = { padding: "15px" };
const titleStyle = { fontSize: "1.3rem", fontWeight: "bold", color: "#333", marginBottom: "5px" };
const infoText = { fontSize: "0.9rem", color: "#555", margin: "3px 0" };
