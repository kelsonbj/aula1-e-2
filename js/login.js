/* JavaScript para mostrar e ocultar a senha */

const botaoSenha = document.getElementById("mostrar-senha");
const campoSenha = document.getElementById("senha");
const formLogin = document.getElementById("form-login");

if (botaoSenha && campoSenha) {
  botaoSenha.addEventListener("click", () => {
    const estaOculta = campoSenha.type === "password";

    campoSenha.type = estaOculta ? "text" : "password";
    botaoSenha.textContent = estaOculta ? "Ocultar" : "Mostrar";
    botaoSenha.setAttribute("aria-pressed", String(estaOculta));
    botaoSenha.setAttribute(
      "aria-label",
      estaOculta ? "Ocultar senha" : "Mostrar senha"
    );
  });
}

// Demonstração: impede o envio sem um backend.
if (formLogin) {
  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    alert(
      "Formulário validado! Falta ligar o login ao sistema de autenticação."
    );
  });
}