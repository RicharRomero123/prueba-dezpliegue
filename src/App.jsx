import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Ofertas from './pages/Ofertas';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import UploadImage from './components/UploadImage';
import Sidebar from "../src/components/Sidebar";
import Detail from './pages/detail';
import Influencers from './pages/Influencers';
import DetailInfluencer from './pages/DetailInfluencer';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    // Lógica de autenticación exitosa aquí
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Lógica de cierre de sesión aquí
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token'); // Elimina el token al cerrar sesión
  };
  return (
    <div className="flex">
      <Routes>
        {/* Ruta para la página de login */}
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        
        {/* Ruta protegida para el dashboard */}
        <Route
          path='/*'
          element={
            isLoggedIn ? (
              <ProtectedRoutes />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

// Componente con rutas protegidas que requieren inicio de sesión
function ProtectedRoutes() {
  return (
    <div className="flex">
      <div className="fixed left-0 top-0 h-full">
        <div className="sidebar-container">
          <Sidebar />
        </div>
      </div>
      <div className="ml-64 w-full p-5 overflow-y-auto">
        <Routes>
          <Route path='/ofertas' element={<Ofertas />} />
          <Route path='/ofertas/detalle/:id' element={<Detail />} />
          <Route path='/influencers/detalle/:id' element={<DetailInfluencer />} />
          <Route path='/register' element={<Register />} />
          <Route path='/uploadImage' element={<UploadImage />} />
          <Route path='/influencers' element={<Influencers />} />

          {/* Agregar más rutas según sea necesario */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
