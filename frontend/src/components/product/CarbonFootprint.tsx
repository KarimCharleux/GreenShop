import React, { useEffect, useState } from "react";
// import axios from "axios"; // Commenting out the API call for now
import { Item } from "../../interfaces/Item";

interface CarbonFootprintProps {
  item: Item;
  onClose: () => void;
}

const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ item, onClose }) => {
  const [carbonData, setCarbonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("CarbonFootprint component rendered with item:", item);

    // Disable scrolling on body when the modal is open
    document.body.style.overflow = "hidden";

    const mockCarbonData = {
      carbon_g: 1280,
      carbon_kg: 1.28,
      carbon_lb: 2.82,
      carbon_mt: 0,
      distance_unit: "km",
      distance_value: 2000,
      estimated_at: "2024-08-12T01:44:23.186Z",
      transport_method: "truck",
      weight_unit: "kg",
      weight_value: 10,
    };

    // Simulate an API call with a timeout
    setTimeout(() => {
      console.log("Mocked API response:", mockCarbonData);
      setCarbonData(mockCarbonData);
      setLoading(false);
    }, 1000);

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    };
  }, [item]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2 style={h2Styles}>Carbon Footprint Details</h2>
        <h3 style={h3Styles}>{item.name}</h3>
        {carbonData ? (
          <div style={contentStyles}>
            <p>
              Distance: {carbonData.distance_value} {carbonData.distance_unit}
            </p>
            <p>Transport Method: {carbonData.transport_method}</p>
            <p>
              Weight: {carbonData.weight_value} {carbonData.weight_unit}
            </p>
            <h3 style={h3Styles}>Carbon Footprint: {carbonData.carbon_g} g</h3>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <button onClick={onClose} style={closeButtonStyles}>
          Close
        </button>
      </div>
    </div>
  );
};

// CSS Styles for the modal
const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Ensure it is on top of other elements
  overflow: "hidden", // Prevent scrolling
};

const modalStyles: React.CSSProperties = {
  backgroundColor: "rgba(240, 210, 190)",
  padding: "24px",
  borderRadius: "8px",
  width: "500px", // Further increased width
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  zIndex: 1001, // Ensure it is on top of the overlay
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center content horizontally
};

const contentStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  textAlign: "center", // Center content text
};

const closeButtonStyles: React.CSSProperties = {
  marginTop: "16px",
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const h2Styles: React.CSSProperties = {
  textAlign: "center",
  fontSize: "24px", // Adjust the size as needed
  fontFamily: "'Arial', sans-serif", // Change to your desired font-family
  fontWeight: "bolder", // You can adjust the font-weight as well
  marginBottom: "15px", // Adjust margin below the h2
};

const h3Styles: React.CSSProperties = {
  textAlign: "center",
  fontSize: "18px", // Adjust the size as needed
  fontFamily: "'Arial', sans-serif", // Change to your desired font-family
  fontWeight: "bold", // You can adjust the font-weight as well
  marginBottom: "10px", // Adjust margin below the h2
};

export default CarbonFootprint;
