const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const getImage = async (id) => {
    try {
        // Verifica que el id esté presente
        if (!id) {
            throw new Error('No se proporcionó un ID de imagen');
        }

        // Llama a Cloudinary para obtener los detalles de la imagen
        const image = await cloudinary.api.resource(id);

        // Envía la respuesta con los detalles de la imagen
        return image.url
    } catch (error) {
        throw new Error(error.message);
    }
}

const postImage = async (img) => {
    try {
        if (!img) {
            throw new Error('No se ha subido ninguna imagen');
        }

        // Importación dinámica de 'node-fetch'
        const fetch = (await import('node-fetch')).default;

        const data = new FormData();
        data.append("file", fs.createReadStream(img.path));
        data.append("upload_preset", "docentes");

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
        return file.public_id;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteImage = async (id) => {
    try {
        await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy/${id}`,
            {
                method: "DELETE",
            }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    cloudinary,
    getImage,
    postImage,
    deleteImage
};
