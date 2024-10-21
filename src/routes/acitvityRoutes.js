//?-----------Imports-----------
const { Router } = require("express");
const { getAllActivityHandler, getActivityHandler, getOneActivityHandler, createActivityHandler, deleteActivityHandler, modifyActivityHandler } = require("../handlers/activityHandler");
const upload = require("../middleware/upload");
const activityRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
activityRouter.get('/all', getAllActivityHandler);
activityRouter.get('/', getActivityHandler);
activityRouter.get('/:id', getOneActivityHandler);
activityRouter.post('/', authenticateJWT, isAdmin, upload.single('image'), createActivityHandler);
activityRouter.put('/:idActivity', authenticateJWT, isAdmin, upload.single('image'), modifyActivityHandler);
activityRouter.delete('/:idActivity', authenticateJWT, isAdmin, deleteActivityHandler);

module.exports = activityRouter;