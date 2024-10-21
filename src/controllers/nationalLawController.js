//?-----------Imports-----------
const { NationalLaw } = require("../db");

//*-----------GET-----------
const getNationalLaw = async () => {
    const nationalLaw = await NationalLaw.findAll({ where: { status: true } });
    if (!nationalLaw) throw new Error("No se encontro ninguna ley nacional");
    return nationalLaw;
};

//*-----------GETDELETED-----------
const getDeletedNationalLaw = async () => {
    const nationalLaw = await NationalLaw.findAll({ where: { status: false } });
    if (!nationalLaw) throw new Error("No se encontro ninguna ley nacional");
    return nationalLaw;
};

//*-----------GETONE-----------
const getOneNationalLaw = async ({ number }) => {
    const nationalLaw = await NationalLaw.findOne({ where: { status: true, number } });
    if (!nationalLaw || nationalLaw.length == 0) throw new Error("No se encontro ninguna ley nacional");
    return nationalLaw;
};

//*-----------CREATE-----------
const createNationalLaw = async ({ number, title, url }) => {
    const oldNationalLaw = await NationalLaw.findOne({ where: { status: true, number } });
    if (oldNationalLaw) throw new Error("Ya existe la ley nacional");

    const nationalLaw = await NationalLaw.create({ number, title, url });
    if (!nationalLaw) throw new Error("No se guardo la ley correctamente");

    return nationalLaw;
};

//*-----------PUT-----------
const modifyNationalLaw = async ({ number, title, url, newNumber }) => {
    const oldNationalLaw = await NationalLaw.findOne({ where: { status: true, number: newNumber } });
    if (oldNationalLaw) throw new Error("la ley numero: " + newNumber + " ya existe");

    const nationalLaw = await NationalLaw.findOne({ where: { status: true, number } });
    if (!nationalLaw) throw new Error("No se encontro la ley numero: " + number);

    if (title) nationalLaw.title = title;
    if (url) nationalLaw.url = url;
    if (newNumber) nationalLaw.number = parseInt(newNumber);
    await nationalLaw.save();

    return nationalLaw;
};

//*-----------DELETE-----------
const deleteNationalLaw = async ({ number }) => {
    const nationalLaws = await NationalLaw.findOne({ where: { status: true, number } });
    if (!nationalLaws) throw new Error("No se encontro la ley nacional");

    nationalLaws.status = false;
    await nationalLaws.save();

    return nationalLaws;
};

//*-----------UNDELETE-----------
const unDeleteNationalLaw = async ({ number }) => {
    const nationalLaws = await NationalLaw.findOne({ where: { status: false, number } });
    if (!nationalLaws) throw new Error("No se encontro la ley nacional");

    nationalLaws.status = true;
    await nationalLaws.save();

    return nationalLaws;
};

module.exports = {
    getNationalLaw,
    getDeletedNationalLaw,
    unDeleteNationalLaw,
    getOneNationalLaw,
    createNationalLaw,
    modifyNationalLaw,
    deleteNationalLaw
};
