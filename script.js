/* ================== VARIÁVEIS GLOBAIS ================== */
let nivelFonte = 0;
const minFonte = 0;
const maxFonte = 20;
const tamanhoBase = 18;

let nivelBrilho = 0;
const niveisBrilho = [40, 70, 110, 160];

let idiomaAtual = "pt";

/* ================== BANCO DE DADOS ================== */
let banco = JSON.parse(localStorage.getItem("bancoUsuarios")) || [];
let backupBanco = [];

/* ================== LOGIN ================== */
document.getElementById("entrar").addEventListener("click", () => {

    const nome = document.getElementById("nome").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome) {
        alert("Por favor, digite seu nome!");
        return;
    }

    if (senha.toLowerCase() !== "plantas") {
        alert("Nome ou senha incorretos!");
        return;
    }

    const agora = new Date();

    const usuario = {
        nome: nome,
        data: agora.toLocaleDateString(),
        hora: agora.toLocaleTimeString(),
        leuTudo: true
    };

    banco.push(usuario);
    localStorage.setItem("bancoUsuarios", JSON.stringify(banco));

    document.getElementById("capa").style.display = "none";
    document.getElementById("site").style.display = "block";

    mostrarSecao("industria");
});

/* ================== NAVEGAÇÃO ================== */
function mostrarSecao(id) {
    document.querySelectorAll(".conteudo").forEach(secao => secao.style.display = "none");
    const ativa = document.getElementById(id);
    if (ativa) ativa.style.display = "block";
}

/* ================== VOLTAR AO LOGIN ================== */
function voltarLogin() {
    document.getElementById("site").style.display = "none";
    document.getElementById("capa").style.display = "flex";
}

/* ================== CONTROLE DE FONTE ================== */
function aplicarFonteGlobal() {
    document.documentElement.style.fontSize = (tamanhoBase + nivelFonte) + "px";
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

/* ================== TEMA ================== */
function alternarTema() {
    document.body.classList.toggle("escuro");
}

function mudarCorModoEscuro() {
    if (!document.body.classList.contains("escuro")) {
        alert("Ative o modo escuro primeiro");
        return;
    }

    nivelBrilho = (nivelBrilho + 1) % niveisBrilho.length;
    document.body.style.setProperty("--brilho", niveisBrilho[nivelBrilho] + "px");
}

/* ================== MOSTRAR TEXTO COM EFEITO ================== */
function mostrarTexto(id) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    const texto = elemento.dataset.original || elemento.innerHTML;
    elemento.dataset.original = texto;
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
    }, 20);
}

/* ================== MOSTRAR CADASTROS ================== */
function mostrarCadastros() {

    const quadro = document.getElementById("quadro-cadastro");
    const lista = document.getElementById("lista-cadastros");

    quadro.classList.remove("oculto");
    lista.innerHTML = "";

    if (banco.length === 0) {
        lista.innerHTML = "Você ainda não tem cadastros.";
        return;
    }

    banco.forEach(pessoa => {

        const div = document.createElement("div");
        div.style.background = "#f4f4f4";
        div.style.padding = "10px";
        div.style.margin = "6px 0";
        div.style.borderRadius = "8px";

        div.innerHTML = `
            <strong>Nome:</strong> ${pessoa.nome}<br>
            <strong>Dia:</strong> ${pessoa.data}<br>
            <strong>Hora:</strong> ${pessoa.hora}<br>
            <strong>Leitura:</strong> ${pessoa.leuTudo ? "Leu tudo" : "Não concluiu"}
        `;

        lista.appendChild(div);

        if (pessoa.leuTudo) {
            const parabens = document.createElement("div");
            parabens.style.color = "green";
            parabens.style.fontWeight = "bold";
            parabens.innerText = "Parabéns! Você é muito dedicado.";
            lista.appendChild(parabens);
        }
    });

    document.getElementById("mensagem-cadastro").innerText =
        "Total de Pessoas Cadastradas: " + banco.length;
}

/* ================== APAGAR CADASTROS ================== */
function apagarCadastros() {

    if (!confirm("Deseja apagar todos os cadastros?")) return;

    backupBanco = [...banco];

    banco = [];
    localStorage.removeItem("bancoUsuarios");

    mostrarCadastros();
}

/* ================== RECUPERAR CADASTROS ================== */
function recuperarCadastros() {

    if (backupBanco.length === 0) {
        alert("Nenhum cadastro para recuperar!");
        return;
    }

    banco = [...backupBanco];
    localStorage.setItem("bancoUsuarios", JSON.stringify(banco));

    mostrarCadastros();
}
// ==========================
// SALVAR NO MYSQL
// ==========================
async function salvarNoBanco(nome, senha) {
    await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, senha })
    });
}

// ==========================
// CARREGAR USUÁRIOS
// ==========================
async function carregarUsuarios() {

    const resposta = await fetch("http://localhost:3000/usuarios");
    const usuarios = await resposta.json();

    const lista = document.getElementById("lista-banco");
    lista.innerHTML = "";

    usuarios.forEach(user => {
        lista.innerHTML += `
            <div style="background:#f4f4f4; padding:10px; margin:8px 0; border-radius:8px;">
                <strong>ID:</strong> ${user.id}<br>
                <strong>Nome:</strong> ${user.nome}<br>
                <strong>Data:</strong> ${new Date(user.data_login).toLocaleString()}
            </div>
        `;
    });
}
