const API_URL = 'https://dynamic-events-api.onrender.com/api';


async function listar() {
    try {
        let listaPosts = await fetch(API_URL);

        if (!listaPosts.ok) {
            throw new Error('Erro ao listar');
        }

        let listaPostsConvertido = await listaPosts.json();

        return listaPostsConvertido;
    } catch (error) {
        console.log(error);
    }
}

async function buscar(id) {
    try {
        let postBuscado = await fetch(`${API_URL}/${id}`);

        if (!postBuscado.ok) {
            throw new Error('Post não encontrado');
        }

        let postConvertido = await postBuscado.json();

        return postConvertido;
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
    const listaProgramas = document.getElementById('listaProgramas');

    const lista = await listar();

    lista.forEach(programa => {
        const card = document.createElement('article');
        card.classList.add('program-card');
        
        const divImagem = document.createElement('div');
        divImagem.classList.add('program-card__image-wrap');

        const img = document.createElement('img');
        img.classList.add('program-card__image');
        img.src = programa.imagem;
        img.alt = '';

        divImagem.appendChild(img);



    });
}