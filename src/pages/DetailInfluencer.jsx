import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkeletonLineal from '../components/SkeletonLineal';

export default function DetailInfluencer({ match }) {
    const [influencer, setInfluencer] = useState(null);
  
    useEffect(() => {
        const influencerId = match?.params?.id;
    console.debug('Influencer ID:', influencerId);
      const fetchInfluencer = async () => {
        try {
          const storedToken = localStorage.getItem('token');
          const influencerId = match?.params?.id;
  
          if (influencerId) {
            const response = await axios.get(
              `https://flupic-backend-mvp-dev.up.railway.app/v1/influencers/${influencerId}`,
              {
                headers: {
                  Authorization: storedToken,
                },
              }
            );
  
            setInfluencer(response.data);
          } else {
            console.error('Influencer ID not found in route parameters.');
          }
        } catch (error) {
          console.error('Error fetching influencer data:', error);
        }
      };
  
      fetchInfluencer();
    }, [match?.params?.id]);
  

  return (
    <div>
      {influencer ? (
        <>
          <div>
            <h1>{influencer.name} {influencer.lastname}</h1>
            <p>Email: {influencer.email || 'N/A'}</p>
            <p>Cellphone: {influencer.cellphone || 'N/A'}</p>
            <p>Country: {influencer.country}</p>
            <p>Region: {influencer.region || 'N/A'}</p>
            <p>Description: {influencer.description || 'N/A'}</p>
            <img src={influencer.profilePhotoUrl} alt={`${influencer.name} ${influencer.lastname}`} />
          </div>

          <div>
            <h2>Interests</h2>
            <ul>
              {influencer.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Social Media</h2>
            {influencer.socialMediaList && influencer.socialMediaList.length > 0 ? (
              influencer.socialMediaList.map((socialMedia) => (
                <div key={socialMedia.id}>
                  <h3>{socialMedia.socialMedia}</h3>
                  <p>Username: {socialMedia.username}</p>
                  <p>Followers: {socialMedia.followers}</p>
                  <h4>Services</h4>
                  {socialMedia.services && socialMedia.services.length > 0 ? (
                    <ul>
                      {socialMedia.services.map((service) => (
                        <li key={service.id}>
                          <p>Service Type: {service.serviceType}</p>
                          <p>Price: {service.price}</p>
                          <p>Total Price: {service.totalPrice}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No services available</p>
                  )}
                  <h4>Posts</h4>
                  {socialMedia.posts && socialMedia.posts.length > 0 ? (
                    <ul>
                      {socialMedia.posts.map((post) => (
                        <li key={post.id}>
                          <a href={post.url} target="_blank" rel="noopener noreferrer">
                            Post Link
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No posts available</p>
                  )}
                </div>
              ))
            ) : (
              <p>No social media data available</p>
            )}
          </div>
        </>
      ) : (
        <SkeletonLineal />
      )}
    </div>
  );
}
