const API_URL = 'https://dynamic-events-api.onrender.com/api';

const botoesFiltro = document.querySelectorAll('filtro');

let categoriaFiltro = '';

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(botao => {
            botao.classList.remove('ativo');
        });
        botao.classList.add('ativo');

        categoriaFiltro = botao.data-categoria.value;
    });
});

async function listar() {
    try {
        let listaCursos = await fetch(`${API_URL}/eventos`);

        if (!listaCursos.ok) {
            throw new Error('Erro ao listar');
        }

        let listaCursosConvertido = await listaCursos.json();

        return listaCursosConvertido;
    } catch (error) {
        console.log(error);
    }
}

async function buscar(id) {
    try {
        let cursoBuscado = await fetch(`${API_URL}/${id}`);

        if (!cursoBuscado.ok) {
            throw new Error('Curso não encontrado');
        }

        let cursoConvertido = await cursoBuscado.json();

        return cursoConvertido;
    } catch (error) {
        console.log(error);
    }
}

async function cadastrar(post) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao cadastrar');
    }

    const respostaConvertida = await resposta.json();

    return respostaConvertida;
}

async function atualizar(id, post) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao atualizar');
    }

    const respostaConvertida = await resposta.json();

    return respostaConvertida;
}

async function deletar(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error('Erro ao deletar');
    }

    if (resposta.status === 204) {
        return;
    }

    const texto = await resposta.text();

    if (!texto) {
        return;
    }

    return JSON.parse(texto);
}

async function carregarCursos() {
    const campoBusca = document.getElementById('campoBusca');

    const busca = campoBusca.value.toLowerCase();

    const listaProgramas = document.getElementById('listaProgramas');
    listaProgramas.innerHTML = '';  
    
    const lista = await listar();
    
    if (!lista) {
        return;
    }
    
    const listaDestaques = lista.filter(programa => programa.destaque == true);

    const listaNaoDestaques = lista.filter(programa => programa.destaque == false);

    const listaCompleta = listaDestaques.concat(listaNaoDestaques);

    const listaFiltrada = listaCompleta.filter(programa => programa.categoria.includes(categoriaFiltro));

    if (busca != "") {
        cons
    }

    listaFiltrada.forEach(programa => {
        const card = document.createElement('article');
        card.classList.add('program-card');
        

        const divImagem = document.createElement('div');
        divImagem.classList.add('program-card__image-wrap');

        divImagem.innerHTML = `
            <img class="program-card__image" src="${programa.imagem}">
        `;

        const divBody = document.createElement('div');
        divBody.classList.add('program-card__body');


        const divMeta = document.createElement('div');
        divMeta.classList.add('program-card__meta');

        
        const categoria = document.createElement('span');
        categoria.classList.add('badge');
        categoria.textContent = programa.categoria;
        

        divMeta.appendChild(categoria);

        
        if (programa.destaque == true) {
            const destaque = document.createElement('span');
            destaque.classList.add('badge');
            destaque.classList.add('badge--primary');
            destaque.textContent = 'Destaque';
            divMeta.appendChild(destaque);
        }

        divBody.appendChild(divMeta);

        
        const titulo = document.createElement('h3');
        titulo.textContent = programa.nome;
        divBody.appendChild(titulo);

        
        const descricao = document.createElement('p');
        descricao.textContent = programa.descricao;
        divBody.appendChild(descricao);


        const divDetails = document.createElement('div');
        divDetails.classList.add('program-card__details');


        const data = document.createElement('span');
        data.textContent = Date(Intl.DateTimeFormat('pt-BR', programa.data));

        divDetails.appendChild(data);


        const local = document.createElement('span');
        local.textContent = programa.local;


        divDetails.appendChild(local);

        divBody.appendChild(divDetails);


        const divFooter = document.createElement('div');
        divFooter.classList.add('program-card__footer');


        const preco = document.createElement('strong');
        preco.textContent = `R$ ${programa.preco}`;

        divFooter.appendChild(preco);


        const vagas = document.createElement('span');
        vagas.classList.add('vagas');
        if (programa.vagas_disponiveis < 10) {
            vagas.classList.add('vagas--baixas');
        } 
        vagas.textContent = `${Number(programa.vagas_disponiveis)} vagas disponíveis`;

        divFooter.appendChild(vagas);


        divBody.appendChild(divFooter);

        
        const btnDetalhes = document.createElement('a');

        btnDetalhes.addEventListener('click', () => {

        });

        btnDetalhes.classList.add('btn');
        btnDetalhes.classList.add('btn-outline');
        btnDetalhes.href = `detalhe.html?id=${programa.id}`;
        btnDetalhes.textContent = 'Ver detalhes';


        divBody.appendChild(btnDetalhes);

        listaProgramas.appendChild(divBody);
    });
}

carregarCursos();


