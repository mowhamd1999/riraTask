import axios from "axios";

const API_BASE_URL =
  "https://v6.exchangerate-api.com/v6/15a23ce364c5c63f71f4f319";

export const fetchConversionRate = async (currency, convert) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pair/${currency}/${convert}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching conversion rate");
  }
};

export const fetchReverseConversionRate = async (currency, convert) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pair/${convert}/${currency}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching reverse conversion rate");
  }
};
