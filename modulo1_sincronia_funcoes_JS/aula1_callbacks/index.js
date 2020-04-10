/*
    1. Recuperar usuário
    2. Recuperar número de telefone com o id do usuário
    3. Recuperar endereço com o id do usuário
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Logan'
        });
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            ddd: 82,
            numero: '99220-3311'
        });
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Avenida Rio Branco',
            numero: 237
        });
    }, 2000)
}

obterUsuario(function resolverUsuario(erro1, usuario) {
    if (erro1) {
        console.error(`Erro no usuario: ${erro1}`);
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro2, telefone) {
        if (erro2) {
            console.error(`Erro no telefone: ${erro2}`)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro3, endereco) {
            if (erro3) {
                console.error(`Erro no endereco: ${erro3}`);
                return;
            }

            console.log(`Nome: ${usuario.nome}, Endereco: ${endereco.rua} n. ${endereco.numero}, Telefone: (${telefone.ddd}) ${telefone.numero}`);
        });
    });
});