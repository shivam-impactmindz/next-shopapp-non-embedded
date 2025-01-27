import { useState } from "react";
export default function IndexPage() {
  const [shop, setShop] = useState("");

  const handleInstall = async () => {
    if (!shop) {
      alert("Please enter your Shopify store name.");
      return;
    }

    window.location.href = `/api/auth?shop=${shop}`;
 
  }

  return (
    <div>
      <h1>Install Shopify App</h1>
      <input
        type="text"
        placeholder="Enter your Shopify store name"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <button onClick={handleInstall}>Install</button>
    </div>
  );
}