const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    console.log("\n-------------------------------------------");
    prompt("Pressione ENTER para continuar...");
    console.clear();
}

function listarCompanhias() {
   const companhias = db.prepare('SELECT * FROM Companhia').all();
    
   if ( companhias.length === 0) {
       console.log("Nenhuma companhia cadastrada.")
       return []
   }

    console.log('\n--- COMPANHIAS ---')
    companhias.forEach(c => {
        console.log(`ID: ${c.id} | Nome: ${c.nome} | Fundação: ${c.anoFundacao}`)
        }
    )

    return companhias
}

function validarOuCadastrarCompanhia(idInformado) {
    let companhia = db.prepare('SELECT * FROM Companhias WHERE id = ?').get(idInformado);

    if (companhia) {
        return idInformado;
    }
        console.log('\nCompanhia não encontrada.');
        const resposta = prompt("Deseja cadastrar uma nova? (Sim/Não): ")
   
    if (resposta.toUpperCase() !== 'S') {
        return null;
    }
   

    const nome = prompt('Nome da companhia: ');
    const ano = parseInt(prompt('Ano de fundação: '));

    const resultado = db.prepare(
        'INSERT INTO Companhia (nome, anoFundacao) VALUES (?, ?)'
    ).run(nome, ano);

    console.log('\nCompanhia cadastrada com sucesso.');

    return resultado.lastInsertRowid;

}

// -------------------------------------------
// FUNÇÕES DE TRECHOS
// -------------------------------------------

function cadastrarTrecho() {
    // lista as companhias, pede o id da companhia
    listarCompanhias()
    const idCompanhia = parseInt(
        prompt('ID da companhia: ')
    );
    // valida ou cadastra a companhia
    const companhiaValida = validarOuCadastrarCompanhia(idCompanhia)
    if (!companhiaValida) 
    return
    // pede origem, destino, valor e numero de passagens
    const origem = prompt('Origem: ');
    const destino = prompt('Destino: ');
    const valor = parseFloat(prompt('Valor: '));
    const passagens = parseInt(
        prompt('Número de passagens: ')
    );

    db.prepare(`
        INSERT INTO Trecho
        (idCompanhia, origem, destino, valor, numPassagens)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        companhiaValida,
        origem,
        destino,
        valor,
        passagens
    );
    // insere o trecho no banco
    console.log('\nTrecho cadastrado com sucesso!');}

function listarTrechos() {
    // busca todos os trechos com JOIN na tabela Companhia
    const trechos = db.prepare(`
        SELECT t.*, c.nome AS companhia
        FROM Trecho t
        JOIN Companhia c
        ON t.idCompanhia = c.id
    `).all();

    console.log('\n--- TRECHOS ---');
    // exibe os dados de cada trecho no terminal
     trechos.forEach(t => {
        console.log(`
ID: ${t.id}
Companhia: ${t.companhia}
Origem: ${t.origem}
Destino: ${t.destino}
Valor: R$ ${t.valor}
Passagens: ${t.numPassagens}
-------------------------
`);
    });
}

function editarTrecho() {
    // lista os trechos, pede o id do trecho a editar
    listarTrechos();

    const id = parseInt(
        prompt('ID do trecho para editar: ')
    );
    // verifica se o trecho existe
    const trecho = db.prepare(
        'SELECT * FROM Trecho WHERE id = ?'
    ).get(id);

    if (!trecho) {
        console.log('\nTrecho não encontrado.');
        return;
    }
    // pede os novos dados e atualiza no banco
    const origem = prompt(`Origem (${trecho.origem}): `);
    const destino = prompt(`Destino (${trecho.destino}): `);
    const valor = parseFloat(
        prompt(`Valor (${trecho.valor}): `)
    );
    const passagens = parseInt(
        prompt(`Passagens (${trecho.numPassagens}): `)
    );

    db.prepare(`
        UPDATE Trecho
        SET origem = ?, destino = ?,
            valor = ?, numPassagens = ?
        WHERE id = ?
    `).run(
        origem,
        destino,
        valor,
        passagens,
        id
    );

    console.log('\nTrecho atualizado com sucesso!');
}

function excluirTrecho() {
    // lista os trechos, pede o id do trecho a excluir
    listarTrechos();

    const id = parseInt(
        prompt('ID do trecho para excluir: ')
    );

    // verifica se o trecho existe
    const trecho = db.prepare(
        'SELECT * FROM Trecho WHERE id = ?'
    ).get(id);

    if (!trecho) {
        console.log('\nTrecho não encontrado.');
        return;
    }
    // remove do banco
    db.prepare(
        'DELETE FROM Trecho WHERE id = ?'
    ).run(id);

    console.log('\nTrecho removido com sucesso.');
}

// -------------------------------------------
// FUNÇÕES DE CUPONS
// -------------------------------------------

function cadastrarCupom() {
    // lista as companhias, pede o id da companhia
    // valida ou cadastra a companhia
    // pede codigo, percentual de desconto e numero de cupons
    // insere o cupom no banco
}

function listarCupons() {
    // busca todos os cupons com JOIN na tabela Companhia
    // exibe os dados de cada cupom no terminal
}

function editarCupom() {
    // lista os cupons, pede o codigo do cupom a editar
    // verifica se o cupom existe
    // pede os novos dados e atualiza no banco
}

function excluirCupom() {
    // lista os cupons, pede o codigo do cupom a excluir
    // verifica se o cupom existe
    // remove do banco
}

// -------------------------------------------
// MENU PRINCIPAL
// -------------------------------------------

let opcao = -1;

console.clear();
console.log('\n===========================================');
console.log('   SISTEMA DE PASSAGENS - COMPANHIA        ');
console.log('===========================================');

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Gerenciar Trechos');
    console.log('2 - Gerenciar Cupons');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {

        case 1:
            console.log('\n---- TRECHOS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoTrecho = parseInt(prompt('Escolha: '));

            switch (opcaoTrecho) {
                case 1: cadastrarTrecho(); break;
                case 2: listarTrechos(); break;
                case 3: editarTrecho(); break;
                case 4: excluirTrecho(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 2:
            console.log('\n---- CUPONS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoCupom = parseInt(prompt('Escolha: '));

            switch (opcaoCupom) {
                case 1: cadastrarCupom(); break;
                case 2: listarCupons(); break;
                case 3: editarCupom(); break;
                case 4: excluirCupom(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 0:
            console.log('\nFinalizando o sistema... Ate logo!\n');
            break;

        default:
            console.log('\nOpcao invalida! Tente novamente.');
            pausar();
            break;
    }
}