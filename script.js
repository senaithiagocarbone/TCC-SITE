/* ================== VARIÁVEIS GLOBAIS ================== */
let nivelFonte = 0;                 // 0 até 20
const minFonte = 0;
const maxFonte = 20;
const tamanhoBase = 18;             // tamanho base do site (px)

let nivelBrilho = 0;
const niveisBrilho = [40, 70, 110, 160];

/* ================== LOGIN ================== */
document.getElementById("entrar").addEventListener("click", function () {
    const nome = document.getElementById("nome").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (nome === "") {
        alert("Por favor, digite seu nome!");
        return;
    }

    if (senha.toLowerCase() !== "plantas") {
        alert("Nome ou senha incorretos!");
        return;
    }

    document.getElementById("capa").style.display = "none";
    document.getElementById("site").style.display = "block";

    mostrarSecao("industria");
});

/* ================== NAVEGAÇÃO ENTRE SEÇÕES ================== */
function mostrarSecao(id) {
    document.querySelectorAll(".conteudo").forEach(secao => {
        secao.style.display = "none";
    });

    const ativa = document.getElementById(id);
    if (ativa) ativa.style.display = "block";
}

/* ================== VOLTAR AO LOGIN ================== */
function voltarLogin() {
    document.getElementById("site").style.display = "none";
    document.getElementById("capa").style.display = "flex";

    nivelFonte = 0;
    nivelBrilho = 0;
    aplicarFonteGlobal();

    document.body.classList.remove("escuro", "brilho-verde");
    document.body.style.removeProperty("--brilho");
}

/* ================== CONTROLE GLOBAL DE FONTE (SITE TODO) ================== */
function aplicarFonteGlobal() {
    const novoTamanho = tamanhoBase + nivelFonte;
    document.documentElement.style.fontSize = novoTamanho + "px";

    const indicador = document.getElementById("nivelFonteTexto");
    if (indicador) indicador.innerText = nivelFonte;
}

function aumentarFonte() {
    if (nivelFonte < maxFonte) {
        nivelFonte++;
        aplicarFonteGlobal();
    }
}

function diminuirFonte() {
    if (nivelFonte > minFonte) {
        nivelFonte--;
        aplicarFonteGlobal();
    }
}

/* ================== MODO CLARO / ESCURO ================== */
function alternarTema() {
    document.body.classList.toggle("escuro");

    if (!document.body.classList.contains("escuro")) {
        document.body.classList.remove("brilho-verde");
        nivelBrilho = 0;
        document.body.style.removeProperty("--brilho");
    }
}

/* ================== BRILHO VERDE PROGRESSIVO ================== */
function mudarCorModoEscuro() {
    if (!document.body.classList.contains("escuro")) {
        alert("Ative o modo escuro primeiro 🌙");
        return;
    }

    document.body.classList.add("brilho-verde");
    nivelBrilho++;

    if (nivelBrilho >= niveisBrilho.length) {
        nivelBrilho = 0;
    }

    document.body.style.setProperty("--brilho", niveisBrilho[nivelBrilho] + "px");
}

/* ================== MOSTRAR TEXTO AOS POUCOS ================== */
function mostrarTexto(id) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    // Lista
    if (elemento.tagName.toLowerCase() === "ul") {
        const itens = Array.from(elemento.querySelectorAll("li"));
        elemento.style.display = "block";
        itens.forEach(item => item.style.display = "none");

        let i = 0;
        const intervalo = setInterval(() => {
            if (i >= itens.length) {
                clearInterval(intervalo);
                return;
            }
            itens[i].style.display = "list-item";
            i++;
        }, 400);
    }
    // Parágrafo
    else {
        const texto = elemento.innerHTML;
        elemento.innerHTML = "";
        elemento.style.display = "block";

        let i = 0;
        const intervalo = setInterval(() => {
            if (i >= texto.length) {
                clearInterval(intervalo);
                return;
            }
            elemento.innerHTML += texto.charAt(i);
            i++;
        }, 25);
    }
}
