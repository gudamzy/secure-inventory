import ProtectedRoute from './components/ProtectedRoute';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { useState } from 'react';

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AuditLogs from './pages/AuditLogs';

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <div
      className={
        darkMode
          ? 'bg-dark text-white min-vh-100'
          : 'bg-light text-dark min-vh-100'
      }
      style={{
        transition: '0.3s'
      }}
    >

      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
                <AuditLogs />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;