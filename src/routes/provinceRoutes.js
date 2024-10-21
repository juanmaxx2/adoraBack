// provinceRouter.js
const { Router } = require("express");
const { getAllProvinceHandler, getProvinceHandler, createProvinceHandler, deleteProvinceHandler, modifyProvinceHandler } = require("../handlers/provinceHandler");
const upload = require("../middleware/upload");
const provinceRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
provinceRouter.get('/', getAllProvinceHandler);
provinceRouter.get('/:name', getProvinceHandler);
provinceRouter.post('/', authenticateJWT, isAdmin, upload.fields([{ name: 'flag' }, { name: 'shield' }]), createProvinceHandler);
provinceRouter.put('/:name', authenticateJWT, isAdmin, upload.fields([{ name: 'flag' }, { name: 'shield' }]), modifyProvinceHandler);
provinceRouter.delete('/:name', authenticateJWT, isAdmin, deleteProvinceHandler);

module.exports = provinceRouter;
