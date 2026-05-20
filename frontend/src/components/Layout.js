import { Link } from 'react-router-dom';

import {
  FaBox,
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt
} from 'react-icons/fa';

function Layout({ children }) {

  return (

    <div className="d-flex">

      <div
        className="bg-dark text-white p-4"
        style={{
          width: '250px',
          minHeight: '100vh'
        }}
      >

        <h2 className="mb-5">
          Secure Inventory
        </h2>

        <ul className="nav flex-column">

          <li className="nav-item mb-3">

            <Link
              className="nav-link text-white"
              to="/dashboard"
            >
              <FaChartBar className="me-2" />
              Dashboard
            </Link>

          </li>

          <li className="nav-item mb-3">

            <Link
              className="nav-link text-white"
              to="/products"
            >
              <FaBox className="me-2" />
              Products
            </Link>

          </li>

          <li className="nav-item mb-3">

            <Link
              className="nav-link text-white"
              to="/logs"
            >
              <FaClipboardList className="me-2" />
              Audit Logs
            </Link>

          </li>

          <li className="nav-item mt-5">

            <button className="btn btn-danger w-100">

              <FaSignOutAlt className="me-2" />

              Logout

            </button>

          </li>

        </ul>

      </div>

      <div className="flex-grow-1 p-4 bg-light">

        {children}

      </div>

    </div>

  );

}

export default Layout;