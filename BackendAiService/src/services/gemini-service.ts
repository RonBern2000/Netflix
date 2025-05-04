import { GoogleGenAI } from "@google/genai";
import { IAIService } from "../interfaces/IAIService";
import { GEMINI_API_KEY } from "../config/env";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY  || "" });

export class AI2Service implements IAIService {
  async getMovieRecommendationsPrompt(userMovieList: string[], data: string[]): Promise<string> {
    try {
        const chat = ai.chats.create({
            model: "gemini-2.0-flash",
            config: {
                temperature: 0.5,
                maxOutputTokens: 1024,
            },
        });
        // Step1:
        const step1 = `
        Tasks:
            1. Read and understand the Args and Returns.
            2. Filter the movies from Data whose ids are in MyList.
            3. Concatenate their genre_ids into a single array. Let's call the Concatenated array "liked_genre_ids".

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}]

        Returns:
        - Return only the liked_genre_ids array that you made from task number 3 as a string. no explanation, no code block.`;
        
        const resultStep1 = await chat.sendMessage({message: step1});
        const myListGenres: string = resultStep1.candidates?.[0].content?.parts?.[0].text || "";

        //Step2:
        const step2 = `
        Tasks:
            1. Find the most frequently occurring genre_id in the myListGenres. Let's call it "mostFrequentLikedGenre"

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}]
        - myListGenres: ${myListGenres}

        Returns:
        - Return only the mostFrequentLikedGenre task number 1 as a string. no explanation, no code block.`;
        const resultStep2 = await chat.sendMessage({message: step2});
        const mostFrequentLikedGenre = resultStep2.candidates?.[0].content?.parts?.[0].text || "";

        //Step3:
        const step3 = `
        Tasks:
            1. Filter the Data list so that it would add to an array each movie(item) that has the "mostFrequentLikedGenre" in his genre_ids array, But dont add the movie if it's id matchs any of the ids in the movies in MyList list. important note: maximum 10 items in the newly created array. Let's call it "reccomendedMovies".

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}] Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}
        - myListGenres: ${myListGenres}
        - mostFrequentLikedGenre: ${mostFrequentLikedGenre}

        Returns:
        - Return only the reccomendedMovies that you made from task number 1 as a string. no explanation, no code block.`;
        const resultStep3 = await chat.sendMessage({message: step3});
        const recommenedMovies: string = resultStep3.candidates?.[0].content?.parts?.[0].text || "";

        //Step4:
        const step4 = `
        Tasks:
            1. Only if recommenedMovies does not have 10 items(movies) then fill up to 10 items from the Data list based on the latest release_date field in each item. Either if you made changes to recommenedMovies or not return it.

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}] Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}
        - myListGenres: ${myListGenres}
        - mostFrequentLikedGenre: ${mostFrequentLikedGenre}
        - recommenedMovies: ${recommenedMovies} recommenedMovies is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}

        Returns:
        - Return only the recommenedMovies that you made from task number 1 as a string. no explanation, no code block.`;
        const resultStep4 = await chat.sendMessage({message: step4});
        const updatedrecommenedMovies: string = resultStep4.candidates?.[0].content?.parts?.[0].text || "";

        //Step5:
        const step5 = `
        Tasks:
            1. Map over recommenedMovies and return a new array of the ids only. Let's call it "recommenedMoviesIds"

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}] Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}
        - myListGenres: ${myListGenres}
        - mostFrequentLikedGenre: ${mostFrequentLikedGenre}
        - recommenedMovies: ${updatedrecommenedMovies} recommenedMovies is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}

        Returns:
        - Return only the recommenedMoviesIds that you made from task number 1 as a string. no explanation, no code block.`;
        const resultStep5 = await chat.sendMessage({message: step5});
        const recommenedMoviesIds: string = resultStep5.candidates?.[0].content?.parts?.[0].text || "";

        return recommenedMoviesIds;
    } catch (error) {
      console.error("Error calling Google GenAI API: ", error);
      return "";
    }
  }
}