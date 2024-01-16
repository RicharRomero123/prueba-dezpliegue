import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SkeletonLineal from '../components/SkeletonLineal';

export default function Detail() {
  const [detailData, setDetailData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetailData() {
      try {
        const storedToken = localStorage.getItem('token');

        const response = await axios.get(`https://flupic-backend-mvp-dev.up.railway.app/v1/offers/${id}`, {
          headers: {
            Authorization: storedToken, // Incluir el token en el header
          },
        });

        setDetailData(response.data);

        const statusData = ['En Proceso', 'Pagando', 'Error en la Compra', 'Creado'];
        setStatusOptions(statusData);
        setSelectedStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching detail data:', error);
      }
    }

    fetchDetailData();
  }, [id]);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleStatusChange = async () => {
    try {
      const storedToken = localStorage.getItem('token');

      await axios.put(`https://flupic-backend-mvp-dev.up.railway.app/v1/offers/${id}`, {
        updatedStatus: selectedStatus,
      }, {
        headers: {
          Authorization: storedToken, // Incluir el token en el header para la solicitud PUT
        },
      });

      setDetailData((prevData) => ({
        ...prevData,
        status: selectedStatus,
      }));

      setEditable(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
  
    <div className="container ">

<div className="navbar bg-neutral text-neutral-content">


<div className="text-sm breadcrumbs">
  <ul>
  <li>
  <Link to="/ofertas">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
    </svg>
    Ofertas
  </Link>
</li>
    <li>
      <span className="inline-flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Detalle Compra
      </span>
    </li>
  </ul>
</div>


</div>



      <h1 className="text-center mb-4">Detalles de la Orden de Compra</h1>
      {detailData ? (
        <div className="card">
          <div className="card-body">
            <h3>ID de la Orden: {detailData.id}</h3>
            <p>Nombre: {detailData.name}</p>
            <p>Apellido: {detailData.lastname}</p>
            <p>Email: {detailData.email}</p>
            <p>Teléfono: {detailData.phone}</p>
            <p>Empresa: {detailData.companyName}</p>
            <p>Campaña: {detailData.campaignName}</p>
            <p>Objetivo de la Campaña: {detailData.campaignGoal}</p>
            <p>Idea de la Campaña: {detailData.campaignIdea}</p>
            {/* Agrega más detalles según la estructura del objeto */}
            <p>
              Estado: {editable ? (
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{detailData.status}</span>
              )}
            </p>
            <br />
            {editable ? (
              <button className="btn btn-primary" onClick={handleStatusChange}>
                Guardar
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleEditClick}>
                Editar Estado
              </button>
            )}
          </div>
        </div>
      ) : (<SkeletonLineal/>)}
    </div>
  );
}
