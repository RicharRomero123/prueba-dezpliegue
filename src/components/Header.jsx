import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderDashboard({ handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };
return(
    <div className="navbar bg-base-100">

  <div className="flex-1">
          {/* Agregar nombre de estaña */}
  </div>

  <div className="flex-none gap-2">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New +</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a className="justify-between" onClick={handleLogoutClick}>
              Logout
            </a></li>
      </ul>
    </div>
  </div>
</div>
)
}