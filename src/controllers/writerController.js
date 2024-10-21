//?-----------Imports-----------
const { Writer } = require("../db");

//*-----------GETALL-----------
const getAllWriters = async () => {
    const writers = await Writer.findAll({ where: { status: true } });

    if (!writers) throw new Error("No se encontraron escritores");

    return writers;
};

//*-----------GET-----------
const getWriter = async ({ id }) => {
    const writer = await Writer.findOne({ where: { status: true, id } });

    if (!writer) throw new Error("No se encontro el escritor");

    return writer;
};

//*-----------CREATE-----------
const createWriter = async ({ firstname, lastname, photo, mail }) => {
    const writer = await Writer.create({ firstname, lastname, photo, mail });

    return writer;
};

//*-----------PUT-----------
const modifyWriter = async ({ id, firstname, lastname, photo, mail }) => {
    const writer = await Writer.findOne({ where: { status: true, id } });

    if (!writer) throw new Error("No se encontro el escritor");

    if (firstname) writer.firstname = firstname;
    if (lastname) writer.lastname = lastname;
    if (photo) writer.photo = photo;
    if (mail) writer.mail = mail;

    await writer.save();

    return writer;
};

//*-----------DELETE-----------
const deleteWriter = async ({ id }) => {
    const writer = await Writer.findOne({ where: { status: true, id } });
    if (!writer || !writer.status) throw new Error("No se encontro el escritor");

    writer.status = false;

    await writer.save();
};

module.exports = {
    getAllWriters,
    getWriter,
    modifyWriter,
    deleteWriter,
    createWriter
};