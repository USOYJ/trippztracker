import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

function BasicExample() {
  const [username, setUsername] = useState(""); // Updated variable name
  const [email, setEmail] = useState(""); // Updated variable name
  const [password, setPassword] = useState(""); // Updated variable name

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `The Username you entered was: ${username}, The Email you entered was: ${email}, The Password you entered was: ${password}`
    );
    try {
      const { data } = await addUser({
        variables: { username: username, email: email, password: password },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form className="login col-12 mx-auto m-3" onSubmit={handleSignupSubmit}>
      <h1 className="title">Sign Up</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <h4>Email</h4>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updated variable name
          size="lg"
          style={{ width: "80%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>
          <h4>Username</h4>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Updated variable name
          size="lg"
          style={{ width: "80%" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          <h4>Password</h4>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Updated variable name
          size="lg"
          style={{ width: "80%" }}
        />
      </Form.Group>
      <Button
        className="button mb-3"
        variant="primary"
        type="submit"
        size="lg"
        style={{ width: "100%" }}
      >
        Sign Up
      </Button>
      <p className="register-link">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </Form>
  );
}

export default BasicExample;
