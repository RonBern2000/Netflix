// import Groq from "groq-sdk";
// import { GROQ_API_KEY } from "../config/env";
// import { IAIService } from "../interfaces/IAIService";

// const groq = new Groq({ apiKey: GROQ_API_KEY });

// export class AIService implements IAIService {
//   async getMovieRecommendationsPrompt(userMovieList: string[], data: string[]): Promise<string> {
//     try {
//       const prompt = `
//       - Make a new list containing only the movie strings from the first list where the "id" matches any of the IDs in the second list.
//       - From this new list you made find out what is the most common genre_id from all the movies you found above.
//       - Now when you found the most common genre_id search for movies that have this genre_id in the Data list.

//       Args:
//       - MyList: [${userMovieList.join(", ")}]
//       - Data: [${data.join(", ")}]
//       Returns:
//       - Return only the genre number that you found as string, with no explanation.`;
      

//       const response = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         model: "llama-guard-3-8b",
//       });
//       console.log("Most liked genre: ", response.choices[0]?.message?.content);
//       return response.choices[0]?.message?.content || "";
//     } catch (error) {
//       console.error("Error calling Groq API: ", error);
//       return "";
//     }
//   }
// }

// // Context:
// //       - "MyList" is a list of movie IDs liked by the user.
// //       - "Data" is a list of movie objects, each with:
// //         - id: movie ID
// //         - genres: list of genre IDs

// //       Task:
// //       - Find all movies in "Data" that match IDs in "MyList".
// //       - Extract all their genre IDs.
// //       - Identify and return the single most common genre ID among those extracted genres ids.
// //       - If "MyList" is empty or no genres found, return "No genres found".

// //       Output:
// //       - Return only the most common genre ID as a string, with no explanation.

// //       Input:
// //       - MyList: [${userMovieList.join(", ")}]
// //       - Data: [${data.join(", ")}]

// // const prompt = `Context:
// //       - The first list ("Liked user's movies") contains movie IDs that the user liked.
// //       - The second list ("Data") contains all available movies. Each movie is an object with:
// //         - id: movie ID
// //         - genres: an array of genre IDs
// //         - releaseDate: release date in ISO format (e.g. "2022-08-15")

// //       Goal:
// //       - Recommend exactly 10 movie IDs to the user based on their genre preferences.

// //       Instructions:
// //       1. Identify the movies from the "Liked user's movies" list by matching their IDs in the "Data" list.
// //       2. Collect all genres from the liked movies and find the genres that appear most frequently.
// //       3. Recommend movies prioritizing those that match the user's most frequent liked genres.
// //       4. If the "Liked user's movies" list is empty:
// //         - Recommend the 10 latest released movies from the "Data" list.
// //       5. If fewer than 10 movies match the liked genres:
// //         - Fill remaining recommendation slots with the latest released movies regardless of genre.
// //       6. Return exactly a list of 10 movie IDs, with no additional text or explanation.

// //       Input:
// //       - Liked user's movies: [${userMovieList.join(", ")}]
// //       - Data: [${data.join(", ")}]`;

// //llama-3.3-70b-versatile