const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/calculate-carbon-footprint", async (req, res) => {
  const {
    weight_value,
    weight_unit,
    distance_value,
    distance_unit,
    transport_method,
  } = req.body;

  if (
    !weight_value ||
    !weight_unit ||
    !distance_value ||
    !distance_unit ||
    !transport_method
  ) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const apiUrl = "https://www.carboninterface.com/api/v1/estimates";
  const apiKey = process.env.CARBON_FOOTPRINT_API_KEY;

  const payload = {
    type: "shipping",
    weight_value,
    weight_unit,
    distance_value,
    distance_unit,
    transport_method,
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calculating carbon emissions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
