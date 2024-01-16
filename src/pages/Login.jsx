import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorSesion from '../components/ErrorSesion';

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://flupic-backend-mvp-dev.up.railway.app/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const tokenWithPrefix = `Bearer ${data.token}`;
        localStorage.setItem('token', tokenWithPrefix);
        handleLogin(tokenWithPrefix); // Envía el token al inicio de sesión
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setErrorMessage('An error occurred');
    }
  };

  return (
    <form className="card-body" onSubmit={handleFormSubmit}>
      {errorMessage && <ErrorSesion message={errorMessage} />}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}

function Login({ handleLogin }) {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    // No se necesita handleLogin aquí para evitar actualizaciones durante el renderizado
    return <Navigate to="/ofertas" />;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
