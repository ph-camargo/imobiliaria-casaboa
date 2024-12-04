const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtém o token do cabeçalho Authorization
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ success: false, message: 'Token não fornecido.' });
    }

    // Verifica se o token é válido
    jwt.verify(token, 'seu-segredo', (err, decoded) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Falha na autenticação.' });
        }

        // Salva as informações decodificadas do token na requisição para uso posterior
        req.user = decoded;
        next(); // Chama o próximo middleware ou rota
    });
};

module.exports = { verificarToken };