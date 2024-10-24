const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Define una clave secreta en las variables de entorno

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // El token se espera en el encabezado 'Authorization'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Guarda los datos del usuario decodificado en el request
        next();
    });
};

// Middleware para verificar si el usuario es admin o superadmin
const isAdmin = (req, res, next) => {
    const { rol } = req.user;
    if (rol === 'admin' || rol === 'superadmin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

const isSuperAdmin = (req, res, next) => {
    const { rol } = req.user;
    if (rol === 'superadmin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Super Admins only.' });
    }
};

module.exports = { authenticateJWT, isAdmin, isSuperAdmin };
