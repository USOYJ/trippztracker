const DestinationList = ({ destinations, title }) => {
    if (!destinations.length) {
      return <h3>No Destinations Yet</h3>;
    }
  
    return (
      <div>
        <h3>{title}</h3>
        {destinations &&
          destinations.map((destination) => (
            <div key={destination._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {destination.presentLocation} <br />
              </h4>
            </div>
          ))}
      </div>
    );
  };
  
  export default DestinationList;