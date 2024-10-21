//?-----------Imports-----------
const { Router } = require("express");
const { getNationalLawHandler, modifyNationalLawHandler, createNationalLawHandler, deleteNationalLawHandler, getOneNationalLawHandler, unDeleteNationalLawHandler, getDeletedNationalLawHandler } = require("../handlers/nationalLawHandler");
const nationalLawRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
nationalLawRouter.get('/', getNationalLawHandler);
nationalLawRouter.get('/deleted', getDeletedNationalLawHandler);
nationalLawRouter.get('/:number', getOneNationalLawHandler);
nationalLawRouter.put('/:number', authenticateJWT, isAdmin, modifyNationalLawHandler);
nationalLawRouter.post('/', authenticateJWT, isAdmin, createNationalLawHandler);
nationalLawRouter.delete('/:number', authenticateJWT, isAdmin, deleteNationalLawHandler);
nationalLawRouter.delete('/undeleted/:number', authenticateJWT, isAdmin, unDeleteNationalLawHandler);

module.exports = nationalLawRouter;