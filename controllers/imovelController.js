const Imovel = require('../models/imovelModels');

const cadastrarImovel = async (req, res) => {
    try {
        const { endereco, descricao, num_comodos, data_nascimento } = req.body;
        const id_cliente = req.user.id; // ID do usuário logado

        if (!endereco || !descricao || !num_comodos || !data_nascimento) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }

        // Garantir que num_comodos seja um número válido
        if (isNaN(num_comodos) || num_comodos <= 0) {
            return res.status(400).json({ message: 'Número de cômodos inválido!' });
        }

        await Imovel.create({ endereco, descricao, num_comodos, data_nascimento, id_cliente });

        res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        res.status(500).json({ message: 'Erro ao cadastrar imóvel' });
    }
};



const editarImovel = async (req, res) => {
    try {
        const { id } = req.params;
        const { endereco, descricao, num_comodos } = req.body;
        const id_cliente = req.user.id;

        const [updated] = await Imovel.update(
            { endereco, descricao, num_comodos },
            { where: { id, id_cliente } }
        );

        if (updated) {
            return res.status(200).json({ message: 'Imóvel atualizado com sucesso!' });
        }

        res.status(403).json({ message: 'Você não tem permissão para editar este imóvel.' });
    } catch (error) {
        console.error('Erro ao editar imóvel:', error);
        res.status(500).json({ message: 'Erro ao editar imóvel' });
    }
};

const excluirImovel = async (req, res) => {
    try {
        const { id } = req.params;
        const id_cliente = req.user.id;

        const deleted = await Imovel.destroy({ where: { id, id_cliente } });

        if (deleted) {
            return res.status(200).json({ message: 'Imóvel excluído com sucesso!' });
        }

        res.status(403).json({ message: 'Você não tem permissão para excluir este imóvel.' });
    } catch (error) {
        console.error('Erro ao excluir imóvel:', error);
        res.status(500).json({ message: 'Erro ao excluir imóvel' });
    }
};

module.exports = { cadastrarImovel, editarImovel, excluirImovel };
