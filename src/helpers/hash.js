const bcrypt = require('bcrypt');
const { HASHWORD } = process.env; // Variable de entorno para agregar a la contraseña

// Función para hashear la contraseña
const hash = async (password) => {
    // Verificar si HASHWORD está definido y agregarlo
    if (HASHWORD) {
        password = password + HASHWORD;
    }
    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Función para comparar la contraseña en texto plano con el hash almacenado
const comparePasswords = async (password, hashedPassword) => {
    if (HASHWORD) {
        password = password + HASHWORD;
    }
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hash,
    comparePasswords
};
