import { Movie } from "./Movie";

export type ApiResult = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};
