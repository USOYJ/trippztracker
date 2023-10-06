import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../index.css";
import { useMutation } from "@apollo/client";
import { ADD_DESTINATION } from "../utils/mutations";


import { GET_WEATHER, fetchWeather } from "../utils/mutations"; 

function DestinationForm() {
  const [presentLocation, setPresentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  const [addDestination] = useMutation(ADD_DESTINATION, {
    onCompleted: (data) => {
      console.log(data);
      window.location.reload(false);
    },
    onError: (error) => {
      alert("Invalid Entry");
      console.error(error);
    },
  });

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const weather = await fetchWeather(presentLocation);
      setWeatherData(weather); 
    } catch (error) {
      console.error(error);
    }

  
    addDestination({
      variables: { destinationText: presentLocation },
    });
  };

  return (
    <Form className="col-8 mx-auto m-4" onSubmit={handleSignupSubmit}>
      <h1 className="home-title mb-4">Trip Details</h1>
      <Form.Group className="mb-2">
        <Form.Label>
          <h2>Present Location</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Enter Present Location"
          value={presentLocation}
          onChange={(e) => setPresentLocation(e.target.value)}
          size="lg"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <h2>Destination</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          size="lg"
        />
        <Button
          className="button mt-3"
          variant="primary"
          type="submit"
          size="lg"
          style={{ width: "100%" }}
        >
          Add Destination
        </Button>
      </Form.Group>

      {/* Display weather data */}
      {weatherData && (
        <div className="mt-4">
          <h2>Weather Data for {presentLocation}</h2>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </Form>
  );
}

export default DestinationForm;



