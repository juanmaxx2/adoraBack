//?-----------Imports-----------
const { Province, Activity, DepartmentEducation } = require("../db");
const { getImage, postImage, deleteImage } = require("../helpers/cloudinary");

//*-----------GETALL-----------
const getAllProvince = async () => {
    //Get all provinces from the database
    const listProvinces = await Province.findAll({
        where: { status: true },
        include: {
            model: Activity,
            where: { status: true },
            required: false,
        }
    });

    //Check if listProvince exist
    if (!listProvinces || listProvinces.length === 0) throw new Error("No se encontraron las provincias");

    listProvinces.map(prov => {
        if (prov.flag) prov.flag = getImage(prov.flag);
        if (prov.shield) prov.shield = getImage(prov.shield);
    });

    return listProvinces;
};

//*-----------GET-----------
const getProvince = async ({ name }) => {
    //Finde a province for his name
    const province = await Province.findOne({
        where: { name, status: true },
        include: {
            model: DepartmentEducation
        },
    });

    //Check if the province was found
    if (!province) throw new Error("No se encontro la provincia");
    if (province.flag) province.flag = await getImage(province.flag);
    if (province.shield) province.shield = await getImage(province.shield);

    return province;
};

//*-----------CREATE-----------
const createProvince = async ({ name, whatsapp, fileFlag, fileShield }) => {
    //Create a new Province
    const flag = await postImage(fileFlag);
    const shield = await postImage(fileShield);
    const newProvince = await Province.create({ name, whatsapp, flag, shield });
    return newProvince;
};

//*-----------PUT-----------
const modifyProvince = async ({ name, whatsapp, fileFlag, fileShield }) => {
    //Create a new Province
    const prov = await Province.findOne({ where: { name } });

    if (!prov) throw new Error("No se encontro la provincia");

    if (whatsapp) prov.whatsapp = whatsapp;
    if (fileFlag) {
        const flag = await postImage(fileFlag);
        await deleteImage(prov.flag);
        prov.flag = flag;
    }
    if (fileShield) {
        const shield = await postImage(fileShield);
        await deleteImage(prov.shield);
        prov.shield = shield;
    }

    await prov.save();
    return prov;
};

//*-----------DELETE-----------
const deleteProvince = async ({ name }) => {
    //Delete a province for by name
    const prov = await Province.findOne({ where: { name } });

    if (!prov || !prov.status) throw new Error("No se existe la provincia");

    await prov.update({ status: false }, { where: { name } });
};

module.exports = {
    getAllProvince,
    getProvince,
    createProvince,
    modifyProvince,
    deleteProvince
};