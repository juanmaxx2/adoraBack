//?-----------Imports-----------
const { Province, ProvincialLaw } = require("../db");

//*-----------GET-----------
const getProvincialLaw = async ({ province }) => {
    const provincialLaw = await ProvincialLaw.findAll({
        where: { status: true },
        include: {
            model: Province,
            attributes: [],
            where: {
                name: province
            }
        }
    });
    if (!provincialLaw || provincialLaw.length === 0)
        throw new Error("No se encuentran las leyes provinciales para " + province);
    return provincialLaw;
};

//*-----------GETDELETED-----------
const getDeletedProvincialLaw = async ({ province }) => {
    const provincialLaw = await ProvincialLaw.findAll({
        where: { status: false },
        include: {
            model: Province,
            attributes: [],
            where: {
                name: province
            }
        }
    });
    if (!provincialLaw || provincialLaw.length === 0)
        throw new Error("No se encuentran las leyes provinciales para " + province);
    return provincialLaw;
};

//*-----------PUT-----------
const modifyProvincialLaw = async ({ number, province, title, url, newNumber, newProvince }) => {
    const provincialLaw = await ProvincialLaw.findOne({
        where: { number },
        include: {
            model: Province,
            attributes: [],
            where: {
                name: province
            }
        }
    });
    if (!provincialLaw) throw new Error("No se encuentra la ley con el número: " + number + " en la provincia: " + province);

    if (newNumber && newProvince) {
        const existingLaw = await ProvincialLaw.findOne({
            where: { number: newNumber },
            include: {
                model: Province,
                attributes: [],
                where: {
                    name: newProvince
                }
            }
        });

        if (existingLaw) throw new Error("La ley con el nuevo número ya existe en esa provincia");
        provincialLaw.number = newNumber;
        provincialLaw.setProvince(newProvince);

    } else if (newProvince) {
        const existingLaw = await ProvincialLaw.findOne({
            where: { number },
            include: {
                model: Province,
                attributes: [],
                where: {
                    name: newProvince
                }
            }
        });

        if (existingLaw) throw new Error("La ley con el nuevo número ya existe en esa provincia");
        provincialLaw.setProvince(newProvince);

    } else if (newNumber) {
        const existingLaw = await ProvincialLaw.findOne({
            where: { number: newNumber },
            include: {
                model: Province,
                attributes: [],
                where: {
                    name: province
                }
            }
        });

        if (existingLaw) throw new Error("La ley con el nuevo número ya existe en esa provincia");
        provincialLaw.number = newNumber;
    }

    if (title) provincialLaw.title = title;
    if (url) provincialLaw.url = url;

    await provincialLaw.save();
    return provincialLaw;
};

//*-----------CREATE-----------
const createProvincialLaw = async ({ number, title, url, province }) => {
    const prov = await Province.findOne({ where: { name: province } });
    if (!prov) throw new Error("La provincia no existe");

    const existingLaw = await ProvincialLaw.findOne({
        where: { number },
        include: {
            model: Province,
            where: { name: province }
        }
    });
    if (existingLaw) throw new Error("La ley ya existe en esta provincia");

    const newLaw = await ProvincialLaw.create({ number, title, url, status: true });
    await prov.addProvincialLaw(newLaw);
    return newLaw;
};

//*-----------DELETE-----------
const deleteProvincialLaw = async ({ number, province }) => {
    const provincialLaw = await ProvincialLaw.findOne({
        where: { number },
        include: {
            model: Province,
            attributes: [],
            where: {
                name: province
            }
        }
    });

    if (!provincialLaw)
        throw new Error("No se encuentra la ley con el número: " + number + " en la provincia: " + province);

    if (provincialLaw.status) provincialLaw.status = false;
    else provincialLaw.status = true;

    provincialLaw.save();

    return { message: "Ley provincial eliminada correctamente" };
};

module.exports = {
    getProvincialLaw,
    getDeletedProvincialLaw,
    modifyProvincialLaw,
    createProvincialLaw,
    deleteProvincialLaw,
};
