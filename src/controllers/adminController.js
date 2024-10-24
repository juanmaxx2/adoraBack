//?-----------Imports-----------
const { User } = require("../db");
const { hash, comparePasswords } = require("../helpers/hash");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

//*-----------GETALLDELETED-----------
const getAllDeletedUsers = async () => {
    const users = await User.findAll({
        where: { status: false }
    });

    if (!users) throw new Error('No se encontraron los usuarios.');

    const newUsers = users.map(user => {
        return {
            email: user.dataValues.email,
            name: user.dataValues.name,
            lastname: user.dataValues.lastname,
            rol: user.dataValues.rol,
        }
    });

    return newUsers;
};

//*-----------GETALL-----------
const getAllUsers = async () => {
    const users = await User.findAll({
        where: { status: true }
    });

    if (!users) throw new Error('No se encontraron los usuarios.');

    const newUsers = users.map(user => {
        return {
            email: user.dataValues.email,
            name: user.dataValues.name,
            lastname: user.dataValues.lastname,
            rol: user.dataValues.rol,
        }
    });

    return newUsers;
};

//*-----------GET-----------
const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, status: true } });

    if (!user) throw new Error('Correo electrónico no encontrado.');

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta.');

    const token = jwt.sign(
        { email: user.email, rol: user.rol },
        SECRET_KEY,
        { expiresIn: '3h' }
    );

    return { token };
};

//*-----------CREATE-----------
const createUser = async ({ name, lastname, email, password, rol }) => {
    const user = await User.findOne({
        where: { email }
    });

    if (user) throw new Error('El mail ya fue utilizado.');

    // Validaciones para el mail
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Correo electrónico inválido');
    }

    // Validaciones para la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error('La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula y un número.');
    }

    const hashedPassword = await hash(password);

    // Crear el usuario con la contraseña hasheada
    const newUser = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
        rol
    });

    return newUser;
};

//*-----------PUT-----------
const modifyUser = async ({ name, lastname, newEmail, rol, email }) => {
    const user = await User.findOne({
        where: { email }
    });
    if (!user) throw new Error('El usuario no existe.');

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (newEmail) {
        const newUser = await User.findOne({
            where: { email: newEmail }
        });
        if (newUser) throw new Error('El mail ya fue utilizado.');
        if (!/\S+@\S+\.\S+/.test(newEmail)) throw new Error('Correo electrónico inválido');
        user.email = newEmail;
    }
    if (rol) user.rol = rol;

    await user.save();

    return user;
};

//*-----------DELETE-----------
const deleteUser = async ({ email }) => {
    const user = await User.findOne({
        where: { email, status: true }
    });

    if (!user) throw new Error('no se encontro el usuario.');

    console.log(user)

    user.status = false;
    await user.save();
    return;
};

//*-----------UNDELETE-----------
const unDeleteUser = async ({ email }) => {
    const user = await User.findOne({
        where: { email, status: false }
    });
    if (!user) throw new Error('no se encontro el usuario.');

    user.status = true;
    await user.save();
    return;
};

module.exports = {
    getAllDeletedUsers,
    getAllUsers,
    loginUser,
    createUser,
    deleteUser,
    modifyUser,
    unDeleteUser
}