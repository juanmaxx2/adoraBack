const { getAssociation, modifyAssociation, getAssociations } = require("../controllers/associationsController");

//*-----------GETALL-----------
const getAllAssociationHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const association = await getAssociations(name)
        res.status(200).json(association);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------GET-----------
const getAssociationHandler = async (req, res) => {
    const { name } = req.params;
    try {
        const association = await getAssociation({name})
        res.status(200).json(association);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------PUT-----------
const modifyAssociationHandler = async (req, res) => {
    const { name } = req.params;
    const { direction, history, introduction, mail, objetive, phone, presentation } = req.body;
    const files = req.files;
    try {
        const fileLogo = files.logo ? files.logo[0] : null;
        const filePicture = files.picture ? files.picture[0] : null;
        const association = await modifyAssociation({ name, direction, history, introduction, fileLogo, mail, objetive, phone, filePicture, presentation });
        res.status(200).json(association);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAssociationHandler,
    modifyAssociationHandler,
    getAllAssociationHandler
}