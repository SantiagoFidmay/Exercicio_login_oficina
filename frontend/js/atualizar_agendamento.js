const token = localStorage.getItem('token')

// Proteção da rota privada: se não houver token, redireciona para a Home
if (!token) {
    location.href = '../index.html'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const codAgendamento = document.getElementById('codAgendamento').value

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        tipo: document.getElementById('tipo').value,
        idVeiculo: Number(document.getElementById('idVeiculo').value),
        idCliente: Number(document.getElementById('idCliente').value),
    }

    fetch(`http://localhost:3000/agendamento/${codAgendamento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        console.log(dados)
    
        resposta.innerHTML = `<p>${dados.message}</p>`
    
        if (dados.message) {
            console.log(dados.message)
        }
    })
    .catch(err => {
        console.error('Erro ao atualizar agendamento:', err)
    })
})