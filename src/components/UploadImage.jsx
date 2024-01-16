import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcSurvey, FcOk } from 'react-icons/fc';

const presetName = 'Presenten_react'; // Nombre de tu preset en Cloudinary
const cloudName = 'daassyisd'; // Tu nombre de Cloudinary

const initialState = {
    profilePhotoUrl: '',
};

export default function UploadImage() {
    const [image, setImage] = useState(localStorage.getItem('profilePhotoUrl') || initialState.profilePhotoUrl);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        localStorage.setItem('profilePhotoUrl', image);
    }, [image]);

    function handleFile(event) {
        setLoading(true);
        setCopied(false);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', presetName);
        
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
            .then(res => {
                setImage(res.data.secure_url);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(image);
        setCopied(true);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold mb-6">Seleccionar Imagen</h1>
            <div className="bg-gray-800 p-8 shadow-md rounded-lg flex flex-col items-center">
                <input type="file" className="mb-4 hidden" accept="image" onChange={handleFile} id="fileInput" />
                <label htmlFor="fileInput" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md">
                    Seleccionar archivo
                </label>
                {loading ? (
                    <div className="skeleton w-48 h-48 mt-4"></div>
                ) : (
                    <img
                        src={image}
                        className="w-64 h-auto rounded-lg mt-4"
                        alt="Imagen cargada"
                    />
                )}
                <div className="flex items-center mt-4 w-full">
                    <input
                        type="text"
                        className="border rounded-md p-2 w-full mr-2 bg-gray-700 text-white"
                        value={image}
                        readOnly
                    />
                    <button className="p-2 bg-blue-600 text-white rounded-md" onClick={copyToClipboard}>
                        {copied ? <FcOk size={24} /> : <FcSurvey size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
