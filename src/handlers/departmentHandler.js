//?-----------Imports-----------
const { getDepartment, createDepartment, modifyDepartment, deleteDepartment, getAllDepartment } = require("../controllers/departmentController");

//*-----------GETALL-----------
const getAllDepartmentHandler = async (req, res) => {
    try {
        const department = await getAllDepartment();
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GET-----------
const getDepartmentHandler = async (req, res) => {
    const { province } = req.params;
    try {
        const department = await getDepartment({ province });
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------CREATE-----------
const createDepartmentHandler = async (req, res) => {
    const { province, url, commission, contact } = req.body;
    const photo = req.file;
    try {
        if (!province || !url || !commission || !contact || !photo) {
            throw new Error("Faltan Datos");
        }
        const department = await createDepartment({ province, pho:photo, url, commission, contact });
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------PUT-----------
const modifyDepartmentHandler = async (req, res) => {
    const { url, commission, contact } = req.body;
    const { id } = req.params;
    const photo = req.file;
    console.log(url, commission, contact,id,photo)
    try {
        if (!id) throw new Error("falta el id de la actividad");
        const department = await modifyDepartment({ id, pho:photo, url, commission, contact });
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------DELETE-----------
const deleteDepartmentHandler = async (req, res) => {
    const { province } = req.params;
    try {
        await deleteDepartment({ province });
        res.status(200).json("Se elimino el departamento");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getDepartmentHandler,
    getAllDepartmentHandler,
    createDepartmentHandler,
    modifyDepartmentHandler,
    deleteDepartmentHandler
};
