//?-----------Imports-----------
const { Router } = require("express");
const { loginUserHandler, getAllUsersHandler, modifyUserHandler, createUserHandler, deleteUserHandler, getAllDeletedUsersHandler, unDeleteUserHandler } = require("../handlers/adminHandler");
const adminRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
adminRouter.get('/alldeleted', authenticateJWT, isAdmin, getAllDeletedUsersHandler);  
adminRouter.get('/all', authenticateJWT, isAdmin, getAllUsersHandler);  
adminRouter.post('/login', loginUserHandler);     
adminRouter.post('/create', createUserHandler);     
adminRouter.put('/', authenticateJWT, isAdmin, modifyUserHandler);
adminRouter.delete('/', authenticateJWT, isAdmin, deleteUserHandler);
adminRouter.put('/undelete', authenticateJWT, isAdmin, unDeleteUserHandler);


module.exports = adminRouter;