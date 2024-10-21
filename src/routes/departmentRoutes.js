//?-----------Imports-----------
const { Router } = require("express");
const { getDepartmentHandler, createDepartmentHandler, modifyDepartmentHandler, deleteDepartmentHandler, getAllDepartmentHandler } = require("../handlers/departmentHandler");
const upload = require("../middleware/upload");
const departmentRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
departmentRouter.get('/:province', getDepartmentHandler);
departmentRouter.get('/', getAllDepartmentHandler);
departmentRouter.post('/', authenticateJWT, isAdmin, upload.single('photo'), createDepartmentHandler);
departmentRouter.put('/:id', authenticateJWT, isAdmin, upload.single('photo'), modifyDepartmentHandler);
departmentRouter.delete('/:province', authenticateJWT, isAdmin, deleteDepartmentHandler);

module.exports = departmentRouter;