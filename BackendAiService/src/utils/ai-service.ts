import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env";
import { IAIService } from "../interfaces/IAIService";

const groq = new Groq({ apiKey: GROQ_API_KEY });

export class AIService implements IAIService {
  async getMovieRecommendationsPrompt(data: string[], userMovieList: string[]): Promise<string> {
    try {
      const prompt = `Context:
      - The first list ("Liked user's movies") contains movie IDs that the user liked.
      - The second list ("Data") contains all movies available for recommendation. Each movie includes an ID, a list of genres, and a release date.
  
      General Purpose:
      - Recommend 10 movies to the user based on their genre preferences, using the data list.
  
      Rules:
      1. Identify the genres the user likes by matching the IDs from the liked movies list to the data list.
      2. Recommend exactly 10 movie IDs:
        - Prefer movies that match the user's liked genres.
        - If the user's liked movies list is empty, recommend the movies based on the latest release dates.
        - If fewer than 10 movies matching the user's genres are available, fill the remaining spots with the latest released movies.
      3. Only return a list of movie IDs, no additional text or explanation.
  
      Input:
      - Liked user's movies: [${userMovieList.join(", ")}]
      - Data: [${data.join(", ")}]`;
      
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      console.log("AI res: ", response);
      return response.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Error calling Groq API: ", error);
      return "";
    }
  }
}