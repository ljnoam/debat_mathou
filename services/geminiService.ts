import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

// Note: We initialize the AI client inside the function to prevent the app from 
// crashing on load if the API key is missing in the browser environment.

export const generateDebateQuestion = async (
  player: Player
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API_KEY is missing. Please check your Vercel environment variables.");
      return "Oups ! La clé API n'est pas configurée. Vérifie les réglages Vercel.";
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      Tu es un médiateur bienveillant pour un couple (Nono et Mathou).
      Ta mission : Lancer un débat philosophique, une question de valeurs ou une réflexion profonde sur la vie.
      
      Cible de la question : ${player}.
      
      Directives :
      1. Sujets : Philosophie de vie, psychologie, futur, choix moraux, vision du bonheur, gestion des émotions.
      2. INTERDIT : Pas de sujets sexuels (NSFW), pas de vulgarité, pas de questions superficielles ("ton plat préféré").
      3. Ton : Profond, intelligent, bienveillant mais qui pousse à la réflexion et à l'argumentation.
      4. Langue : Français naturel.
      5. Format : Une seule phrase impactante ou une mise en situation courte. Pas de guillemets.
      
      Exemple de style attendu :
      "Est-ce que tu penses qu'on doit tout se dire dans un couple, ou le jardin secret est-il nécessaire ?"
      "Préférerais-tu une vie courte et intense ou une vie longue et paisible ?"
      "Est-ce que nos défauts nous définissent plus que nos qualités ?"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = response.text;
    return text ? text.trim() : "Une erreur silencieuse est survenue...";

  } catch (error) {
    console.error("Error generating question:", error);
    return "L'inspiration me manque (erreur de connexion). Réessaie !";
  }
};