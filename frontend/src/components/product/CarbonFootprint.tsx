import React, { useEffect, useState } from "react";
// import axios from "axios"; // Commenter cette ligne pour éviter l'appel API réel
import { Item } from "../../interfaces/Item";
import { relative } from "path";

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
  const [dots, setDots] = useState<number>(1);

  useEffect(() => {
    console.log("CarbonFootprint component rendered with item:", item);

    // Désactiver le défilement lorsque la pop-up est ouverte
    document.body.style.overflow = "hidden";

    // Simuler une réponse API
    const fetchCarbonData = async () => {
      try {
        // Commenter cette ligne pour éviter l'appel API réel
        // const response = await axios.post(
        //   `${process.env.REACT_APP_BACKEND_URL}/api/carbon/calculate-carbon-footprint`,
        //   {
        //     weight_value: item.weight_value,
        //     weight_unit: item.weight_unit || "kg",
        //     distance_value: item.distance_value,
        //     distance_unit: item.distance_unit || "km",
        //     transport_method: item.transport_method || "truck",
        //   },
        // );

        // Réponse mockée
        const mockResponse = {
          data: {
            data: {
              attributes: {
                carbon_g: 50,
                carbon_kg: 0.5,
                carbon_lb: 1.1,
                carbon_mt: 0.0005,
                distance_unit: "km",
                distance_value: 200,
                estimated_at: "2024-08-15",
                transport_method: "air",
                weight_unit: "kg",
                weight_value: 10,
              },
            },
          },
        };

        console.log("Mock API response:", mockResponse.data);

        // Vérifier la structure de la réponse et extraire les attributs
        const attributes = mockResponse.data?.data?.attributes;
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

  // Effet pour gérer l'animation des points
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots % 3) + 1);
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handlePurchaseClick = () => {
    // Remplacez cette ligne par votre logique d'achat réelle
    alert(`Purchasing ${item.name}`);
    // Vous pouvez rediriger vers une page de paiement, ouvrir un modal d'achat, etc.
  };

  if (loading) {
    return (
      <div style={overlayStyles}>
        <div style={modalStyles}>
          <h2 style={h2Styles}>
            Loading Carbon Footprint
            {".".repeat(dots)}
          </h2>
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
        <div style={contentContainerStyles}>
          <div style={imageContainerStyles}>
            <img
              src={require(`../../assets/products/${item.image}`)}
              alt={item.name}
              style={imageStyles}
            />
            <h3 style={itemNameStyles}>{item.name}</h3>
          </div>
          <div style={infoContainerStyles}>
            <h3 style={productInfoTitleStyles}>Info du produit</h3>
            <hr style={separatorStyles} />
            {carbonData ? (
              <>
                <p style={paragraphStyles}>
                  <strong>Distance:</strong> {carbonData.distance_value}{" "}
                  {carbonData.distance_unit}
                </p>
                <p style={paragraphStyles}>
                  <strong>Weight:</strong> {carbonData.weight_value}{" "}
                  {carbonData.weight_unit}
                </p>
                <p style={paragraphStyles}>
                  <strong>Transport Method:</strong>{" "}
                  {carbonData.transport_method}
                </p>
                <h2 style={h2Styles}>
                  <strong>Carbon Footprint:</strong> {carbonData.carbon_g} g
                </h2>

                <button
                  onClick={handlePurchaseClick}
                  style={purchaseButtonStyles}
                >
                  <img
                    src={require("../../assets/purchase.png")}
                    alt="Close"
                    style={purchaseImageStyles}
                  />
                </button>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <button onClick={onClose} style={closeButtonStyles}>
          <img
            src={require("../../assets/close.png")}
            alt="Close"
            style={{ width: "30px", height: "30px" }}
          />
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
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  width: "800px",
  height: "500px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  zIndex: 1001, // Ensure it is on top of the overlay
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center content horizontally
  justifyContent: "center",
  position: "relative",
};

const contentContainerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "stretch", // Aligne les enfants pour qu'ils occupent toute la hauteur du conteneur
  gap: "4px",
  width: "100%",
  height: "100%", // Assurez-vous que le conteneur parent a une hauteur définie
};

const imageContainerStyles: React.CSSProperties = {
  backgroundColor: "rgba(240, 210, 190)",
  display: "flex",
  width: "300px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Centrer le contenu verticalement
  flexGrow: 1, // Permet d'occuper toute la hauteur disponible
};

const imageStyles: React.CSSProperties = {
  maxWidth: "250px", // Adjust width as needed
  maxHeight: "250px", // Adjust height as needed
  objectFit: "cover",
};

const itemNameStyles: React.CSSProperties = {
  textAlign: "center",
  marginTop: "10px",
  fontSize: "24px",
};

const infoContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1, // Permet d'occuper toute la hauteur disponible
};

const purchaseButtonStyles: React.CSSProperties = {
  marginTop: "16px",
  padding: "5px 20px",
  backgroundColor: "rgba(76, 175, 80, 0.9)", // Green background color
  color: "#fff", // White text
  border: "2px solid #000", // Black border
  borderRadius: "8px", // Rounded corners
  cursor: "pointer",
  width: "100px",
  display: "flex", // Ensure the button is a flex container
  justifyContent: "center", // Center contents horizontally
  alignItems: "center", // Center contents vertically
  textAlign: "center", // Center text inside button
  transform: "translateY(30px)",
};

const purchaseImageStyles: React.CSSProperties = {
  width: "35px",
  height: "35px",
  objectFit: "contain", // Ensure the image maintains its aspect ratio
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute", // Position the button absolutely
  top: "0px", // Align to the top right corner
  right: "0px", // Align to the top right corner
  background: "transparent", // Make the button background transparent
  border: "none", // Remove any default borders
  padding: "0", // Remove any padding
  cursor: "pointer",
};

const h2Styles: React.CSSProperties = {
  textAlign: "center",
  fontSize: "27px", // Adjust the size as needed
  fontFamily: "'Arial', sans-serif", // Change to your desired font-family
  fontWeight: "bolder", // You can adjust the font-weight as well
  marginBottom: "20px",
};

const productInfoTitleStyles: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
};

const separatorStyles: React.CSSProperties = {
  width: "90%",
  border: "none",
  borderTop: "2px solid #ccc",
  marginTop: "10px",
  marginBottom: "20px",
};

const paragraphStyles: React.CSSProperties = {
  marginBottom: "25px", // Adjust the margin as needed
};

export default CarbonFootprint;
