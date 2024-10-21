require('dotenv').config();
const { CLOUDINARY_CLOUD_NAME } = process.env;
const FormData = require('form-data');
const fs = require('fs');


const getImage = async (req, res) => {
    try {
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

const postImage = async (req, res) => {
    try {
        const img = req.file;
        if (!img) {
            return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
        }

        // Importación dinámica de 'node-fetch'
        const fetch = (await import('node-fetch')).default;

        const data = new FormData();
        data.append("file", fs.createReadStream(img.path));
        data.append("upload_preset", "docentesWriters");

        // Enviar solicitud a Cloudinary
        const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        // Convertir la respuesta a JSON
        const file = await cloudinaryResponse.json();

        // Enviar respuesta al cliente
        res.status(200).json({
            message: 'Imagen cargada exitosamente',
            url: file.secure_url,
            public_id: file.public_id,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteImage = async (req, res) => {
    
    try {
        
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getImage,
    postImage,
    deleteImage
};