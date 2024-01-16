import React, { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { FcViewDetails } from "react-icons/fc";
import { FcRegisteredTrademark } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate(); // Obtiene la función de navegación

  const Menus = [
    { title: "Oferta", icon: <FcViewDetails  style={{ fontSize: '24px' }} />, id: "ofertas", path: "/ofertas" },
    { title: "Registro", icon: <FcRegisteredTrademark   style={{ fontSize: '24px' }} />, id: "registro", path: "/register" },
    { title: "Imagen", icon: <FcEditImage    style={{ fontSize: '24px' }} />, id: "imagen", path: "/uploadImage" },
    { title: "Influencers", icon: <FcConferenceCall    style={{ fontSize: '24px' }} />, id: "influencers", path: "/influencers" },
 
    // Otros elementos de menú
  ];

  const handleMenuClick = (id, path) => {
    if (id !== selectedMenu) {
      setSelectedMenu(id);
      navigate(path);
    }
  };
  

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20 "
        } bg-slate-900 h-screen p-5  pt-8 relative duration-200`}
      >
        <CiCircleChevLeft
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple transition-transform transform ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        {/* Resto de tu código */}
        <ul className="">
          {Menus.map((Menu, index) => (
            <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            ${Menu.id === selectedMenu ? "bg-blue-500 text-white" : ""} ${
              Menu.gap ? "mt-9" : "mt-2"
            } `}
            onClick={() => handleMenuClick(Menu.id, Menu.path)}
          >
            {Menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
          
          ))}
        </ul>
      </div>
    </div>
  );
}
