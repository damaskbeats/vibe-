
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generate3DLogo = async () => {
  const prompt = `A 3D high-quality tactile boutique cafe logo for 'SOCRATES'. 
  The logo features a minimalist, stylized bust of the philosopher Socrates (inspired by ancient engravings) carved from polished dark espresso-colored wood with gold leaf accents in the beard. 
  The lighting is warm and cinematic, creating soft shadows. 
  The background is a clean, creamy oat-milk texture. 
  Artisanal, handcrafted, 3D render, luxury boutique aesthetic, depth of field.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating 3D logo:", error);
    return null;
  }
};
