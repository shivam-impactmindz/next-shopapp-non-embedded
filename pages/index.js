// pages/index.js
import { useState } from "react";

export default function IndexPage() {
  const [shop, setShop] = useState("");
  const [installUrl, setInstallUrl] = useState(null);

  const handleInstall = async () => {
    if (!shop) {
      alert("Please enter your Shopify store name.");
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop }),
      });

      const data = await response.json();
      if (data.isSuccess) {
        setInstallUrl(data.data);
        window.location.href = data.data;
      } else {
        alert("Failed to generate install URL.");
      }
    } catch (error) {
      console.error("Error during install process:", error);
      alert("An error occurred. Please try again later.");
    }
  };

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
      {installUrl && <p>Redirecting to: {installUrl}</p>}
    </div>
  );
}
