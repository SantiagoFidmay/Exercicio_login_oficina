const conn = require('./db/conn')

const {Agendamento, Cliente , Veiculo} = require('./models/rel')

async function syncDataBase(){
    try {
        await conn.sync({force: true})
        console.log("Tabelas criadas e sincronizadas!")

    } catch (error) {
        console.error("Erro ao sincronizar com o banco de dados!    ")

    }finally{
        await conn.close()
        console.log("Fechando a conexão com o Banco de Dados")
    }
    
}

syncDataBase()