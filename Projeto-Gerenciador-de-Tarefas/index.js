let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = String(data.getFullYear());
let dataCriacao = `${dia}/${mes}/${ano}`;

let itemLista = [
    { id: 1, descricao: 'Correr', tipoDaTarefa: 'Atividade fisica', checked: false },
    { id: 2, descricao: 'Cafe da manha', tipoDaTarefa: 'Alimentação', checked: false },
    { id: 3, descricao: 'Desenvolver', tipoDaTarefa: 'Trabalho', checked: false },

]

const criarItemNaLista = (lista, checkbox) => {
    const tarefa = document.getElementById('listaTarefas');
    const pendente = document.createElement('li');
    const botao = document.createElement('button');
    botao.textContent = "Concluir";

    pendente.id = lista.id;
    pendente.appendChild(checkbox);
    pendente.appendChild(botao);

    tarefa.appendChild(pendente);
}

const checkboxInput = ({ id, descricao, tipoDaTarefa, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const label2 = document.createElement('label');
    const agrupar = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;

    label.textContent = descricao;
    label.htmlFor = checkboxId;
    label2.textContent = tipoDaTarefa + ' Criado em: ' + dataCriacao;
    label2.htmlFor = itemLista.tipoDaTarefa;
    agrupar.className = 'checkbox-label-container';

    agrupar.appendChild(label);
    agrupar.appendChild(label2);

    return agrupar;
}

const novaTarefaId = () => {
    const ultimoId = itemLista[itemLista.length - 1]?.id;
    return ultimoId ? ultimoId + 1 : 1;
}

const getnovaTarefaData = (event) => {
    const descricaoTarefa = document.getElementById('descricao').value;
    const descricaoEtiqueta = document.getElementById('etiqueta').value;
    const id = novaTarefaId();

    return { descricaoTarefa, descricaoEtiqueta, id };
}

const criarTarefa = (event) => {
    event.preventDefault();
    const novaTarefaData = getnovaTarefaData(event);
    const { id, descricaoTarefa, descricaoEtiqueta } = novaTarefaData;

    const checkbox = checkboxInput(novaTarefaData);
    criarItemNaLista(novaTarefaData, checkbox);

    itemLista = [
        ...itemLista,
        {id: novaTarefaData.id, descricao: novaTarefaData.descricao, tipoDaTarefa: novaTarefaData.descricao, checked: false}
    ]
}

window.onload = function () {
    const form = document.getElementById('cadastraTarefas');
    form.addEventListener('submit', criarTarefa)

    itemLista.forEach((lista) => {

        const checkbox = checkboxInput(lista);
        criarItemNaLista(lista, checkbox);
    });
}