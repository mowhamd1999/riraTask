import axios from "axios";

const API_BASE_URL = "https://v6.exchangerate-api.com/v6/15a23ce364c5c63f71f4f319";

export const fetchConversionRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pair/${fromCurrency}/${toCurrency}`);
    return response.data.conversion_rate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    throw error;
  }
};

export const fetchReverseConversionRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pair/${toCurrency}/${fromCurrency}`);
    return response.data.conversion_rate;
  } catch (error) {
    console.error("Error fetching reverse conversion rate:", error);
    throw error;
  }
};
