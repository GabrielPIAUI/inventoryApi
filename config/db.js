//Importar a biblioteca mysql2 e criar conexão com o Banco de Dados
const mysql = require('mysql2'); //Importação do pacote mysql2 e conexão com o Banco de Dados

const db = mysql.createConnection({
    host:process.env.DB_HOST, //Endereço do servidor do Banco de Dados
    user:process.env.DB_USER, //Nome do usuário para acessar o Banco de Dados
    password:process.env.DB_PASS, //Senha do usuário
    database:process.env.DB_NAME, //Nome do banco de dados que será acessado

});

db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err); //Mensagem de erro exibida
        return;
    }
    console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`); //Mensagem de sucesso

});

module.exports = db; //Exporta a conexão para utilizar em outros arquivos
