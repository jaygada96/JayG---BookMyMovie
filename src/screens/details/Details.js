import React, { useEffect } from "react";
import "./Details.css";
//import Header from "../../common/header/Header";
import Header from "../common/header/Header";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
//import StarRating from "../../common/starrating/StarRating";
import StarRating from "../common/starrating/StarRating";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

export default function Details(props) {
  const [movieDetails, setMovieDetails] = React.useState({
    artists: [],
    censor_board_rating: "",
    duration: 0,
    genres: [],
    id: "",
    poster_url: "",
    rating: 0,
    release_date: "",
    status: "",
    storyline: "",
    title: "",
    trailer_url: "",
    wiki_url: "",
  });
  const opts = {
    height: "390",
    width: "800",
    PlayerVars: {
      autoplay: 1,
    },
  };

  async function loadDetails() {
    const rawResponse = await fetch(
      props.baseUrl + "movies/" + props.match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );
    const data = await rawResponse.json();
    setMovieDetails(data);
  }

  function dateString(string) {
    return new Date(string).toDateString();
  }

  const videoOnReady = (event) => {
    event.target.pauseVideo();
  };

  const rateClickHandler = (event) => {
    console.log(event.target);
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div>
      <Header baseUrl={props.baseUrl} movieid={movieDetails.id} detailButton />
      <div className="detailsPage">
        <Typography className="back">
          <Link to={"/"}>&#60; Back to Home</Link>
        </Typography>
        <div className="details-container">
          {/* left section */}
          <div style={{ width: "20%", marginLeft: "10px" }}>
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
          </div>
          {/* middle section */}
          <div style={{ width: "60%" }}>
            <Typography variant="headline" component="h2">
              {movieDetails.title}
            </Typography>
            <Typography>
              <b>Genres:</b>
              {movieDetails.genres.join(", ")}
            </Typography>
            <Typography>
              <b>Duration:</b>
              {movieDetails.duration}
            </Typography>
            <Typography>
              <b>Release Date:</b>
              {dateString(movieDetails.release_date)}
            </Typography>
            <Typography>
              <b>Rating:</b>
              {movieDetails.rating}
            </Typography>
            <Typography style={{ marginTop: "16px" }}>
              <b>Plot:</b> (<a href={movieDetails.wiki_url}>Wiki Link</a>)
              {movieDetails.storyline}
            </Typography>

            <Typography style={{ fontWeight: 600, marginTop: "16px" }}>
              Trailer:
            </Typography>
            <YouTube
              videoId={movieDetails.trailer_url.split("v=")[1]}
              opts={opts}
              onReady={videoOnReady}
            />
          </div>
          {/* right section */}
          <div style={{ width: "20%" }}>
            <Typography style={{ fontWeight: 600 }} component={"span"}>
              Rate this movie:
              <StarRating
                numberOfStars="5"
                rating={movieDetails.rating}
                onClick={rateClickHandler}
              />
            </Typography>
            <Typography
              style={{
                fontWeight: 600,
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              Artists:
            </Typography>
            <GridList cols={2}>
              {movieDetails.artists.map((artist) => (
                <GridListTile key={artist.id}>
                  <img src={artist.profile_url} alt={artist.last_name} />
                  <GridListTileBar
                    title={artist.first_name + " " + artist.last_name}
                  ></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    </div>
  );
}
