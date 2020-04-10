/*
 * 1. Recuperar usuário
 * 2. Recuperar número de telefone com o id do usuário
 * 3. Recuperar endereço com o id do usuário
*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Logan'
            });
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                ddd: 82,
                numero: '99220-3311'
            });
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Avenida Rio Branco',
            numero: 237
        });
    }, 2000)
}

const usuarioPromise = obterUsuario();

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolvelefone(result) {
                return {
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome
                    },
                    telefone: result
                }
            })
    })
    .then(function (dados) {
        const endereco = obterEnderecoAsync(dados.usuario.id)
        return endereco.then(function resolverEndereco (result) {
            return {
                usuario: dados.usuario,
                telefone: dados.telefone,
                endereco: result
            }
        })
    })
    .then(function (consulta) {
        console.log(`Nome: ${consulta.usuario.nome}, Endereco: ${consulta.endereco.rua} n. ${consulta.endereco.numero}, Telefone: (${consulta.telefone.ddd}) ${consulta.telefone.numero}`);
    })
    .catch(function (error) {
        console.error(`Erro: ${error}`);
    })