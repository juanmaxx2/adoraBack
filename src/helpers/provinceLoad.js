const { Province, DepartmentEducation } = require("../db");

const provinceLoad = async () => {
    const province = await Province.findAll();

    if (province && province.length != 0) return;

    const listProvince = [
        { name: "Buenos Aires", flag: null, shield: null, whatsapp: "" },
        { name: "Ciudad Autónoma de Buenos Aires", flag: null, shield:null, whatsapp: "" },
        { name: "Catamarca", flag:null, shield: null, whatsapp: "" },
        { name: "Chaco", flag: null, shield: null, whatsapp: "" },
        { name: "Chubut", flag: null, shield: null, whatsapp: "" },
        { name: "Córdoba", flag: null, shield: null, whatsapp: "" },
        { name: "Corrientes", flag: null, shield: null, whatsapp: "" },
        { name: "Entre Ríos", flag: null, shield:null, whatsapp: "" },
        { name: "Formosa", flag: null, shield: null, whatsapp: "" },
        { name: "Jujuy", flag: null, shield: null, whatsapp: "" },
        { name: "La Pampa", flag: null, shield: null, whatsapp: "" },
        { name: "La Rioja", flag: null, shield: null, whatsapp: "" },
        { name: "Mendoza", flag: null, shield: null, whatsapp: "" },
        { name: "Misiones", flag: null, shield: null, whatsapp: "" },
        { name: "Neuquén", flag: null, shield: null, whatsapp: "" },
        { name: "Río Negro", flag: null, shield: null, whatsapp: "" },
        { name: "Salta", flag: null, shield: null, whatsapp: "" },
        { name: "San Juan", flag: null, shield: null, whatsapp: "" },
        { name: "San Luis", flag: null, shield: null, whatsapp: "" },
        { name: "Santa Cruz", flag: null, shield: null, whatsapp: "" },
        { name: "Santa Fe", flag: null, shield: null, whatsapp: "" },
        { name: "Santiago del Estero", flag: null, shield: null, whatsapp: "" },
        { name: "Tierra del Fuego", flag: null, shield: null, whatsapp: "" },
        { name: "Tucumán", flag: null, shield: null, whatsapp: "" }
    ];

    try {
        const createdProvinces = await Province.bulkCreate(listProvince);

        const departmentEducationPromises = createdProvinces.map(async province => {
            const dep = await DepartmentEducation.create({
                photo: "",
                url: "",
                commission: `Ministerio de educación de ${province.name}`,
                contact: "",
                status: true
            });
            await province.setDepartmentEducation(dep);
        });

        // Esperar a que todos los ministerios de educación se creen
        await Promise.all(departmentEducationPromises);
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = provinceLoad;
