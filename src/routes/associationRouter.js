//?-----------Imports-----------
const { Router } = require("express");
const { modifyAssociationHandler, getAssociationHandler, getAllAssociationHandler } = require("../handlers/associationshandler");
const upload = require("../middleware/upload");
const associationRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
associationRouter.get('/', getAllAssociationHandler);
associationRouter.get('/:name', getAssociationHandler);
associationRouter.put('/:name', authenticateJWT, isAdmin, upload.fields([{ name: 'logo' }, { name: 'picture' }]), modifyAssociationHandler);

module.exports = associationRouter;