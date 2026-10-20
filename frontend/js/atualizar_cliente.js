const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault()

    const codCiclista = Number(document.getElementById('codCiclista').value)
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('telefone').value

    if (!codCiclista) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Ciclista!</p>'
        return
    }

    const ciclistaAtualizado = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        telefone: telefone
    }

    try {
        const res = await fetch(`http://localhost:3000/cliente/${codCiclista}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(ciclistaAtualizado)
        })

        const dados = await res.json()

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Endereço</th>
                    <th>Celular</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_ciclista}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.email}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.endereco}</td>
                    <td>${dados.celular}</td>
                </tr>
            </tbody>
        </table>
        `

        document.querySelector('form').reset()

    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o ciclista.</p>'
    }
})
