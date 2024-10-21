//?-----------Imports-----------
const { Router } = require("express");
const { getImage, postImage, deleteImage } = require("../controllers/imageController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configuración básica de Multer para almacenar archivos temporalmente

const imageRouter = Router();

//*-----------Routes-----------
imageRouter.get('/', getImage);
imageRouter.post('/', upload.single('image'), postImage);
imageRouter.delete('/', deleteImage);

module.exports = imageRouter;