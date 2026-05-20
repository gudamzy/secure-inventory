import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleLogin = async () => {

    try {

      const response = await API.post(
        '/auth/login',
        {
          username,
          password
        }
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      alert('Invalid Login');

    }

  };

  return (

    <div
      className="
        d-flex
        justify-content-center
        align-items-center
        vh-100
      "
      style={{

        background:
          "linear-gradient(to right, #141e30, #243b55)"

      }}
    >

      <div
        className="card p-5 shadow-lg"
        style={{

          width: '400px',

          borderRadius: '20px',

          border: 'none'

        }}
      >

        <div className="text-center mb-4">

          <h1
            className="fw-bold"
            style={{
              color: '#243b55'
            }}
          >
            Secure Inventory
          </h1>

          <p className="text-muted">

            Login to continue

          </p>

        </div>

        <input
          type="text"
          className="form-control mb-3 p-3"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-4 p-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-dark w-100 p-3"
          onClick={handleLogin}
          style={{

            borderRadius: '12px',

            fontWeight: 'bold'

          }}
        >
          LOGIN
        </button>

        <div className="text-center mt-4">

          <small className="text-muted">

            Secure Software Development Project

          </small>

        </div>

      </div>

    </div>

  );

}

export default Login;