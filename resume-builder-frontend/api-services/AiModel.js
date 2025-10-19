import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AiModel = {
  generateText: async (prompt) => {
    try {
      const response = await axios.post(`${API_URL}/ai/generate-text`, { prompt });
      return response.data.text;
    } catch (error) {
      console.error("AI API error:", error);
      throw error.response?.data || error;
    }
  },
};

export default AiModel;
