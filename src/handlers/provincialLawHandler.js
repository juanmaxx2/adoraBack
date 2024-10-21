//?-----------Imports-----------
const { getProvincialLaw, modifyProvincialLaw, createProvincialLaw, deleteProvincialLaw, getDeletedProvincialLaw } = require("../controllers/provincialLawController");

//*-----------GET-----------
const getProvincialLawHandler = async (req, res) => {
    const { province } = req.params;
    try {
        const provincialLaws = await getProvincialLaw({ province });
        res.status(200).json(provincialLaws);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------GETDELETED-----------
const getDeletedProvincialLawHandler = async (req, res) => {
    const { province } = req.params;
    try {
        const provincialLaws = await getDeletedProvincialLaw({ province });
        res.status(200).json(provincialLaws);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------PUT-----------
const modifyProvincialLawHandler = async (req, res) => {
    const { number, province } = req.params;
    const { title, url, newNumber, newProvince } = req.body;
    try {
        const provincialLaw = await modifyProvincialLaw({ number, province, title, url, newNumber, newProvince });
        res.status(200).json(provincialLaw);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------CREATE-----------
const createProvincialLawHandler = async (req, res) => {
    const { number, title, url, province } = req.body;
    try {
        const provincialLaw = await createProvincialLaw({ number, title, url, province });
        res.status(200).json(provincialLaw);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------DELETE-----------
const deleteProvincialLawHandler = async (req, res) => {
    const { number, province } = req.query;
    try {
        await deleteProvincialLaw({ number, province });
        res.status(200).json("Se elimino la provincia correctamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getProvincialLawHandler,
    getDeletedProvincialLawHandler,
    modifyProvincialLawHandler,
    createProvincialLawHandler,
    deleteProvincialLawHandler
}