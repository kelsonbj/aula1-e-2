/* =====================================================
   SCRIPT DO PROJECTO CONFORTO
   Este ficheiro não muda o visual. Ele só liga e desliga
   classes CSS no momento certo; quem faz o movimento é o
   animacoes.css. Cada bloco abaixo é independente.
   ===================================================== */

/* Avisa o CSS que o JavaScript está a funcionar.
   Isto corre logo, antes da página aparecer, para não piscar.
   Sem JavaScript, nada fica escondido. */
document.documentElement.classList.add("js");

/* Espera a página carregar toda antes de procurar elementos nela */
document.addEventListener("DOMContentLoaded", () => {

    /* O utilizador pediu menos movimento no sistema? Então não animamos. */
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- 1. Elementos que aparecem ao rolar a página ---------- */

    /* Lista de: [seletor do elemento, direção de entrada, atraso entre irmãos em segundos]
       Para animar mais coisas, é só acrescentar uma linha aqui. */
    const paraRevelar = [
        ["#conteudo2",              "da-esquerda", 0],
        [".produto",                "",            0.15],  /* cada cartão entra 0.15s depois do anterior */
        ["#visual > div:first-child","da-esquerda", 0],
        ["#texto",                  "da-direita",  0],
        ["footer",                  "",            0]
    ];

    const elementos = [];

    paraRevelar.forEach(([seletor, direcao, atraso]) => {
        document.querySelectorAll(seletor).forEach((elemento, indice) => {
            elemento.classList.add("reveal");
            if (direcao) {
                elemento.classList.add(direcao);
            }
            elemento.style.setProperty("--atraso", (indice * atraso) + "s");
            elementos.push(elemento);
        });
    });

    /* Mostra o elemento: o CSS faz a animação quando a classe "visivel" aparece */
    const mostrar = (elemento) => elemento.classList.add("visivel");

    if (reduzirMovimento || !("IntersectionObserver" in window)) {
        /* sem suporte ou sem animação: mostra tudo já */
        elementos.forEach(mostrar);
    } else {
        /* O "observador" avisa quando um elemento entra no ecrã */
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    mostrar(entrada.target);
                    observador.unobserve(entrada.target); /* anima só uma vez */
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        elementos.forEach((elemento) => observador.observe(elemento));
    }


    /* ---------- 2. Barra de progresso no topo ---------- */

    const barra = document.createElement("div");
    barra.id = "barra-progresso";
    document.body.appendChild(barra);


    /* ---------- 3. Botão "voltar ao topo" ---------- */

    const botaoTopo = document.createElement("button");
    botaoTopo.id = "voltar-topo";
    botaoTopo.type = "button";
    botaoTopo.textContent = "↑";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(botaoTopo);

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
    });


    /* ---------- 4. O que acontece enquanto a página rola ---------- */

    const aoRolar = () => {
        const rolado = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;

        /* largura da barra = percentagem já percorrida da página */
        barra.style.width = (total > 0 ? (rolado / total) * 100 : 0) + "%";

        /* o botão só aparece depois de rolar 400px */
        botaoTopo.classList.toggle("mostrar", rolado > 400);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar(); /* corre uma vez no início */


    /* ---------- 5. Ondinha ao clicar nos botões ---------- */

    if (!reduzirMovimento) {
        document.querySelectorAll("button").forEach((botao) => {
            botao.addEventListener("click", (evento) => {
                const caixa = botao.getBoundingClientRect();
                const ondinha = document.createElement("span");

                ondinha.className = "ondinha";
                /* centra o círculo (40px) no ponto onde se clicou */
                ondinha.style.left = (evento.clientX - caixa.left - 20) + "px";
                ondinha.style.top = (evento.clientY - caixa.top - 20) + "px";

                botao.appendChild(ondinha);
                ondinha.addEventListener("animationend", () => ondinha.remove());
            });
        });
    }
});

/* =====================================================
   SCRIPT DO PROJECTO CONFORTO
   Este ficheiro não muda o visual. Ele só liga e desliga
   classes CSS no momento certo; quem faz o movimento é o
   animacoes.css. Cada bloco abaixo é independente.
   ===================================================== */

/* Avisa o CSS que o JavaScript está a funcionar.
   Isto corre logo, antes da página aparecer, para não piscar.
   Sem JavaScript, nada fica escondido. */
document.documentElement.classList.add("js");

/* Espera a página carregar toda antes de procurar elementos nela */
document.addEventListener("DOMContentLoaded", () => {

    /* O utilizador pediu menos movimento no sistema? Então não animamos. */
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- 1. Elementos que aparecem ao rolar a página ---------- */

    /* Lista de: [seletor do elemento, direção de entrada, atraso entre irmãos em segundos]
       Para animar mais coisas, é só acrescentar uma linha aqui. */
    const paraRevelar = [
        ["#conteudo2",              "da-esquerda", 0],
        [".produto",                "",            0.15],  /* cada cartão entra 0.15s depois do anterior */
        ["#visual > div:first-child","da-esquerda", 0],
        ["#texto",                  "da-direita",  0],
        [".carrossel",              "da-esquerda", 0.2], /* página de login */
        ["#dados",                  "da-direita",  0],   /* página de login */
        ["footer",                  "",            0]
    ];

    const elementos = [];

    paraRevelar.forEach(([seletor, direcao, atraso]) => {
        document.querySelectorAll(seletor).forEach((elemento, indice) => {
            elemento.classList.add("reveal");
            if (direcao) {
                elemento.classList.add(direcao);
            }
            elemento.style.setProperty("--atraso", (indice * atraso) + "s");
            elementos.push(elemento);
        });
    });

    /* Mostra o elemento: o CSS faz a animação quando a classe "visivel" aparece */
    const mostrar = (elemento) => elemento.classList.add("visivel");

    if (reduzirMovimento || !("IntersectionObserver" in window)) {
        /* sem suporte ou sem animação: mostra tudo já */
        elementos.forEach(mostrar);
    } else {
        /* O "observador" avisa quando um elemento entra no ecrã */
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    mostrar(entrada.target);
                    observador.unobserve(entrada.target); /* anima só uma vez */
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        elementos.forEach((elemento) => observador.observe(elemento));
    }


    /* ---------- 2. Barra de progresso no topo ---------- */

    const barra = document.createElement("div");
    barra.id = "barra-progresso";
    document.body.appendChild(barra);


    /* ---------- 3. Botão "voltar ao topo" ---------- */

    const botaoTopo = document.createElement("button");
    botaoTopo.id = "voltar-topo";
    botaoTopo.type = "button";
    botaoTopo.textContent = "↑";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(botaoTopo);

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
    });


    /* ---------- 4. O que acontece enquanto a página rola ---------- */

    const aoRolar = () => {
        const rolado = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;

        /* largura da barra = percentagem já percorrida da página */
        barra.style.width = (total > 0 ? (rolado / total) * 100 : 0) + "%";

        /* o botão só aparece depois de rolar 400px */
        botaoTopo.classList.toggle("mostrar", rolado > 400);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar(); /* corre uma vez no início */


    /* ---------- 5. Ondinha ao clicar nos botões ---------- */

    if (!reduzirMovimento) {
        document.querySelectorAll("button").forEach((botao) => {
            botao.addEventListener("click", (evento) => {
                const caixa = botao.getBoundingClientRect();
                const ondinha = document.createElement("span");

                ondinha.className = "ondinha";
                /* centra o círculo (40px) no ponto onde se clicou */
                ondinha.style.left = (evento.clientX - caixa.left - 20) + "px";
                ondinha.style.top = (evento.clientY - caixa.top - 20) + "px";

                botao.appendChild(ondinha);
                ondinha.addEventListener("animationend", () => ondinha.remove());
            });
        });
    }
});

/* =====================================================
   SCRIPT DO PROJECTO CONFORTO
   Este ficheiro não muda o visual. Ele só liga e desliga
   classes CSS no momento certo; quem faz o movimento é o
   animacoes.css. Cada bloco abaixo é independente.
   ===================================================== */

/* Avisa o CSS que o JavaScript está a funcionar.
   Isto corre logo, antes da página aparecer, para não piscar.
   Sem JavaScript, nada fica escondido. */
document.documentElement.classList.add("js");

/* Espera a página carregar toda antes de procurar elementos nela */
document.addEventListener("DOMContentLoaded", () => {

    /* O utilizador pediu menos movimento no sistema? Então não animamos. */
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- 1. Elementos que aparecem ao rolar a página ---------- */

    /* Lista de: [seletor do elemento, direção de entrada, atraso entre irmãos em segundos]
       Para animar mais coisas, é só acrescentar uma linha aqui. */
    const paraRevelar = [
        ["#conteudo2",              "da-esquerda", 0],
        [".produto",                "",            0.15],  /* cada cartão entra 0.15s depois do anterior */
        ["#visual > div:first-child","da-esquerda", 0],
        ["#texto",                  "da-direita",  0],
        [".carrossel",              "da-esquerda", 0.2], /* página de login */
        ["#dados",                  "da-direita",  0],   /* página de login */
        [".card",                   "",            0.1], /* página da loja */
        ["footer",                  "",            0]
    ];

    const elementos = [];

    paraRevelar.forEach(([seletor, direcao, atraso]) => {
        document.querySelectorAll(seletor).forEach((elemento, indice) => {
            elemento.classList.add("reveal");
            if (direcao) {
                elemento.classList.add(direcao);
            }
            elemento.style.setProperty("--atraso", (indice * atraso) + "s");
            elementos.push(elemento);
        });
    });

    /* Mostra o elemento: o CSS faz a animação quando a classe "visivel" aparece */
    const mostrar = (elemento) => elemento.classList.add("visivel");

    if (reduzirMovimento || !("IntersectionObserver" in window)) {
        /* sem suporte ou sem animação: mostra tudo já */
        elementos.forEach(mostrar);
    } else {
        /* O "observador" avisa quando um elemento entra no ecrã */
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    mostrar(entrada.target);
                    observador.unobserve(entrada.target); /* anima só uma vez */
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        elementos.forEach((elemento) => observador.observe(elemento));
    }


    /* ---------- 2. Barra de progresso no topo ---------- */

    const barra = document.createElement("div");
    barra.id = "barra-progresso";
    document.body.appendChild(barra);


    /* ---------- 3. Botão "voltar ao topo" ---------- */

    const botaoTopo = document.createElement("button");
    botaoTopo.id = "voltar-topo";
    botaoTopo.type = "button";
    botaoTopo.textContent = "↑";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(botaoTopo);

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
    });


    /* ---------- 4. O que acontece enquanto a página rola ---------- */

    const aoRolar = () => {
        const rolado = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;

        /* largura da barra = percentagem já percorrida da página */
        barra.style.width = (total > 0 ? (rolado / total) * 100 : 0) + "%";

        /* o botão só aparece depois de rolar 400px */
        botaoTopo.classList.toggle("mostrar", rolado > 400);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar(); /* corre uma vez no início */


    /* ---------- 5. Ondinha ao clicar nos botões ---------- */

    if (!reduzirMovimento) {
        document.querySelectorAll("button").forEach((botao) => {
            botao.addEventListener("click", (evento) => {
                const caixa = botao.getBoundingClientRect();
                const ondinha = document.createElement("span");

                ondinha.className = "ondinha";
                /* centra o círculo (40px) no ponto onde se clicou */
                ondinha.style.left = (evento.clientX - caixa.left - 20) + "px";
                ondinha.style.top = (evento.clientY - caixa.top - 20) + "px";

                botao.appendChild(ondinha);
                ondinha.addEventListener("animationend", () => ondinha.remove());
            });
        });
    }
});