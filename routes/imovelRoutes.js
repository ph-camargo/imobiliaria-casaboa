const express = require('express');
const router = express.Router();
const { Imovel } = require('../models/imovelModels');

// Rota para listar imóveis
router.get('/', async (req, res) => {
    try {
        const imoveis = await Imovel.findAll();
        res.json({ imoveis });
    } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
        res.status(500).json({ message: 'Erro ao carregar imóveis.' });
    }
});

// Rota para cadastrar imóvel
router.post('/cadastrar', async (req, res) => {
    const { endereco, descricao, num_comodos, data_nascimento } = req.body;
    try {
        const novoImovel = await Imovel.create({
            endereco,
            descricao,
            num_comodos,
            data_nascimento
        });
        res.json({ message: 'Imóvel cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        res.status(500).json({ message: 'Erro ao cadastrar imóvel.' });
    }
});

// Rota para excluir imóvel
router.delete('/excluir/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const imovel = await Imovel.destroy({ where: { id_imovel: id } });
        if (imovel) {
            res.json({ message: 'Imóvel excluído com sucesso!' });
        } else {
            res.status(404).json({ message: 'Imóvel não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao excluir imóvel:', error);
        res.status(500).json({ message: 'Erro ao excluir imóvel.' });
    }
});

// Rota para editar imóvel
router.put('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { endereco, descricao, num_comodos, data_nascimento } = req.body;
    try {
        const imovel = await Imovel.update(
            { endereco, descricao, num_comodos, data_nascimento },
            { where: { id_imovel: id } }
        );
        if (imovel[0] > 0) {
            res.json({ message: 'Imóvel atualizado com sucesso!' });
        } else {
            res.status(404).json({ message: 'Imóvel não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao editar imóvel:', error);
        res.status(500).json({ message: 'Erro ao editar imóvel.' });
    }
});

module.exports = router;


