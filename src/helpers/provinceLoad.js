const { Province, DepartmentEducation } = require("../db");

const provinceLoad = async () => {
    const province = await Province.findAll();

    if (province && province.length != 0) return;

    const listProvince = [
        { name: "Buenos Aires", flag: "", shield: "", whatsapp: "" },
        { name: "Ciudad Autónoma de Buenos Aires", flag: "", shield: "", whatsapp: "" },
        { name: "Catamarca", flag: "", shield: "", whatsapp: "" },
        { name: "Chaco", flag: "", shield: "", whatsapp: "" },
        { name: "Chubut", flag: "", shield: "", whatsapp: "" },
        { name: "Córdoba", flag: "", shield: "", whatsapp: "" },
        { name: "Corrientes", flag: "", shield: "", whatsapp: "" },
        { name: "Entre Ríos", flag: "", shield: "", whatsapp: "" },
        { name: "Formosa", flag: "", shield: "", whatsapp: "" },
        { name: "Jujuy", flag: "", shield: "", whatsapp: "" },
        { name: "La Pampa", flag: "", shield: "", whatsapp: "" },
        { name: "La Rioja", flag: "", shield: "", whatsapp: "" },
        { name: "Mendoza", flag: "", shield: "", whatsapp: "" },
        { name: "Misiones", flag: "", shield: "", whatsapp: "" },
        { name: "Neuquén", flag: "", shield: "", whatsapp: "" },
        { name: "Río Negro", flag: "", shield: "", whatsapp: "" },
        { name: "Salta", flag: "", shield: "", whatsapp: "" },
        { name: "San Juan", flag: "", shield: "", whatsapp: "" },
        { name: "San Luis", flag: "", shield: "", whatsapp: "" },
        { name: "Santa Cruz", flag: "", shield: "", whatsapp: "" },
        { name: "Santa Fe", flag: "", shield: "", whatsapp: "" },
        { name: "Santiago del Estero", flag: "", shield: "", whatsapp: "" },
        { name: "Tierra del Fuego", flag: "", shield: "", whatsapp: "" },
        { name: "Tucumán", flag: "", shield: "", whatsapp: "" }
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
