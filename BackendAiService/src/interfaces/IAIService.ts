
export interface IAIService{
    getMovieRecommendationsPrompt(data: string[], userMovieList: string[]): Promise<string>;
}
