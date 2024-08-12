const { query } = require('express');
const db = require('../config/db'); //Importar conexão com banco de dados

//Função para obter todos os produtos
const getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if(err) {
            console.error('Erro ao obter produtos:', err);
            res.status(500).send('Erro ao obter produtos');
            return;
        }
        res.json(results);
    });
};

//Função para adicionar um novo produto
const addProduct = (req, res) => {
    const { nome, descriptions, category, price, stock, expiry_date } = req.body;
    db.query(
        'INSERT INTO products( nome, descriptions, category, price, stock, expiry_date) VALUES (?,?,?,?,?,?)',
        [ nome, descriptions, category, price, stock, expiry_date],
        (err, results) => {
            if(err) {
                console.error('Erro ao adicionar produtos:', err)
                results.status(500).send('Erro ao adicionar produtos')
                return;
            }
            res.status(201).send('Produto adicionado com sucesso');
        }
    );
};

//Função para atualizar um produto por completo
const updateProductPut = (req, res) => {
    const { id_produto } = req.params;
    const { nome, descriptions, category, price, stock, expiry_date } = req.body;
    db.query('UPDATE products SET nome = ?, descriptions = ?, category = ?, price = ?, stock = ?, expiry_date = ? WHERE id_produto=?',
    [ nome, descriptions, category, price, stock, expiry_date, id_produto],
    (err, results) => {
        if(err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).send('Erro ao atualizar produto');
            return;
        }
        res.send('Produto atualizado com sucesso');
    }
    )
};

//Função para atualizar um produto parcialmente
const updateProductPatch = (req, res) => {
    const { id_produto } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for(const[key, value] of Object.entries(fields)) {
        query.push(`${key}=?`);
        values.push(value);
    }
    values.push(id_produto);

    db.query(`UPDATE products SET ${query.join(',')} WHERE id_produto = ?`,
    values,
    (err, results) => {
        if(err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).send('Erro ao atualizar produto');
            return;
        }
        res.send('Produto atualizado com sucesso');
    }
);
};

//Função para deletar um produto
const deleteProduct = (req, res) => {
    const { id_produto } = req.params;
    db.query('DELETE FROM products WHERE id_produto=?', [id_produto], (err, results) => {
        if(err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).send('Erro ao deletar produto');
            return;
        }
        res.send('Produto deletado com sucesso');
    });
};

module.exports = {
    
    addProduct,
    getAllProducts, 
    
    updateProductPut,
    updateProductPatch,
    deleteProduct
};