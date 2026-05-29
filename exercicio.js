const prompt = require('prompt-sync')();

class Companhia {
    constructor(nome) {
        this.nome = nome;
        this.trechos = [];
    }
}

class Trecho {
    constructor(companhia, origem, destino, valor) {
        this.companhia = companhia;
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
}

class Sistema {
    constructor() {
        this.companhias = [];
        this.trechos = [];
    }

    pausar() {
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

    // COMPANHIAS
    cadastrarCompanhia(nome){
        const companhia = new Companhia(nome);
        this.companhias.push(companhia);      
        console.log(`Companhia ${nome} cadastrada com sucesso`)
    }
    listarCompanhias()
    {
        if (this.companhias.length === 0) {
            console.log("\n Nenhuma companhia cadastrada.");
          
        }
        else{
            for ( let indice = 0; indice < this.companhias.length; indice++){
                console.log(`[${indice}] ${this.companhias[indice].nome}`)
            }
        }
    }
    editarCompanhia(id, novoNome)
    {
        if  (this.companhias[id]){ 
            this.companhias[id].nome = novoNome;
            console.log(`\n Companhia ${novoNome} editada com sucesso!`);
        }
        else{
            console.log("\n Companhia não cadastrada!");
        }
    }

    excluirCompanhia(id)
    {
        if(this.companhias[id]){ 
            this.companhias.splice(id, 1);
            console.log("Companhia excluída com sucesso!")
        }
    }

    // TRECHOS
    cadastrarTrecho(idCompanhia, origem, destino, valor){

    }
    listarTrechos(){

    }
    listarTrechosPorCompanhia(){ 

    }
    editarTrecho(id, origem, destino, valor){

    }
    excluirTrecho(id) { 

    }
}

// -------------------------------------------

const sistema = new Sistema();
let opcao = -1;

console.clear();
console.log("\n===========================================");
console.log("    BEM-VINDO AO SISTEMA DE PASSAGENS      ");
console.log("===========================================");

while (opcao !== 0) {
    console.log("\n---- MENU ----");
    console.log("1 - Gerenciar Companhias");
    console.log("2 - Gerenciar Trechos");
    console.log("3 - Visualizar Trechos");
    console.log("0 - Sair");
    console.log("-------------------------\n");

    opcao = parseInt(prompt("Escolha uma opção: "));

    switch (opcao) {

        case 1:
            console.log("\n---- COMPANHIAS ----");
            console.log("1 - Cadastrar");
            console.log("2 - Listar");
            console.log("3 - Editar");
            console.log("4 - Excluir");
            const opcaoCompanhia = parseInt(prompt("Escolha: "));

            switch (opcaoCompanhia) {
                case 1:
                    const nomeCompanhia = prompt("Nome da companhia: ");
                    sistema.cadastrarCompanhia(nomeCompanhia);
                    break;
                case 2:
                    sistema.listarCompanhias();
                    break;
                case 3:
                    sistema.listarCompanhias();
                    if (sistema.companhias.length > 0) {
                        const idCompanhiaEditar = parseInt(prompt("ID da companhia para editar: "));
                        const novoNomeCompanhia = prompt("Novo nome: ");
                        sistema.editarCompanhia(idCompanhiaEditar, novoNomeCompanhia);
                    }
                    break;
                case 4:
                    sistema.listarCompanhias();
                    if (sistema.companhias.length > 0) {
                        const idCompanhiaExcluir = parseInt(prompt("ID da companhia para excluir: "));
                        sistema.excluirCompanhia(idCompanhiaExcluir);
                    }
                    break;
            }
            sistema.pausar();
            break;

        case 2:
            console.log("\n---- TRECHOS ----");
            console.log("1 - Cadastrar");
            console.log("2 - Editar");
            console.log("3 - Excluir");
            const opcaoTrecho = parseInt(prompt("Escolha: "));

            switch (opcaoTrecho) {
                case 1:
                    if (sistema.companhias.length === 0) {
                        console.log("\n⚠️ Cadastre uma companhia antes de adicionar trechos.");
                    } else {
                        sistema.listarCompanhias();
                        const idCompanhiaTrecho = parseInt(prompt("ID da companhia: "));
                        const origemTrecho = prompt("Cidade de origem: ");
                        const destinoTrecho = prompt("Cidade de destino: ");
                        const valorTrecho = parseFloat(prompt("Valor do trecho: R$ "));
                        sistema.cadastrarTrecho(idCompanhiaTrecho, origemTrecho, destinoTrecho, valorTrecho);
                    }
                    break;
                case 2:
                    sistema.listarTrechos();
                    if (sistema.trechos.length > 0) {
                        const idTrechoEditar = parseInt(prompt("ID do trecho para editar: "));
                        const novaOrigem = prompt("Nova origem: ");
                        const novoDestino = prompt("Novo destino: ");
                        const novoValor = parseFloat(prompt("Novo valor: R$ "));
                        sistema.editarTrecho(idTrechoEditar, novaOrigem, novoDestino, novoValor);
                    }
                    break;
                case 3:
                    sistema.listarTrechos();
                    if (sistema.trechos.length > 0) {
                        const idTrechoExcluir = parseInt(prompt("ID do trecho para excluir: "));
                        sistema.excluirTrecho(idTrechoExcluir);
                    }
                    break;
            }
            sistema.pausar();
            break;

        case 3:
            console.log("\n---- VISUALIZAR ----");
            console.log("1 - Todos os trechos");
            console.log("2 - Por companhia");
            const opcaoVisualizacao = parseInt(prompt("Escolha: "));

            if (opcaoVisualizacao === 1) sistema.listarTrechos();
            else if (opcaoVisualizacao === 2) sistema.listarTrechosPorCompanhia();

            sistema.pausar();
            break;

        case 0:
            console.log("\nFinalizando o sistema... Até logo!\n");
            break;

        default:
            console.log("\n⚠️ Opção inválida! Tente novamente.");
            sistema.pausar();
            break;
    }
}