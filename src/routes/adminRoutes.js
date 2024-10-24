//?-----------Imports-----------
const { Router } = require("express");
const { loginUserHandler, getAllUsersHandler, modifyUserHandler, createUserHandler, deleteUserHandler, getAllDeletedUsersHandler, unDeleteUserHandler } = require("../handlers/adminHandler");
const adminRouter = Router();
const { authenticateJWT, isAdmin, isSuperAdmin } = require("../middleware/auth");

//*-----------Routes-----------
adminRouter.get('/alldeleted', authenticateJWT, isSuperAdmin, getAllDeletedUsersHandler);  
adminRouter.get('/all', authenticateJWT, isSuperAdmin, getAllUsersHandler);  
adminRouter.post('/login', loginUserHandler);     
adminRouter.post('/create', createUserHandler);     
adminRouter.put('/', authenticateJWT, isSuperAdmin, modifyUserHandler);
adminRouter.put('/delete', authenticateJWT, isSuperAdmin, deleteUserHandler);
adminRouter.put('/undelete', authenticateJWT, isSuperAdmin, unDeleteUserHandler);


module.exports = adminRouter;