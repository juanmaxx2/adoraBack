//?-----------Imports-----------

const { getPrayerDay, createPrayerDay, deletePrayerDay, getOnePrayerDay, getAllPrayerDay, modifyPrayerDay } = require("../controllers/prayerDayController");

//*-----------GETALL-----------
const getAllPrayerDayHandler = async (req, res) => {
    try {
        const listPrayerDay = await getAllPrayerDay();
        res.status(200).json(listPrayerDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GET-----------
const getPrayerDayHandler = async (req, res) => {
    try {
        const listPrayerDay = await getPrayerDay();
        res.status(200).json(listPrayerDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GETONE-----------
const getOnePrayerDayHandler = async (req, res) => {
    const { idActivity } = req.params
    try {
        const listPrayerDay = await getOnePrayerDay({ idActivity });
        res.status(200).json(listPrayerDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------CREATE-----------
const createPrayerDayHandler = async (req, res) => {
    const { title, time, date, url, description } = req.body;
    const image = req.file;
    try {
        //It is checked that there is no missing data
        if (!title || !time || !date || !url || !description || !image) {
            throw new Error("Faltan Datos");
        };
        const prayerDay = await createPrayerDay({ title, time, date, url, description, img: image });
        res.status(200).json(prayerDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------PUT-----------
const modifyPrayerDayHandler = async (req, res) => {
    const { title, time, date, url, description } = req.body;
    const { idActivity } = req.params;
    const image = req.file;
    try {
        if (!idActivity) throw new Error("falta el id de la actividad");
        const prayerDay = await modifyPrayerDay({ idActivity, title, time, date, url, description, img:image });
        res.status(200).json(prayerDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------DELETE-----------
const deletePrayerDayHandler = async (req, res) => {
    const { idActivity } = req.params;
    try {
        await deletePrayerDay({ idActivity });
        res.status(200).json('actividad eliminada existosamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getAllPrayerDayHandler,
    getPrayerDayHandler,
    getOnePrayerDayHandler,
    createPrayerDayHandler,
    modifyPrayerDayHandler,
    deletePrayerDayHandler
}