import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/offers`, {
          headers: {
            Authorization: storedToken, // Incluir el token en el header
          },
        });

        setData(response.data._embedded.offerSearchResultResponseList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Ordenar los elementos por fecha de creación de forma descendente
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Obtener los elementos para la página actual basado en la fecha ordenada
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusButtonClass = (Estado) => {
    switch (Estado) {
      case 'En Proceso':
        return 'btn-warning';
      case 'Pagando':
        return 'btn-info';
      case 'Error en la Compra':
        return 'btn-error';
      case 'Creado':
        return 'btn-success';
      default:
        return 'btn-error';
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Nombre Cliente</th>
              <th>Plataforma</th>
              <th>Nombre Influencer</th>
              <th>Fecha Creación</th>
              <th>Fecha de Actualización</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.clientFullName}</td>
                <td>{item.socialMedia}</td>
                <td>{item.influencerFullName}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className={`btn ${
                      item.updatedAt ? getStatusButtonClass(item.status) : 'btn-warning'
                    }`}
                  >
                    {item.updatedAt ? item.status : 'En Proceso'}
                  </button>
                </td>
                <td>
                  <Link to={`/ofertas/detalle/${item.id}`} className="btn btn-outline btn-info">
                    details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginador */}
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          »
        </button>
      </div>
    </div>
  );
}
