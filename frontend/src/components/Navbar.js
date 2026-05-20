import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import API from '../services/api';

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  // GET USER
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = async () => {

    try {

      await API.post('/auth/logout');

      localStorage.removeItem("user");

      alert('Logged out');

      navigate('/');

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4">

      <Link
        className="navbar-brand"
        to="/"
      >
        Secure Inventory System
      </Link>

      {location.pathname !== '/' && (

        <>

          <div className="navbar-nav">

            <Link
              className="nav-link text-white"
              to="/dashboard"
            >
              Dashboard
            </Link>

            <Link
              className="nav-link text-white"
              to="/products"
            >
              Products
            </Link>

            <Link
              className="nav-link text-white"
              to="/audit-logs"
            >
              Audit Logs
            </Link>

          </div>

          {/* USER INFO */}
          <span className="text-white ms-auto me-3">

            Logged in as:

            <strong>
              {" "}
              {user?.username}
            </strong>

            {" "}(
            {user?.role}
            )

          </span>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </>

      )}

    </nav>

  );

}

export default Navbar;