const Cliente = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.telefone){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: "CPF inválido!"})
    }

    try {
        
    const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
    const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

    await Cliente.create({
        nome: valores.nome,
        email: valores.email,
        senha: senhaCripto,
        cpf: cpfCripto,
        endereco: valores.endereco,
        telefone: valores.telefone
    })

    return res.status(201).json({message: "Dados cadastrados com sucesso!"})

    } catch (err){
        console.error('Erro ao cadastrar cliente!')
        res.status(500).json({message: "Erro ao cadastrar cliente!"})
        
    }
}

const consultarID = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try {
        const cliente = await Cliente.findByPk(id)

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            endereco: cliente.endereco,
            telefone: cliente.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar cliente!')
        res.status(500).json({message: "Erro ao consultar cliente!"})
    }
}


const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    console.log(nome)

    try {
        const cliente = await Cliente.findOne({where: {nome: nome}})

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            endereco: cliente.endereco,
            telefone: cliente.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar por nome cliente!')
        res.status(500).json({message: "Erro ao consultar por nome cliente!"})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try {
        const cliente = await Cliente.findByPk(id)

        
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        await Cliente.destroy({where: {codCliente: id}})
        return res.status(200).json({message: "Dados apagados com sucesso!"})

    } catch (err) {
        console.error('Erro ao apagar cliente!')
        res.status(500).json({message: "Erro ao apagar cliente!"}) 
    }
}

const listar = async(req,res)=>{
    try {
        const clientes = await Cliente.findAll()
        let resultado = []
        let cpfDescriptografado = ''

        clientes.forEach((el)=>{
            const bytes = cryptoJs.AES.decrypt(el.cpf, CHAVE_SECRETA)
            cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_cliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                endereco: el.endereco,
                telefone: el.telefone
            })
        })

        res.status(200).json(resultado)


    } catch (err) {
        console.error('Erro ao listar cliente!')
        res.status(500).json({message: "Erro ao listar cliente!"}) 
    }
}

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'CPF inválido !!'})
    }

    try{
        let dados = await Cliente.findByPk(id)
        if(!dados){
            res.status(404).json({message: 'Ciclista não encontrado no banco de dados!'})
        }else{
            valores.cpf = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
            valores.senha = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

            await Cliente.update(valores, { where: { codCliente: id }})
            dados = await Cliente.findByPk(id)

            const bytes = cryptoJs.AES.decrypt(dados.cpf, CHAVE_SECRETA)
            const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            res.status(200).json({
                codigo_cliente: dados.codCliente,
                nome: dados.nome,
                email: dados.email,
                cpf: cpfDescriptografado,
                endereco: dados.endereco,
                telefone: dados.telefone
            
            })
        }
    }catch(err){
        console.error('Não foi possível atualizar o Ciclista',err)
        res.status(500).json({message: 'Não foi possível atualizar o Ciclista'})
    }
}

module.exports = {cadastrar, consultarID, consultarNome, apagar, listar, atualizar}