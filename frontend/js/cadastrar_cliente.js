let resposta = document.getElementById('resposta')
let btn_cadastrar_cliente = document.getElementById('btn_cadastrar_cliente')

btn_cadastrar_cliente.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const cpf = document.getElementById('cpf').value
    const senha = document.getElementById('senha').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('telefone').value

    const valores = {
        nome: nome,
        email: email,
        cpf: cpf,
        senha: senha,
        endereco: endereco,
        telefone: telefone
       
    }

    fetch('http://localhost:3000/cliente',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `${dados.message}`

    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o cliente!',err)
        resposta.innerHTML = 'Erro ao cadastrar o usuário!'
    })

})