import { useQuery } from '@apollo/client';
import "/Users/oyindamolajongbo/Desktop/bootcamp/trippztracker/client/src/index.css"; 
import DestinationList from '../components/DestinationList';
import DestinationForm from '../components/DestinationForm';

import { QUERY_DESTINATIONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_DESTINATIONS);
  const destinations = data?.destinations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <DestinationForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DestinationList
              destinations={destinations}
              title="Some Destinations..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

