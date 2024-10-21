//?-----------Imports-----------
const { getAllProvince, getProvince, createProvince, deleteProvince, modifyProvince } = require("../controllers/provinceController");

//*-----------GETALL-----------
const getAllProvinceHandler = async (req, res) => {
    try {
        const listProvinces = await getAllProvince();
        res.status(200).json(listProvinces);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------GET-----------
const getProvinceHandler = async (req, res) => {
    const { name } = req.params;
    try {
        const province = await getProvince({ name });
        res.status(200).json(province);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------CREATE-----------
const createProvinceHandler = async (req, res) => {
    const { name, whatsapp } = req.body;
    const files = req.files;

    try {
        if (!name || !whatsapp) throw new Error("Faltan datos");

        const fileFlag = files.flag ? files.flag[0] : null;
        const fileShield = files.shield ? files.shield[0] : null;

        if (!fileFlag || !fileShield) {
            throw new Error("Faltan imágenes (flag o shield)");
        }

        const province = await createProvince({ name, whatsapp, fileFlag, fileShield });
        res.status(200).json(province);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

//*-----------PUT-----------
const modifyProvinceHandler = async (req, res) => {
    const { whatsapp } = req.body;
    const { name } = req.params;
    const files = req.files;
    try {
        const fileFlag = files.flag ? files.flag[0] : null;
        const fileShield = files.shield ? files.shield[0] : null;
        const province = modifyProvince({ name, whatsapp, fileFlag, fileShield });
        res.status(200).json(province);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------DELETE-----------
const deleteProvinceHandler = async (req, res) => {
    const { name } = req.params;
    try {
        await deleteProvince({ name });
        res.status(200).json("Se elimino la provincia");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getAllProvinceHandler,
    getProvinceHandler,
    createProvinceHandler,
    modifyProvinceHandler,
    deleteProvinceHandler
};