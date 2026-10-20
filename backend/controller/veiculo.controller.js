const Veiculo = require('../models/Veiculo')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.modelo || !valores.marca || !valores.placa || !valores.codRastreador || !valores.idCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {

        const codCripto = cryptoJs.AES.encrypt(valores.codRastreador, CHAVE_SECRETA).toString()

        await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: valores.placa,
            codRastreador: codCripto,
            idCliente: valores.idCliente
        })

        return res.status(201).json({message: "Dados cadastrados com sucesso!"})

    } catch (err){
        console.error('Erro ao cadastrar veiculo!', err)
        return res.status(500).json({message: "Erro ao cadastrar veiculo!"})
    }
}


const listar = async(req,res)=>{
    try {
        const veiculos = await Veiculo.findAll()
        let resultado = []
        let codDescriptografado = ''

        veiculos.forEach((el)=>{
            const bytes = cryptoJs.AES.decrypt(el.codRastreador, CHAVE_SECRETA)
            codDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_veiculo: el.codVeiculo,
                modelo: el.modelo,
                marca: el.marca,
                placa: el.placa,
                codRastreador: codDescriptografado,
                idCliente: el.idCliente
            })
        })

        res.status(200).json(resultado)


    } catch (err) {
        console.error('Erro ao listar cliente!')
        res.status(500).json({message: "Erro ao listar cliente!"}) 
    }
}


module.exports = {cadastrar, listar}