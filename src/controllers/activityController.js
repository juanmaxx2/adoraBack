//?-----------Imports-----------
const { Activity, Province, PrayerDay } = require("../db");
const { postImage, deleteImage, getImage } = require("../helpers/cloudinary");

//*-----------GETALL-----------
const getAllActivity = async () => {
    //All activities from the database are loaded
    const listActivity = await Activity.findAll();

    //All prayer day from the database are loaded
    const listPrayerDay = await PrayerDay.findAll();

    //Join the lists
    const activities = [...listActivity, ...listPrayerDay]

    //Check that the activities were found
    if (!activities || !activities.length) {
        throw new Error('No se encontraron actividades');
    };

    activities.map(act => {
        act.image = getImage(act.image);
    });

    //Return the activities
    return activities;
};

//*-----------GET-----------
const getActivity = async ({ province, tipo, date }) => {
    const whereClause = {};
    whereClause.status = true;
    if (date != 'all' && !date) {
        whereClause.date = date
    };
    
    let listPrayerDay = [];
    if (tipo == "all" || tipo == '5') {
        listPrayerDay = await PrayerDay.findAll({
            where: whereClause
        });
    }

    if (tipo && tipo != "all") whereClause.tipo = tipo;

    let listActivity;

    if (province && province !== "all") {
        listActivity = await Activity.findAll({
            where: whereClause,
            include: {
                model: Province,
                where: { name: province }
            }
        });
    } else {
        listActivity = await Activity.findAll({
            where: whereClause,
        });
    };

    //Join the lists
    const activities = [...listActivity, ...listPrayerDay]

    //Check that the activities were found
    if (!activities || !activities.length) {
        throw new Error('No se encontraron actividades');
    };

    for (const act of activities) {
        if (act.image) {
            act.image = await getImage(act.image);
        }

        if (act.date) {
            const date = new Date(act.dataValues.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate() + 1;
            act.dataValues.date = { year, month, day };
        }
    }

    //Return the activities
    return activities;
};

//*-----------GETONE-----------
const getOneActivity = async ({ id }) => {
    try{

        //Get the activity from the database are loaded
        const activity = await Activity.findByPk(id);
    
        //Check that the activity was found
        if (!activity) throw new Error('No se encontraron actividades');
    
        if (activity.image) {
            activity.image = await getImage(activity.image);
        }
    
        if (activity.date) {
            const date = new Date(activity.dataValues.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate() + 1;
            activity.dataValues.date = { year, month, day };
        }

        //Return the activity
        return activity;
    } catch (error) {
        console.log(error)
    }
};


//*-----------CREATE-----------
const createActivity = async ({ title, time, city, province, date, value_Inscription, tipo, description, img }) => {
    const prov = await Province.findOne({ where: { name: province } });

    //If the province does not exist, the activity is not created
    if (!prov) throw new Error("No existe la provincia, provincia: " + province);

    const image = await postImage(img);
    date = new Date (date);
    //Create a activity in the database
    const activityCreated = await Activity.create({ title, time, city, date, value_Inscription, tipo, description, image });
    await prov.addActivity(activityCreated);

    return activityCreated;
};

//*-----------PUT-----------
const modifyActivity = async ({ idActivity, title, time, city, province, date, value_Inscription, tipo, description, img }) => {
    //Get the activitie
    const act = await Activity.findByPk(idActivity);
    if (!act) throw new Error('No se encontraron actividades');

    date = new Date (date);

    //Set the antributes to change
    if (title) act.title = title;
    if (time) act.time = time;
    if (date) act.date = date;
    if (city) act.city = city;
    if (value_Inscription) act.value_Inscription = value_Inscription;
    if (tipo) act.tipo = tipo;
    if (description) act.description = description;
    if (province) {
        const newProv = await Province.findOne({ where: { name: province } });
        if (!newProv) throw new Error("No existe la provincia: " + province);
        await act.setProvince(newProv);
    };
    if (img) {
        const image = await postImage(img);
        await deleteImage(act.image);
        act.image = image;
    }

    //Save the activity
    await act.save();
    return act;
};

//*-----------DELETE-----------
const deleteActivity = async ({ idActivity }) => {
    //Search for the activity you want to delete
    const activity = await Activity.findByPk(idActivity);

    if (!activity || !activity.status) throw new Error("No se existe la actividad");

    await Activity.update({ status: false }, { where: { id: idActivity } });
};

module.exports = {
    getAllActivity,
    getOneActivity,
    getActivity,
    createActivity,
    modifyActivity,
    deleteActivity
};