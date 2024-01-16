import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcPlus } from 'react-icons/fc';

function InfluencerRegistrationForm() {
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [influencerSocialMedia, setInfluencerSocialMedia] = useState([
    {
      username: '',
      followers: '',
      socialMediaId: '',
      posts: ['', '', ''],
      services: [{ price: '', currency: '', exchange: '', serviceTypeId: '' }],
    },
  ]);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const storedToken = localStorage.getItem('token');

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/influencers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: storedToken, // Incluye el token de autorización en el encabezado
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log('Datos enviados exitosamente');
        setAlert({ type: 'success', message: 'Influencer agregado correctamente' });
        // Aquí podrías redirigir a una página de confirmación o realizar otra acción
      } else {
        console.error('Error al enviar los datos');
        setAlert({ type: 'error', message: 'Fallo al agregar influencer' });
      }
    } catch (error) {
      console.error('Error de red:', error);
      setAlert({ type: 'error', message: 'Fallo al agregar influencer' });
    }
  };

  const handleAddService = (index) => {
    const updatedSocialMedia = [...influencerSocialMedia];
    updatedSocialMedia[index].services = [
      ...updatedSocialMedia[index].services,
      { price: '', currency: '', exchange: '', serviceTypeId: '' },
    ];
    setInfluencerSocialMedia(updatedSocialMedia);
  };


  return (
<div>
{alert && (
  <div
    onClick={closeAlert}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-md shadow-md p-6 z-50 cursor-pointer"
  >
    <div className="flex items-center">
      {alert.type === 'success' ? (
        <div className="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ) : (
        <div className="text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
      <span className="flex-grow ml-4">{alert.message}</span>
    </div>
  </div>
)}



<form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold">Name:</label>
        <input
          type="text"
          {...register('name', { required: true })}
          id="name"
          className="border border-gray-300 p-2 w-full rounded"
        />
        {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div>
  <label htmlFor="lastname" className="block font-semibold">Lastname:</label>
  <input
    type="text"
    {...register('lastname', { required: true })}
    id="lastname"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.lastname && <span className="text-red-500">Este campo es obligatorio</span>}
</div>
<div>
  <label htmlFor="email" className="block font-semibold">Email:</label>
  <input
    type="text"
    {...register('email', {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    })}
    id="email"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
</div>
<div>
  <label htmlFor="cellphone" className="block font-semibold">Cellphone:</label>
  <input
    type="text"
    {...register('cellphone', {
      required: true,
      pattern: {
        value: /^\d{9}$/,
        message: 'Invalid phone number'
      }
    })}
    id="cellphone"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.cellphone && <span className="text-red-500">{errors.cellphone.message}</span>}
</div>
<div>
  <label htmlFor="country" className="block font-semibold">Country:</label>
  <input
    type="text"
    {...register('country', { required: true })}
    id="country"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.country && <span className="text-red-500">Este campo es obligatorio</span>}
</div>
<div>
  <label htmlFor="region" className="block font-semibold">Region:</label>
  <input
    type="text"
    {...register('region', { required: true })}
    id="region"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.region && <span className="text-red-500">Este campo es obligatorio</span>}
</div>

  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="1"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Moda
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="2"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Foodie
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="3"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Traveler
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="4"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Tecnología
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="5"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Belleza
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="6"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Lifestyle
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="7"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Blogs
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      value="8"
      {...register('interestsId')}
      className="border border-gray-300 rounded mr-2"
    />
    Recomendaciones
  </label>
  
  <div>
  <label htmlFor="profilePhotoUrl" className="block font-semibold">Profile Photo URL:</label>
  <input
    type="text"
    {...register('profilePhotoUrl', { required: true })}
    id="profilePhotoUrl"
    className="border border-gray-300 p-2 w-full rounded"
  />
  {errors.profilePhotoUrl && <span className="text-red-500">Este campo es obligatorio</span>}
</div>


      {/* Influencer Social Media */}
      {influencerSocialMedia.map((media, index) => (
        <div key={index} className="border p-4 space-y-4">
          <input
            type="text"
            {...register(`influencerSocialMedia[${index}].username`, { required: true })}
            placeholder="Username"
            className="border border-gray-300 p-2 w-full rounded"
          />
           <input
      type="number"
      {...register(`influencerSocialMedia[${index}].followers`, { required: true })}
      placeholder="Followers"
      className="border border-gray-300 p-2 w-full rounded"
    />
   <select
  {...register(`influencerSocialMedia[${index}].socialMediaId`, { required: true })}
  className="border border-gray-300 p-2 w-full rounded"
>
  <option value="" disabled selected>Selecciona Red Social</option>
  <option value="1">Instagram</option>
  <option value="2">TikTok</option>
  <option value="3">YouTube</option>
</select>


    {/* Posts */}
    <div>
      {media.posts.map((post, postIndex) => (
        <input
          key={postIndex}
          type="text"
          {...register(`influencerSocialMedia[${index}].posts[${postIndex}].url`, {
            required: true,
          })}
          placeholder={`Post ${postIndex + 1}`}
          className="border border-gray-300 p-2 w-full rounded"
        />
      ))}
    </div>
          
          {/* Botón para agregar servicios */}
          <div className="flex items-center">
  <button
    type="button"
    onClick={() => handleAddService(index)}
    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    <FcPlus className="mr-2 flex-shrink-0" />
    <span>Add Service</span>
  </button>
</div>

       {/* Visualización de servicios */}
{media.services.map((service, serviceIndex) => (
  <div key={serviceIndex} className="flex flex-col space-y-2">
      <div className="divider divider-success">Servicios</div>
    <input
      type="number"
      {...register(
        `influencerSocialMedia[${index}].services[${serviceIndex}].price`,
        { required: true }
      )}
      placeholder="Price"
      className="border border-gray-300 p-2 rounded"
    />

    <select
  {...register(
    `influencerSocialMedia[${index}].services[${serviceIndex}].currency`,
    { required: true }
  )}
  className="border border-gray-300 p-2 rounded"
>
  <option value="" disabled selected>Select a currency</option>
  <option value="PEN">PEN (Peruvian Nuevo Sol)</option>
  <option value="USD">USD (United States Dollar)</option>
  <option value="EUR">EUR (Euro)</option>
</select>



    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        {...register(
          `influencerSocialMedia[${index}].services[${serviceIndex}].exchange`
        )}
        className="border border-gray-300 p-2 rounded"
      />
      Canje
    </label>
    <select
  {...register(
    `influencerSocialMedia[${index}].services[${serviceIndex}].serviceTypeId`,
    { required: true }
  )}
  className="border border-gray-300 p-2 rounded"
>
<option value="" disabled selected>Select a service</option>
  <option value="1">Story</option>
  <option value="2">Reels</option>
</select>
  </div>
))}


        </div>
      ))}
      {/* Botón para agregar influencers */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() =>
            setInfluencerSocialMedia([
              ...influencerSocialMedia,
              {
                username: '',
                followers: '',
                socialMediaId: '',
                posts: ['', '', ''],
                services: [{ price: '', currency: '', exchange: '', serviceTypeId: '' }],
              },
            ])
          }
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Cuenta
        </button>
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>

     
      <pre style={{ width: '400px' }}>{JSON.stringify(watch(), null, 2)}</pre>


    </form>
</div>
    
  );
}

export default InfluencerRegistrationForm;
