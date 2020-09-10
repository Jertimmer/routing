import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiResult } from "../entities/ApiResult";
import * as Constants from "../entities/Constants";
import { NavLink, useHistory, useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const history = useHistory();
  const routeParams = useParams<{ searchText: string }>();
  const [searchText, setSearchText] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });

  type SearchState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: ApiResult } // todo: specify the data type too
    | { status: "error"; error: any };

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  useEffect(() => {
    async function search() {
      if (routeParams.searchText) {
        setSearchText(routeParams.searchText);
        console.log("TODO search for movies for: ", routeParams.searchText);
        setSearchState({ status: "loading" });

        const response = await axios.get(Constants.BASEURL + "search/movie", {
          params: { api_key: Constants.APIKEY, query: routeParams.searchText },
        });

        console.log("Success", response.data);

        setSearchState({ status: "success", data: response.data });
      }
    }
    search();
  }, [routeParams.searchText]);

  return (
    <div>
      <h1>Discover some movies</h1>
      <p>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={navigateToSearch}>Search</button>
      </p>
      {searchState.status === "loading" && <p>Searching...</p>}
      {searchState.status === "success" && (
        <div>
          <h2>Results:</h2>
          {searchState.data.results.slice(0, 10).map((movie) => {
            return (
              <div className="Movie" key={movie.id}>
                <h4>
                  <NavLink to={"/movie/" + movie.id}>
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </NavLink>
                </h4>
                <div className="Poster">
                  {movie.poster_path != null && (
                    <img
                      src={Constants.IMAGEBASEURL + "w154/" + movie.poster_path}
                    ></img>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
