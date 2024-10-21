//?-----------Imports-----------
const { DepartmentEducation, Province } = require("../db");
const { postImage, deleteImage, getImage } = require("../helpers/cloudinary");

//*-----------ALLGET-----------
const getAllDepartment = async () => {
    const provinces = await Province.findAll({
        include: {
            model: DepartmentEducation
        },
        order: [['name', 'ASC']]
    });

    for (const prov of provinces) {
        if (prov.DepartmentEducation.photo) prov.DepartmentEducation.photo = await getImage(prov.DepartmentEducation.photo);
        if (prov.flag) prov.flag = await getImage(prov.flag);
        if (prov.shield) prov.shield = await getImage(prov.shield);
    }
    
    return provinces;
};

//*-----------GET-----------
const getDepartment = async ({ province }) => {
    const department = await DepartmentEducation.findOne({
        include: {
            model: Province,
            where: { name: province }
        }
    });

    if (!department) throw new Error("No se encontro el ministerio de educacion");

    department.photo = await getImage(department.photo);

    return department;
};

//*-----------CREATE-----------
const createDepartment = async ({ province, pho, url, commission, contact }) => {
    const dep = await DepartmentEducation.findOne({
        include: {
            model: Province,
            where: { name: province }
        }
    })
    if (dep) throw new Error("ya existe departamento de educacion para la provincia: " + province);

    const prov = await Province.findOne({ where: { name: province } });
    if (!prov) throw new Error("No existe la provincia, provincia: " + province);

    const photo = await postImage(pho);

    const newDepartment = await DepartmentEducation.create({ photo, url, commission, contact });
    await prov.setDepartmentEducation(newDepartment);
    // await prov.addActivity(activityCreated);
    return newDepartment;
};

//*-----------PUT-----------
const modifyDepartment = async ({ id, pho, url, commission, contact }) => {
    const department = await DepartmentEducation.findOne({ where: { id } });

    if (!department) throw new Error("No se encontro el ministerio de educacion");

    if (url) department.url = url;
    if (commission) department.commission = commission;
    if (contact) department.contact = contact;
    if (pho) {
        const photo = await postImage(pho);
        await deleteImage(department.photo);
        department.photo = photo;
    }

    await department.save();
    return department;
};

//*-----------DELETE-----------
const deleteDepartment = async ({ province }) => {
    const department = await DepartmentEducation.findOne({ where: { province } });
    if (!department || !department.status) throw new Error("No se encontro el ministerio de educacion");
    department.status = false;
    await department.save();
};

module.exports = {
    getDepartment,
    getAllDepartment,
    modifyDepartment,
    createDepartment,
    deleteDepartment
};