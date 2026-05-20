import { useEffect, useState } from 'react';

import API from '../services/api';

import {
  FaBox,
  FaUsers,
  FaShieldAlt
} from 'react-icons/fa';

function Dashboard() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    try {

      const response = await API.get('/products');

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div className="container mt-4">

      <h1 className="fw-bold mb-4">
        Dashboard
      </h1>

      {/* TOP CARDS */}

      <div className="row">

        <div className="col-md-4">

          <div
            className="card border-0 shadow-lg p-4 mb-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4>

              <FaBox className="me-2 text-primary" />

              Total Products

            </h4>

            <h1 className="fw-bold mt-2">
              {products.length}
            </h1>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card border-0 shadow-lg p-4 mb-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4>

              <FaUsers className="me-2 text-success" />

              Total Users

            </h4>

            <h1 className="fw-bold mt-2">
              10
            </h1>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card border-0 shadow-lg p-4 mb-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4>

              <FaShieldAlt className="me-2 text-danger" />

              Security Logs

            </h4>

            <h1 className="fw-bold mt-2">
              5
            </h1>

          </div>

        </div>

      </div>

      {/* FEATURED PRODUCTS */}

      <div
        className="card border-0 shadow-lg p-4 mt-4"
        style={{
          borderRadius: '25px'
        }}
      >

        <h2 className="fw-bold mb-4">
          Featured Products
        </h2>

        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '20px',
            paddingBottom: '10px'
          }}
        >

          {products.map((product) => (

            <div
              key={product.id}
              style={{
                minWidth: '250px'
              }}
            >

              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: '20px',
                  transition: '0.3s'
                }}
              >

                <img
                  src={product.image}
                  alt="product"
                  className="card-img-top"
                  style={{
                    height: '160px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                  }}
                />

                <div className="card-body">

                  <h5 className="fw-bold">
                    {product.name}
                  </h5>

                  <p className="text-muted">

                    Quantity:
                    {' '}
                    {product.quantity}

                  </p>

                  <h6 className="text-primary fw-bold">

                    RM{product.price}

                  </h6>

                  <p
                    className={`fw-bold ${
                      product.quantity > 20
                        ? 'text-success'
                        : product.quantity > 5
                        ? 'text-warning'
                        : 'text-danger'
                    }`}
                  >

                    {product.quantity > 20
                      ? 'Available'
                      : product.quantity > 5
                      ? 'Limited'
                      : 'Low Stock'}

                  </p>

                  {/* STOCK BAR */}

                  <div
                    className="progress mb-3"
                    style={{
                      height: '10px',
                      borderRadius: '20px'
                    }}
                  >

                    <div
                      className={`progress-bar ${
                        product.quantity > 20
                          ? 'bg-success'
                          : product.quantity > 5
                          ? 'bg-warning'
                          : 'bg-danger'
                      }`}
                      role="progressbar"
                      style={{
                        width: `${product.quantity * 5}%`
                      }}
                    >

                    </div>

                  </div>

                  <button
                    className="btn btn-dark w-100 mt-2"
                    style={{
                      borderRadius: '12px'
                    }}
                  >
                    View Product
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;