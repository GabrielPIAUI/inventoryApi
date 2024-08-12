const dotenv = require('dotenv'); //Importar o pacote dotenv para gerenciar variáveis de ambiente

//Configurar as variáveis de ambiente
dotenv.config(); //Carrega as variáveis definidas no arquivos .env para process.env

//Importar bibliotecas
const express = require('express'); //Framework express importada
const cors = require('cors'); //Permite requisições de diferentes origens
const bodyParser = require('body-parser'); //Analisa o corpo das requisições HTTP


//Importar bibliotecas
const db = require('./config/db'); //Importa a conexão com o banco de dados
const productsRoutes = require('./routes/products'); //Importar rotas dos produtos

//Inicializar nova aplicação express
const app = express();

//Configurar cors e body-parser
app.use(cors()); //Habilita o cors para todas as rotas
app.use(bodyParser.json()); //Configura para analisar requisições json

//Usar as rotas de produtos para todas requisições que começam com /api/products
app.use('/api/products', productsRoutes);

//Rota inicial de teste do servidor
app.get('/', (req, res) => {
    res.send('Servidor está rodando'); 
});

//Configura o servidor para escutar uma porta específica
const port = process.env.port || 3000; //Define a porta a partir da variável de ambiente ou usa a 3000 como padrão

app.listen(port, () => {
    console.log(`Console rodando na porta ${port}`);
});