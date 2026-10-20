const token = localStorage.getItem('token')

let resposta = document.getElementById('resposta')
let btn_cadastrar_agendamento = document.getElementById('btn_cadastrar_agendamento')

btn_cadastrar_agendamento.addEventListener('click', (e)=>{
    e.preventDefault()

    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipo = document.getElementById('tipo').value
    const idVeiculo = Number(document.getElementById('idVeiculo').value)
    const idCliente = Number(document.getElementById('idCliente').value)

    const valores = {
        data: data,
        hora: hora,
        tipo: tipo,
        idVeiculo: idVeiculo,
        idCliente: idCliente
    }

    fetch('http://localhost:3000/agendamento',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o agendamento!',err)
        resposta.innerHTML = 'Erro ao cadastrar o agendamento!'
    })
})