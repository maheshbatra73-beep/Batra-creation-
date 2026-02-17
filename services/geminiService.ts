import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeShopImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const productList = PRODUCTS.map(p => `${p.name} (ID: ${p.id}, Style: ${p.description})`).join('\n');
    
    const prompt = `
      You are an expert fashion wholesale consultant. 
      Analyze the interior and vibe of this client's retail shop from the image provided.
      Determine the target demographic and aesthetic (e.g., high-end boutique, casual street wear, budget-friendly, traditional).
      
      Based on the shop's look, recommend the best matching products from my wholesale catalog below:
      ${productList}
      
      Return the result in JSON format with two fields:
      1. "recommendation": A paragraph explaining the shop's vibe and why these specific products would sell well there.
      2. "suggestedProductIds": An array of strings containing the IDs of the top 3-4 recommended products.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg', 
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            suggestedProductIds: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing shop image:", error);
    throw error;
  }
};