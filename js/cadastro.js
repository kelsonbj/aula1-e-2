/* =====================================================
   JAVASCRIPT DO CADASTRO
   1. Mostrar / ocultar as senhas
   2. Verificar se as duas senhas são iguais
   3. Impedir o envio (demonstração, ainda não há servidor)
   ===================================================== */

const formCadastro = document.getElementById("form-cadastro");
const campoSenha = document.getElementById("senha");
const campoConfirmar = document.getElementById("confirmar-senha");
const mensagem = document.getElementById("mensagem");


/* ---------- 1. Mostrar / ocultar senha ---------- */
/* Cada botão "Mostrar" sabe qual campo controla pelo atributo data-alvo do HTML */

document.querySelectorAll(".mostrar-senha").forEach((botao) => {
    const campo = document.getElementById(botao.dataset.alvo);

    if (!campo) {
        return; /* se o campo não existir, ignora este botão */
    }

    botao.addEventListener("click", () => {
        const estaOculta = campo.type === "password";

        campo.type = estaOculta ? "text" : "password";
        botao.textContent = estaOculta ? "Ocultar" : "Mostrar";
        botao.setAttribute("aria-pressed", String(estaOculta));
    });
});


/* ---------- 2. As senhas são iguais? ---------- */

function verificarSenhas() {
    if (!campoSenha || !campoConfirmar || !mensagem) {
        return;
    }

    const diferentes = campoConfirmar.value !== "" && campoSenha.value !== campoConfirmar.value;

    /* setCustomValidity bloqueia o envio e deixa o campo marcado como inválido */
    campoConfirmar.setCustomValidity(diferentes ? "As senhas não coincidem." : "");
    mensagem.textContent = diferentes ? "As senhas não coincidem." : "";
}

if (campoSenha && campoConfirmar) {
    campoSenha.addEventListener("input", verificarSenhas);
    campoConfirmar.addEventListener("input", verificarSenhas);
}


/* ---------- 3. Envio (demonstração) ---------- */
/* Este código só corre quando todos os campos já estão válidos. */

if (formCadastro) {
    formCadastro.addEventListener("submit", (evento) => {
        evento.preventDefault();

        alert("Cadastro validado! Falta ligar o cadastro a um sistema que guarde os dados.");
    });
}