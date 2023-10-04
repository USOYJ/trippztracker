import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DestinationList from '../components/DestinationList';
import DestinationForm from '../components/DestinationForm';

import { QUERY_SINGLE_DESTINATION } from '../utils/queries';

const SingleDestination = () => {
  const { destinationId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_DESTINATION, {
    variables: { destinationId: destinationId },
  });

  const destination = data?.destination || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {destination.destinationAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this destination on {destination.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {destination.presentLocation}
        </blockquote>
      </div>

      <div className="my-5">
        <DestinationList comments={destination.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <DestinationForm destinationId={destination._id} />
      </div>
    </div>
  );
};

export default SingleDestination;
