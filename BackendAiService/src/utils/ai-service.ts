import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env";

const groq = new Groq({ apiKey: GROQ_API_KEY });

export class AIService {
  async getMovieRecommendationsPrompt(userMovieList: string[]): Promise<string> {
    const prompt = `Based on these movies: ${userMovieList.join(", ")}, recommend 5 similar movies.`;
    
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3-70b-versatile",
    });

    return response.choices[0]?.message?.content || "";
  }
}