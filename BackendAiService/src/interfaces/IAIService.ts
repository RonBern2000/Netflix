
export interface IAIService{
    getMovieRecommendationsPrompt(userMovieList: string[],data: string[]): Promise<string>;
}
