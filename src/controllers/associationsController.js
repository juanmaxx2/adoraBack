//?-----------Imports-----------
const { Association } = require("../db");
const { postImage, deleteImage, getImage } = require("../helpers/cloudinary");

//*-----------GETASSOCIATIONS-----------
const getAssociations = async (name) => {
    const associations = await Association.findAll({
        where: {
            name
        }
    });

    if (!associations || associations.length === 0) {
        throw new Error("No se encontraron las asociaciones especificadas");
    }

    for (const association of associations) {
        if (association.logo) {
            association.logo = await getImage(association.logo);
        }
        if (association.picture) {
            association.picture = await getImage(association.picture);
        }
    }

    return associations;
};

//*-----------GET-----------
const getAssociation = async ({ name }) => {
    if (name == 'docentesdelreino') name = 'Docentes del Reino'
    if (name == 'adora') name = 'Adora'

    const association = await Association.findOne({ where: { name } });

    if (!association) throw new Error("No se encontro la institucion");

    if (association.logo) association.logo = await getImage(association.logo);
    if (association.picture) association.picture = await getImage(association.picture);

    return association;
};

//*-----------PUT-----------
const modifyAssociation = async ({ name, direction, history, introduction, mail, phone, fileLogo, filePicture }) => {
    const association = await Association.findByPk(name);
    if (history) association.history = history;
    if (introduction) association.introduction = introduction;
    if (mail) association.mail = mail;
    if (direction) association.direction = direction;
    if (phone) association.phone = phone;
    if (fileLogo) {
        const logo = await postImage(fileLogo);
        await deleteImage(association.logo);
        association.logo = logo;
    }
    if (filePicture) {
        const picture = await postImage(filePicture);
        await deleteImage(association.picture);
        association.picture = picture;
    }

    await association.save();
    association.dataValues.name = association.name.split('_').join(' ');
    return association;
};

//*-----------CREATE-----------
const createAssociation = async () => { };

module.exports = {
    getAssociations,
    getAssociation,
    modifyAssociation,
    createAssociation
}