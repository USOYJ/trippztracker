import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const user = Auth.getUser();

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Tripztracker</h1>
          </Link>
          <p className="m-0">Trip time?</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {user.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Render your login/signup links */}
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
