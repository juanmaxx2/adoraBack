//?-----------Imports-----------
const { Router } = require("express");
const { getAllWritersHandler, getWriterHandler, createWriterHandler, modifyWriteHandler, deleteWriterHandler } = require("../handlers/writerHandler");
const writerRouter = Router();

//*-----------Routes-----------
writerRouter.get('/', getAllWritersHandler);
writerRouter.get('/:id', getWriterHandler);
writerRouter.post('/', createWriterHandler);
writerRouter.put('/:id', modifyWriteHandler);
writerRouter.delete('/:id', deleteWriterHandler);

module.exports = writerRouter;