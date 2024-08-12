const express = require('express'); //Framework express importada
const router = express.Router(); //Criação de novo roteador
const productsController = require('../controllers/productsController'); //Importa o controlador de produtos

//Definir rota para obter todos os produtos
router.get('/', productsController.getAllProducts);

//Definir rota para obter todos os produtos
router.post('/', productsController.addProduct);

//Definir rota para atualizar um produto existente(por completo)
router.put('/:id_produto', productsController.updateProductPut);

//Definir rota para atualizar um produto existente(parcialmente)
router.patch('/:id_produto', productsController.updateProductPatch);

//Definir rota para deletar um produto
router.delete('/:id_produto', productsController.deleteProduct);

module.exports = router; //Exportar o roteador

