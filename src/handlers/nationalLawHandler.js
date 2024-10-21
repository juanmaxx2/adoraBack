//?-----------Imports-----------
const { getNationalLaw, createNationalLaw, modifyNationalLaw, deleteNationalLaw, getOneNationalLaw, unDeleteNationalLaw, getDeletedNationalLaw } = require("../controllers/nationalLawController")

//*-----------GET-----------
const getNationalLawHandler = async (req, res) => {
    try {
        const nationalLaws = await getNationalLaw();
        res.status(200).json(nationalLaws);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------GET-----------
const getDeletedNationalLawHandler = async (req, res) => {
    try {
        const nationalLaws = await getDeletedNationalLaw();
        res.status(200).json(nationalLaws);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------GETONE-----------
const getOneNationalLawHandler = async (req, res) => {
    const { number } = req.params;
    try {
        const nationalLaws = await getOneNationalLaw({number});
        res.status(200).json(nationalLaws);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------CREATE-----------
const createNationalLawHandler = async (req, res) => {
    const { number, title, url } = req.body;
    try {
        const nationalLaw = await createNationalLaw({ number, title, url });
        res.status(200).json(nationalLaw);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------PUT-----------
const modifyNationalLawHandler = async (req, res) => {
    const { number } = req.params;
    const { title, url, newNumber } = req.body
    try {
        const nationalLaw = await modifyNationalLaw({ number, title, url, newNumber });
        res.status(200).json(nationalLaw);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------DELETE-----------
const deleteNationalLawHandler = async (req,res)=>{
    const { number } = req.params;
    try{
        await deleteNationalLaw({number});
        res.status(200).json("Ley eliminada exitosamente");
    }catch(error){
        res.status(400).json({ error:error.message});
    }
}

//*-----------UNDELETE-----------
const unDeleteNationalLawHandler = async (req,res)=>{
    const { number } = req.params;
    try{
        console.log(number)
        await unDeleteNationalLaw({number});
        res.status(200).json("Ley eliminada exitosamente");
    }catch(error){
        res.status(400).json({ error:error.message});
    }
}


module.exports = {
    getNationalLawHandler,
    getDeletedNationalLawHandler,
    getOneNationalLawHandler,
    createNationalLawHandler,
    modifyNationalLawHandler,
    deleteNationalLawHandler,
    unDeleteNationalLawHandler
}