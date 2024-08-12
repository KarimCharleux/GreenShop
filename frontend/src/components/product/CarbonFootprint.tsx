import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../../interfaces/Item";

interface CarbonFootprintProps {
  item: Item;
  onClose: () => void;
}

// Définition d'une interface pour les attributs de la réponse
interface CarbonDataAttributes {
  carbon_g: number;
  carbon_kg: number;
  carbon_lb: number;
  carbon_mt: number;
  distance_unit: string;
  distance_value: number;
  estimated_at: string;
  transport_method: string;
  weight_unit: string;
  weight_value: number;
}

const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ item, onClose }) => {
  const [carbonData, setCarbonData] = useState<CarbonDataAttributes | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("CarbonFootprint component rendered with item:", item);

    // Désactiver le défilement lorsque la pop-up est ouverte
    document.body.style.overflow = "hidden";

    const fetchCarbonData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/carbon/calculate-carbon-footprint`,
          {
            weight_value: item.weight_value,
            weight_unit: item.weight_unit || "kg",
            distance_value: item.distance_value,
            distance_unit: item.distance_unit || "km",
            transport_method: item.transport_method || "truck",
          },
        );
        console.log("API response:", response.data);

        // Vérifier la structure de la réponse et extraire les attributs
        const attributes = response.data?.data?.attributes;
        if (attributes) {
          setCarbonData(attributes);
        } else {
          setError("Unexpected API response structure.");
        }
      } catch (err) {
        console.error("Failed to fetch carbon footprint data:", err);
        setError("Failed to fetch carbon footprint data.");
      } finally {
        setLoading(false);
      }
    };

    // Appeler la fonction pour récupérer les données de l'API
    fetchCarbonData();

    // Nettoyage lors du démontage du composant
    return () => {
      document.body.style.overflow = "auto"; // Réactiver le défilement lorsque la pop-up est fermée
    };
  }, [item]);

  if (loading) {
    return (
      <div style={overlayStyles}>
        <div style={modalStyles}>
          <h2 style={h2Styles}>Loading Carbon Footprint...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={overlayStyles}>
        <div style={modalStyles}>
          <h2 style={h2Styles}>Error</h2>
          <p>{error}</p>
          <button onClick={onClose} style={closeButtonStyles}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2 style={h2Styles}>Carbon Footprint Details</h2>
        <h3 style={h3Styles}>{item.name}</h3>
        {carbonData ? (
          <div style={contentStyles}>
            <p>
              <strong>Distance:</strong> {carbonData.distance_value}{" "}
              {carbonData.distance_unit}
            </p>
            <p>
              <strong>Transport Method:</strong> {carbonData.transport_method}
            </p>
            <p>
              <strong>Weight:</strong> {carbonData.weight_value}{" "}
              {carbonData.weight_unit}
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
