//?-----------Imports-----------
const { getAllWriters, getWriter, createWriter, modifyWriter, deleteWriter } = require("../controllers/writerController");

//*-----------GETALL-----------
const getAllWritersHandler = async (req, res) => {
    try {
        const writers = await getAllWriters();
        res.status(200).json(writers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GET-----------
const getWriterHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const writer = await getWriter({ id });
        res.status(200).json(writer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------CREATE-----------
const createWriterHandler = async (req, res) => {
    const { firstname, lastname, photo, mail } = req.body;
    try {
        const writer = await createWriter({ firstname, lastname, photo, mail });
        res.status(200).json(writer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------PUT-----------
const modifyWriteHandler = async (req, res) => {
    const { firstname, lastname, photo, mail } = req.body;
    const { id } = req.params;
    try {
        const writer = await modifyWriter({ id, firstname, lastname, photo, mail });
        res.status(200).json(writer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------DELETE-----------
const deleteWriterHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteWriter({ id });
        res.status(200).json("Se elimino el escritor");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getAllWritersHandler,
    getWriterHandler,
    createWriterHandler,
    modifyWriteHandler,
    deleteWriterHandler
};