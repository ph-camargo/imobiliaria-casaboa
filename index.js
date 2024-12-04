const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const imovelRoutes = require('./routes/imovelRoutes'); // Importando as rotas de imóveis
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de Cadastro e Login funcionando!');
});

// Usar as rotas de usuários
app.use('/api', userRoutes);

// Usar as rotas de imóveis
app.use('/api/imoveis', imovelRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
