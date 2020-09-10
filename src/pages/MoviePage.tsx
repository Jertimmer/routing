import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Constants from "../entities/Constants";
import { Movie } from "../entities/Movie";
import axios from "axios";
import { Credits } from "../entities/Credits";

export default function MoviePage() {
  const routeParams = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [credits, setCredits] = useState<Credits>();

  useEffect(() => {
    async function getMovieDetails() {
      const response = await axios.get(
        Constants.BASEURL + "movie/" + routeParams.id,
        {
          params: { api_key: Constants.APIKEY },
        }
      );
      if (response.status === 200) {
        setMovie(response.data);
        console.log(response.data);
      }
    }

    async function getMovieCredits() {
      const response = await axios.get(
        Constants.BASEURL + "movie/" + routeParams.id + "/credits",
        { params: { api_key: Constants.APIKEY } }
      );
      if (response.status === 200) {
        setCredits(response.data);
        console.log(response.data);
      }
    }

    getMovieDetails();
    getMovieCredits();
  }, [routeParams.id]);

  console.log(routeParams);
  return (
    <div className="MovieDetailsContainer">
      <div className="MovieDetails">
        <h1>{movie?.title}</h1>
        <div className="GenreContainer">
          {movie?.genres.map((genre) => {
            return (
              <div key={genre.genre_id} className="Genre">
                {genre.name}
              </div>
            );
          })}
        </div>
        {movie?.poster_path && (
          <div className="DetailPoster">
            <img src={Constants.IMAGEBASEURL + "w342/" + movie?.poster_path} />
          </div>
        )}
        <div className="DetailsBlock">
          <div>
            <h4>Tagline</h4>
            <label>{movie?.tagline}</label>
          </div>
          <div>
            <h4>Releasedate</h4>
            <label>{movie?.release_date}</label>
            <h4>Director</h4>
            {credits?.crew.map((crewmember) => {
              if (crewmember.job == "Director") {
                return <label>{crewmember.name}</label>;
              }
            })}
          </div>
          <div>
            <h4>Synopsis</h4>
            <label>{movie?.overview}</label>
          </div>
          <div>
            <h4>Budget</h4>
            <label>${movie?.budget}</label>
          </div>
          <div>
            <h4>Cast</h4>
            <ul>
              {credits?.cast
                .sort((a, b) => a.order - b.order)
                .map((castmember) => {
                  return (
                    <li>
                      {castmember.name} : {castmember.character}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      {movie?.backdrop_path && (
        <div className="MovieBackground">
          <img
            src={Constants.IMAGEBASEURL + "original/" + movie?.backdrop_path}
          />
        </div>
      )}
    </div>
  );
}
