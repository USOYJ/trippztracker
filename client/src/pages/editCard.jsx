import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_DESTINATION } from "../utils/mutations"; 

function FormSubmit() {
  const [presentLocation, setPresentLocation] = useState(""); 
  const [destination, setDestination] = useState(""); 
  const { destinationId } = useParams(); 
  const [edit, { error }] = useMutation(UPDATE_DESTINATION); 

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await edit({
        variables: {
          destinationId: destinationId, 
          presentLocation: presentLocation, 
          destination: destination, 
        },
      });
      console.log(data);
      alert("Edit Successful");
   
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form className="col-8 mx-auto m-4" onSubmit={handleEdit}>
      <h1 className="home-title">Edit Destination</h1>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>
          <h2>Present Location:</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Update Present Location"
          value={presentLocation}
          onChange={(e) => setPresentLocation(e.target.value)} 
          size="lg"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <h2>Destination:</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Update Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)} 
          size="lg"
        />
      </Form.Group>
      <Button
        className="button mb-3"
        variant="primary"
        type="submit"
        size="lg"
        style={{ width: "100%" }}
      >
        Update
      </Button>
    </Form>
  );
}

export default FormSubmit;
