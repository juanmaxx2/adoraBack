//?-----------Imports-----------
const { getAllUsers, loginUser, createUser, deleteUser, getAllDeletedUsers, modifyUser, unDeleteUser } = require("../controllers/adminController");

//*-----------GETALLDELETED-----------
const getAllDeletedUsersHandler = async (req, res) => {
    try {
        const users = await getAllDeletedUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------GETALL-----------
const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------GET-----------
const loginUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser({ email, password })
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------CREATE-----------
const createUserHandler = async (req, res) => {
    const { name, lastname, email, password, rol } = req.body;
    try {
        const user = await createUser({ name, lastname, email, password, rol });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------PUT-----------
const modifyUserHandler = async (req, res) => {
    const { name, lastname, newEmail, rol, email } = req.body;
    try {
        const user = await modifyUser({ name, lastname, email, rol, newEmail });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------DELETE-----------
const deleteUserHandler = async (req, res) => {
    const { email } = req.body;
    try {
        await deleteUser({ email })
        res.status(200).json("Se elimino el usuario.");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

//*-----------UNDELETE-----------
const unDeleteUserHandler = async (req, res) => {
    const { email } = req.body;
    try {
        await unDeleteUser({ email });
        res.status(200).json("Se recupero el usuario.");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = {
    getAllDeletedUsersHandler,
    getAllUsersHandler,
    loginUserHandler,
    createUserHandler,
    modifyUserHandler,
    deleteUserHandler,
    unDeleteUserHandler
}