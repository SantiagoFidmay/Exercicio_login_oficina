const Agendamento = require('../models/Agendamento')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.tipo || !valores.idCliente || !valores.idVeiculo){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try{
        await Agendamento.create({
            data: valores.data,
            hora: valores.hora,
            tipo: valores.tipo,
            idCliente: valores.idCliente,
            idVeiculo: valores.idVeiculo
        })

        return res.status(201).json({message: 'Agendamento cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar agendamento',err)
        return res.status(500).json({message: 'Erro ao cadastrar agendamento!'})
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.data || !valores.hora || !valores.tipo || !valores.idVeiculo || !valores.idCliente) {
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try {
        let dados = await Agendamento.findByPk(id)

        if (!dados) {
            return res.status(404).json({message: 'Agendamento não encontrado no banco de dados!'})
        } else {
            await Agendamento.update({
                data: valores.data,
                hora: valores.hora,
                tipo: valores.tipo,
                idVeiculo: valores.idVeiculo,
                idCliente: valores.idCliente
            }, {where: {codAgendamento: id}})

            dados = await Agendamento.findByPk(id)

            return res.status(200).json({
                message: 'Agendamento atualizado com sucesso!',
                codigo_agendamento: dados.codAgendamento,
                data: dados.data,
                hora: dados.hora,
                tipo: dados.tipo,
                idVeiculo: dados.idVeiculo,
                idCliente: dados.idCliente
            })
        }
    } catch (err) {
        console.error('Não foi possível atualizar o Agendamento', err)
        return res.status(500).json({message: 'Não foi possível atualizar o Agendamento'})
    }
}

module.exports = { cadastrar, atualizar }