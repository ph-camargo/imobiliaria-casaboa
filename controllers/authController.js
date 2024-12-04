const jwt = require('jsonwebtoken');
const secretKey = 'seu-segredo'; // Defina uma chave secreta para o JWT

// Verificar token
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token de autenticação ausente.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Aqui é onde você pega as informações do usuário do token
        next(); // Chama o próximo middleware ou a rota
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token inválido.' });
    }
};

module.exports = { verificarToken };