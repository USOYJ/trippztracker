import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import "../index.css";

import { ADD_DESTINATION } from '../utils/mutations';
import { QUERY_DESTINATIONS } from '../utils/queries';

import Auth from '../utils/auth';

const DestinationForm = () => {
  const [presentLocation, setPresentLocation] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addDestination, { error }] = useMutation(ADD_DESTINATION, {
    refetchQueries: [
      QUERY_DESTINATIONS,
      'getDestinations'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDestination({
        variables: {
          presentLocation,
        },
      });

      setPresentLocation('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'presentLocation' && value.length <= 280) {
      setPresentLocation(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Where is your next destination?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="presentLocation"
                placeholder="Here's a new destination..."
                value={presentLocation}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Destination
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to save your destinations. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default DestinationForm;

