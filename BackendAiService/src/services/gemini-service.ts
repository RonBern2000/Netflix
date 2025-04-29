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
        console.log("MyListGenres: ", myListGenres);

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
        console.log("MostFrequentLikedGenre: ", mostFrequentLikedGenre);

        //Step3:
        const step3 = `
        Tasks:
            1. Filter the Data list so that it would add to an array each movie(item) that has the "mostFrequentLikedGenre" in his genre_ids array, important note maximum 10 items in the newly created array. Let's call it "reccomendedMovies".

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}] Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}
        - myListGenres: ${myListGenres}
        - mostFrequentLikedGenre: ${mostFrequentLikedGenre}

        Returns:
        - Return only the reccomendedMovies that you made from task number 1 as a string. no explanation, no code block.`;
        const resultStep3 = await chat.sendMessage({message: step3});
        const recommenedMovies: string = resultStep3.candidates?.[0].content?.parts?.[0].text || "";
        console.log("RecommenedMovies: ", recommenedMovies);

        //Step4:
        const step4 = `
        Tasks:
            1. Map over recommenedMovies and return a new array of the ids only. Let's call it "recommenedMoviesIds"

        Args:
        - MyList: [${userMovieList.join(", ")}]
        - Data: [${data.join(", ")}] Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}
        - myListGenres: ${myListGenres}
        - mostFrequentLikedGenre: ${mostFrequentLikedGenre}
        - recommenedMovies: ${recommenedMovies} recommenedMovies is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}

        Returns:
        - Return only the recommenedMoviesIds that you made from task number 1 as a string. no explanation, no code block.`;
        const resultStep4 = await chat.sendMessage({message: step4});
        const recommenedMoviesIds: string = resultStep4.candidates?.[0].content?.parts?.[0].text || "";
        console.log("RecommenedMoviesIds: ", recommenedMoviesIds);
        return recommenedMoviesIds;
    } catch (error) {
      console.error("Error calling Google GenAI API: ", error);
      return "";
    }
  }
}

// const prompt = `
//       Tasks:
//         1. first read and understand the Args and the Returns.
//         2. Match the ids from the MyList to the movies ids which are in the Data. Meaning you should filter the data and find all the movies that match the ids in the MyList. Let's call the new filtered list mostLikedList.
//         3. Take all the genre_ids arrays from the new filtered list mostLikedList and concat them. Let's call the new array: "concated genre_ids".
//         4. Find the most frequently occurring genre_id in the given list of concated genre_ids. First, count how many times each unique word appears in the list. Then identify which number has the highest count. If multiple numbers appear the same number of times (tied for highest count), return the first one you encountered. For example, given the list [5, 3, 5, 3, 5, 1], you would return '5' because it appears 3 times, which is more than any other number. Let's call the the most frequently occurring genre_id "bestGenre"; 

//       Args:
//       - MyList: [${userMovieList.join(", ")}], MyList is an array that contains all the ids of the liked movies.
//       - Data: [${data.join(", ")}], Data is an array that contains strings in a format of an object: '{ id: 34, genre_ids: [54,56], release_date: 25-08-2022}'
//       Returns:
//       - Return only the frequently occurring genre_id "bestGenre" from task number 4 as a string. with no explanation and no code.`;

// 3. Inside mostLikedList you should have the liked movies with id, genre_ids[], release_date.
        // 4. Now interate through them and find inside the genre_ids array the the number that appears the most amount across all the mostLikedList. And set it as the most common genre.