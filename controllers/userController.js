const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Importa a conexão com o banco

const secretKey = 'seu-segredo'; // Defina uma chave secreta para o JWT

// Cadastrar usuário
const cadastrarUsuario = (req, res) => {
    const { nome, email, senha, telefone, tipoUsuario } = req.body;

    // Criptografando a senha antes de salvar no banco
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criptografar a senha.' });
        }

        const query = 'INSERT INTO cliente (nome, email, senha, telefone, tipo_usuario) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [nome, email, hashedPassword, telefone, tipoUsuario], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro no cadastro. ' + err.message });
            }
            return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!' });
        });
    });
};

const loginUsuario = (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT * FROM cliente WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor. ' + err.message });
        }

        if (result.length > 0) {
            // Verifica se a senha é válida
            console.log('Usuário encontrado:', result[0].email); // Log para ver se o usuário foi encontrado
            console.log('Senha criptografada no banco:', result[0].senha); // Log da senha no banco de dados
            bcrypt.compare(senha, result[0].senha, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Erro ao comparar a senha.' });
                }

                if (isMatch) {
                    const token = jwt.sign(
                        { id: result[0].id_cliente, email: result[0].email, tipoUsuario: result[0].tipo_usuario },
                        secretKey,
                        { expiresIn: '1h' }
                    );

                    // Redireciona baseado no tipo de usuário
                    let redirectUrl = 'home.html';  // URL padrão para usuários comuns
                    if (result[0].tipo_usuario === 'administrador') {
                        redirectUrl = 'adm.html';  // URL para administradores
                    }

                    return res.json({
                        success: true,
                        message: 'Login bem-sucedido!',
                        token,
                        redirectUrl
                    });
                } else {
                    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }
    });
};


// Verificar token
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token de autenticação ausente.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token inválido.' });
    }
};

module.exports = { cadastrarUsuario, loginUsuario, verificarToken };