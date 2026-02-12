
import { GoogleGenAI, Type } from "@google/genai";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBaristaRecommendation = async (mood: string, weather: string) => {
  const menuContext = MENU_ITEMS.map(item => `${item.name}: ${item.description}`).join('\n');
  
  const prompt = `
    You are "SOCRATES" the Philosopher-Barista. You combine the wisdom of ancient dialectics with the warm care of a boutique cafe.
    
    The current weather is ${weather}.
    The guest has shared this deep reflection on their state of mind: "${mood}".
    
    Our menu consists of:
    ${menuContext}
    
    Recommend exactly one item. Use the guest's detailed description to craft a response that feels profoundly personal. 
    Explain how the chosen beverage or treat acts as a dialogue partner to their soul in this ${weather} weather.
    
    Maintain a cozy, soulful, and poetic tone. Use rich sensory details. 
    You may include a brief, relevant philosophical thought or metaphor.
    
    Limit: Roughly 100-120 words for a more substantive explanation.
    
    Return your response as a JSON object with two fields: "recommendation" (the poetic explanation) and "item_name" (the exact name of the item from the menu).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            item_name: { type: Type.STRING },
          },
          required: ["recommendation", "item_name"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Socrates is in deep thought:", error);
    return {
      recommendation: "Your words carry the weight of many seasons. In this quiet moment, let the Vanilla Bean Oat Latte be your companion. Its sweetness is a gentle reminder of the simple truths that persist through the fog of the mind.",
      item_name: "Vanilla Bean Oat Latte"
    };
  }
};
