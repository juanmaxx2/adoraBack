//?-----------Imports-----------
const { Router } = require("express");
const { getProvincialLawHandler, modifyProvincialLawHandler, createProvincialLawHandler, deleteProvincialLawHandler, getDeletedProvincialLawHandler } = require("../handlers/provincialLawHandler");
const provincialLawRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
provincialLawRouter.get('/:province', getProvincialLawHandler);
provincialLawRouter.get('/deleted/:province', getDeletedProvincialLawHandler);
provincialLawRouter.put('/:province/:number', authenticateJWT, isAdmin, modifyProvincialLawHandler);
provincialLawRouter.post('/', authenticateJWT, isAdmin, createProvincialLawHandler);
provincialLawRouter.delete('/', authenticateJWT, isAdmin, deleteProvincialLawHandler);

module.exports = provincialLawRouter;