import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Axios from "axios";
import Button from "@material-ui/core/Button";

export default function Weather() {
  const [search, setsearch] = useState("");
  const [weather, setWeather] = useState(["--  ", "", ""]);
  const api = "c3efcd4bdd5f02b9ecf6da043ee1b71a";

  function weatherRepot() {
    if (search === "") {
      alert("plese enter somethimg");
    }
    async function fetch() {
      const getData = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api}`
      );

      setWeather([
        `${(getData.data.main.temp - 273.15).toFixed(2)}`,
        `${getData.data.name}`,
        ` ${getData.data.sys.country}`,
      ]);
    }
    fetch();
  }

  function getSearch(e) {
    if (e.target.value === "") {
      setWeather(["-- ", "", ""]);
    }
    setsearch(e.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Weather App</h1>
        </div>

        <div className="body">
          <div id="input">
            <Input
              type="text"
              onChange={getSearch}
              value={search}
              placeholder="Type City"
              color="secondary"
            />
            <Button
              onClick={weatherRepot}
              variant="contained"
              color="secondary"
            >
              Show
            </Button>
          </div>
          <p>
            Temperature : {`${weather[0]}`}
            <sup>o</sup> C
          </p>
          <p style={{ textTransform: "capitalize" }}>
            {`${weather[1]}`}
            {`${weather[2]}`}
          </p>
        </div>
      </div>
    </>
  );
}
