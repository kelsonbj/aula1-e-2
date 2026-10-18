/* =====================================================
   JAVASCRIPT DA LOJA
   1. Pesquisa: esconde os produtos que não combinam com o que foi escrito
   2. Botão "Comprar": mostra um aviso (o carrinho ainda não existe)
   ===================================================== */

const formBusca = document.getElementById("busca");
const campoPesquisa = document.getElementById("pesquisa");
const cartoes = document.querySelectorAll(".card");
const semResultados = document.getElementById("sem-resultados");
const aviso = document.getElementById("aviso");


/* ---------- 1. Pesquisa ---------- */

/* Tira acentos e maiúsculas: "Cadeira" e "cadeira" e "cádeira" contam como iguais */
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function filtrar() {
    if (!campoPesquisa || !semResultados) {
        return;
    }

    const termo = normalizar(campoPesquisa.value);
    let visiveis = 0;

    cartoes.forEach((cartao) => {
        const nome = normalizar(cartao.querySelector("h3").textContent);
        const combina = nome.includes(termo);

        cartao.hidden = !combina; /* "hidden" esconde o cartão */

        if (combina) {
            visiveis++;
        }
    });

    /* se nenhum cartão combina, mostra a mensagem */
    semResultados.hidden = visiveis > 0;
}

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", filtrar); /* filtra enquanto escreve */
}

if (formBusca) {
    formBusca.addEventListener("submit", (evento) => {
        evento.preventDefault(); /* não recarrega a página */
        filtrar();
    });
}


/* ---------- 2. Botão "Comprar" ---------- */
/* Por enquanto só mostra um aviso: ainda não há carrinho nem servidor. */

let temporizador;

function mostrarAviso(texto) {
    if (!aviso) {
        return;
    }

    aviso.textContent = texto;
    aviso.classList.add("mostrar");

    clearTimeout(temporizador); /* se clicar de novo, reinicia a contagem */
    temporizador = setTimeout(() => aviso.classList.remove("mostrar"), 2500);
}

document.querySelectorAll(".comprar").forEach((botao) => {
    botao.addEventListener("click", () => {
        const cartao = botao.closest(".card");
        const nome = cartao.querySelector("h3").textContent;

        mostrarAviso(nome + " adicionado ao carrinho.");
    });
});