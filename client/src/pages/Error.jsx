import { useRouteError } from 'react-router-dom';

// Define an ErrorPage component
export default function ErrorPage() {
  // Use the useRouteError hook to access route-related errors
  const error = useRouteError();
  console.error(error);


  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>

        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
