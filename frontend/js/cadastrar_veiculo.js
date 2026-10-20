const token = localStorage.getItem('token')

let resposta = document.getElementById('resposta')
let btn_cadastrar_veiculo = document.getElementById('btn_cadastrar_veiculo')

btn_cadastrar_veiculo.addEventListener('click', (e)=>{
    e.preventDefault()

    const modelo = document.getElementById('modelo').value
    const marca = document.getElementById('marca').value
    const placa = document.getElementById('placa').value
    const codRastreador = document.getElementById('codRastreador').value
    const idCliente = Number(document.getElementById('idCliente').value)

    const valores = {
        modelo: modelo,
        marca: marca,
        placa: placa,
        codRastreador: codRastreador,
        idCliente: idCliente
    }

    fetch('http://localhost:3000/veiculo',{
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
        console.error('Erro ao cadastrar o veiculo!',err)
        resposta.innerHTML = 'Erro ao cadastrar o veiculo!'
    })
})