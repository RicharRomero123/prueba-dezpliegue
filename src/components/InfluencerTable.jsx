import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SkeletonLineal from './SkeletonLineal';
import { FcSearch } from "react-icons/fc";

export default function InfluencersTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const itemsPerPage = 7;

  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = localStorage.getItem('token');
        let allData = [];

        // Fetch the first page to get pagination info
        const firstPageResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/v1/influencers?page=0&size=10`,
          {
            headers: {
              Authorization: storedToken,
            },
          }
        );

        setTotalPages(firstPageResponse.data.page.totalPages);

        // Fetch each page sequentially with optional country filter
        for (let i = 0; i < firstPageResponse.data.page.totalPages; i++) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/v1/influencers?page=${i}&size=10${countryFilter ? `&country=${countryFilter}` : ''}`;

          const response = await axios.get(url, {
            headers: {
              Authorization: storedToken,
            },
          });

          allData = allData.concat(response.data._embedded.influencerSearchResultResponseList);
        }

        setData(allData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [countryFilter]); // Include countryFilter in the dependency array

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter influencers based on search term and optional country filter
  const filteredData = data.filter((influencer) =>
    influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (countryFilter ? influencer.country === countryFilter : true)
  );

  // Paginate the filtered data
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Search bar */}
      <div className="join">
        <div>
        <div className="relative">
  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2">
    <FcSearch size={24} /> {/* Ajusta el tamaño del ícono según tus preferencias */}
  </div>
  <input
    className="input input-bordered join-item pl-10 pr-4" // Añade padding a la izquierda y derecha
    placeholder="Search by name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

        </div>

        <div className="indicator">
          <button className="btn join-item" onClick={() => setSearchTerm('')}>
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Region</th>
                <th>Exchange</th>
                <th>Reference Price</th>
                <th>Interests</th>
                <th>Social Media</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((influencer) => (
                <tr key={influencer.id}>
                  <td>{influencer.name}</td>
                  <td>{influencer.lastname || 'N/A'}</td>
                  <td>{influencer.country}</td>
                  <td>{influencer.region}</td>
                  <td>{influencer.exchange ? 'Yes' : 'No'}</td>
                  <td>{influencer.referencePrice}</td>
                  <td>{influencer.interests.join(', ')}</td>
                  <td>
                    {influencer.socialMedia.map((socialMedia) => (
                      <div key={socialMedia.id}>
                        {socialMedia.socialMedia}: {socialMedia.followers}
                      </div>
                    ))}
                  </td>
                  <td>
                    <Link to={`/influencers/detalle/${influencer.uuid}`} className="btn btn-outline btn-info">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <SkeletonLineal />
        )}
      </div>

      {/* Paginator */}
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
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
