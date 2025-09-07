
import { GoogleGenAI } from "@google/genai";

export async function getFinancialTip(): Promise<string> {
  try {
    if (!process.env.API_KEY) {
      console.warn("API_KEY environment variable not set. Returning default tip.");
      return "Ingatlah untuk selalu bijak dalam mengelola uang jajanmu. Menabung adalah langkah awal untuk masa depan yang cerah.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Berikan satu tips keuangan singkat untuk siswa sekolah di Indonesia, dalam satu kalimat. Kaitkan dengan nilai-nilai Kristiani seperti pengelolaan yang baik atau kemurahan hati.",
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching financial tip from Gemini API:", error);
    return "Selalu bersyukur atas berkat yang kamu terima dan gunakan dengan bijaksana.";
  }
}
