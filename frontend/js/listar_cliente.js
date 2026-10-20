const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch('http://localhost:3000/clientes', {
        headers: {'Authorization': token}
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
                    <th>Telefone</th>
                </tr>
            </thead>

            <tbody>
                ${dados.map(el => `
                    <tr>
                        <td>${el.codigo_ciclista}</td>
                        <td>${el.nome}</td>
                        <td>${el.email}</td>
                        <td>${el.cpf}</td>
                        <td>${el.endereco}</td>
                        <td>${el.telefone}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `
    } catch (err) {
        console.error('Erro ao listar os ciclistas', err)
        resposta.innerHTML = '<p>Erro ao listar os ciclistas.</p>'
    }
})
