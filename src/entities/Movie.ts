import { Genre } from "./Genre";

export type Movie = {
  poster_path: string;
  overview: string;
  release_date: string;
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  backdrop_path: string;
  popularity: number;
  tagline: string;
  budget: number;
};
