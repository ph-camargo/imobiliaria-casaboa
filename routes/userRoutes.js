const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastro de usuário
router.post('/cadastrar', userController.cadastrarUsuario);

// Rota para login de usuário
router.post('/login', userController.loginUsuario);

// Rota para verificar token (protege rotas que precisam de autenticação)
router.get('/verificar-token', userController.verificarToken, (req, res) => {
    res.json({ success: true, message: 'Token válido.', user: req.user });
});

module.exports = router;