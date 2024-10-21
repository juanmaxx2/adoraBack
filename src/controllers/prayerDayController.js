//?-----------Imports-----------
const { PrayerDay } = require("../db");
const { postImage, getImage, deleteImage } = require("../helpers/cloudinary");

//*-----------GETALL-----------
const getAllPrayerDay = async () => {
    //All activities from the database are loaded
    const listPrayerDay = await PrayerDay.findAll();
    //Check that the activities were found
    if (!listPrayerDay || !listPrayerDay.length) {
        throw new Error('No se encontraron actividades');
    };
    listPrayerDay.map(pd => {
        pd.image = getImage(pd.image);
    });
    //Return the activities
    return listPrayerDay;
};

//*-----------GET-----------
const getPrayerDay = async () => {
    //All activities from the database are loaded
    const listPrayerDay = await PrayerDay.findAll({
        where: {
            status: true
        }
    });
    //Check that the activities were found
    if (!listPrayerDay || !listPrayerDay.length) {
        throw new Error('No se encontraron actividades');
    };
    listPrayerDay.map(pd => {
        pd.image = getImage(pd.image);
    });
    //Return the activities
    return listPrayerDay;
};

//*-----------GETONE-----------
const getOnePrayerDay = async ({ idActivity }) => {
    //All activities from the database are loaded
    const prayerDay = await PrayerDay.findByPk(idActivity);
    //Check that the activities were found
    if (!prayerDay) {
        throw new Error('No se encontraron actividades');
    };
    
    if (prayerDay.image) {
        prayerDay.image = await getImage(prayerDay.image);
    }

    if (prayerDay.date) {
        const date = new Date(prayerDay.dataValues.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() + 1;
        prayerDay.dataValues.date = { year, month, day };
    }
    
    //Return the activities
    return prayerDay;
};

//*-----------CREATE-----------
const createPrayerDay = async ({ title, time, date, url, description, img }) => {
    //create a activity in the database
    const image = await postImage(img);
    const prayerDayCreated = await PrayerDay.create({ title, time, date, url, description, image });
    return prayerDayCreated;
};

//*-----------PUT-----------
const modifyPrayerDay = async ({ idActivity, title, time, date, url, description, img }) => {
    const pd = await PrayerDay.findByPk(idActivity);
    console.log(time);
    console.log(img)
    if (title) pd.title = title;
    if (time) pd.time = time;
    if (date) pd.date = date;
    if (url) pd.url = url;
    if (description) pd.description = description;
    if (img) {
        const image = await postImage(img);
        await deleteImage(pd.image);
        pd.image = image;
    }
    console.log(pd)
    await pd.save();
    return pd;
};

//*-----------DELETE-----------
const deletePrayerDay = async ({ idActivity }) => {
    //Search for the activity you want to delete
    const prayerDay = await PrayerDay.findByPk(idActivity);
    if (!prayerDay || !prayerDay.status) {
        throw new Error("No se existe la actividad");
    }
    await prayerDay.update({ status: false }, { where: { id: idActivity } });
};

module.exports = {
    getAllPrayerDay,
    getPrayerDay,
    getOnePrayerDay,
    createPrayerDay,
    modifyPrayerDay,
    deletePrayerDay
};