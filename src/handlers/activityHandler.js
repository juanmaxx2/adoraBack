//?-----------Imports-----------
const { getActivity, createActivity, deleteActivity, getAllActivity, getOneActivity, modifyActivity } = require("../controllers/activityController")

//*-----------GETALL-----------
const getAllActivityHandler = async (req, res) => {
    try {
        const listActivity = await getAllActivity();
        res.status(200).json(listActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GETONE-----------
const getOneActivityHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await getOneActivity({ id });
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GET-----------
const getActivityHandler = async (req, res) => {
    const { province, tipo, date } = req.query;
    try {
        const listActivity = await getActivity({ province, tipo, date });
        res.status(200).json(listActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------CREATE-----------
const createActivityHandler = async (req, res) => {
    const { title, time, city, province, date, value_Inscription, tipo, description } = req.body;
    const image = req.file;
    try {
        if (!title || !time || !city || !province || !date || !value_Inscription || !tipo || !description || !image) {
            throw new Error("Faltan Datos");
        }
        const activity = await createActivity({ title, time, city, province, date, value_Inscription, tipo, description, img: image });
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------PUT-----------
const modifyActivityHandler = async (req, res) => {
    const { title, time, city, province, date, value_Inscription, tipo, description } = req.body;
    const image = req.file;
    const { idActivity } = req.params;
    try {
        if (!idActivity) throw new Error("falta el id de la actividad");
        const activity = await modifyActivity({ idActivity, title, time, city, province, date, value_Inscription, tipo, description, img: image });
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//*-----------DELETE-----------
const deleteActivityHandler = async (req, res) => {
    const { idActivity } = req.params;
    try {
        await deleteActivity({ idActivity });
        res.status(200).json('actividad eliminada existosamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getAllActivityHandler,
    getOneActivityHandler,
    getActivityHandler,
    createActivityHandler,
    modifyActivityHandler,
    deleteActivityHandler
}