/* ================== VARIÁVEIS GLOBAIS ================== */
let nivelFonte = 0;
const minFonte = 0;
const maxFonte = 20;
const tamanhoBase = 18;

let nivelBrilho = 0;
const niveisBrilho = [40, 70, 110, 160];

let idiomaAtual = "pt";

// Cadastros
const pessoasCadastradas = [
    { nome: "João Silva", data: "10/02/2026", hora: "09:30", leuTudo: true },
    { nome: "Maria Souza", data: "10/02/2026", hora: "10:15", leuTudo: false },
    { nome: "Thiago Carbone", data: "10/02/2026", hora: "11:00", leuTudo: true }
];
let backupCadastros = [];
let cadastrosAntigos = [];

/* ================== LOGIN ================== */
document.getElementById("entrar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome) {
        alert(traduzir("Por favor, digite seu nome!"));
        return;
    }

    if (senha.toLowerCase() !== "plantas") {
        alert(traduzir("Nome ou senha incorretos!"));
        return;
    }

    document.getElementById("capa").style.display = "none";
    document.getElementById("site").style.display = "block";
    mostrarSecao("industria");
});

/* ================== TRADUÇÃO DE ALERTAS ================== */
function traduzir(texto) {
    const traducoes = {
        "Por favor, digite seu nome!": { en: "Please enter your name!", es: "¡Por favor, ingresa tu nombre!" },
        "Nome ou senha incorretos!": { en: "Incorrect name or password!", es: "¡Nombre o contraseña incorrectos!" },
        "Ative o modo escuro primeiro": { en: "Enable dark mode first", es: "Activa el modo oscuro primero" },
        "Deseja apagar todos os cadastros?": { en: "Do you want to delete all records?", es: "¿Desea eliminar todos los registros?" },
        "Nenhum cadastro para recuperar!": { en: "No records to recover!", es: "¡No hay registros para recuperar!" }
    };
    return traducoes[texto]?.[idiomaAtual] || texto;
}

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

    nivelFonte = 0;
    nivelBrilho = 0;
    aplicarFonteGlobal();

    document.body.classList.remove("escuro", "brilho-verde");
    document.body.style.removeProperty("--brilho");
}

/* ================== CONTROLE DE FONTE ================== */
function aplicarFonteGlobal() {
    document.documentElement.style.fontSize = (tamanhoBase + nivelFonte) + "px";
    const indicador = document.getElementById("nivelFonteTexto");
    if (indicador) indicador.innerText = nivelFonte + "%";
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
    if (!document.body.classList.contains("escuro")) {
        document.body.classList.remove("brilho-verde");
        nivelBrilho = 0;
        document.body.style.removeProperty("--brilho");
    }
}

function mudarCorModoEscuro() {
    if (!document.body.classList.contains("escuro")) {
        alert(traduzir("Ative o modo escuro primeiro"));
        return;
    }
    document.body.classList.add("brilho-verde");
    nivelBrilho = (nivelBrilho + 1) % niveisBrilho.length;
    document.body.style.setProperty("--brilho", niveisBrilho[nivelBrilho] + "px");
}

/* ================== MOSTRAR TEXTO ================== */
function mostrarTexto(id) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

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

/* ================== CADASTROS ================== */
function mostrarCadastros() {
    const quadro = document.getElementById("quadro-cadastro");
    const lista = document.getElementById("lista-cadastros");

    quadro.classList.remove("oculto");
    lista.innerHTML = "";

    if (pessoasCadastradas.length === 0) {
        lista.innerHTML = `<div class="frase-parabens">Você tem que criar um cadastro na capa inicial</div>`;
        return;
    }

    pessoasCadastradas.forEach(pessoa => {
        const div = document.createElement("div");
        div.className = "linha-caderno";
        div.innerHTML = `
            <strong>Nome:</strong> ${pessoa.nome}<br>
            <strong>Dia:</strong> ${pessoa.data}<br>
            <strong>Hora:</strong> ${pessoa.hora}<br>
            <strong>Leitura:</strong> ${pessoa.leuTudo ? "Leu tudo" : "Não concluiu"}
        `;
        lista.appendChild(div);

        if (pessoa.leuTudo) {
            const parabens = document.createElement("div");
            parabens.className = "frase-parabens";
            parabens.innerText = " Parabéns meu nobre guerreiro! Você é muito estudioso e dedicado. Continue lendo!";
            lista.appendChild(parabens);
        }
    });
}

function apagarTodosCadastros() {
    if (!confirm(traduzir("Deseja apagar todos os cadastros?"))) return;

    backupCadastros = [...pessoasCadastradas];
    pessoasCadastradas.length = 0;

    document.getElementById("lista-cadastros").innerHTML =
        `<div class="frase-parabens">Você tem que criar um cadastro na capa inicial</div>`;
}

function recuperarCadastros() {
    if (backupCadastros.length === 0) {
        alert(traduzir("Nenhum cadastro para recuperar!"));
        return;
    }

    pessoasCadastradas.length = 0;
    backupCadastros.forEach(p => pessoasCadastradas.push(p));
    mostrarCadastros();
}

/* ================== CADASTROS COM LOCALSTORAGE ================== */
function atualizarLista() {
    const lista = document.getElementById('lista-cadastros');
    lista.innerHTML = '';
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    if (cadastros.length === 0) {
        document.getElementById('mensagem-cadastro').innerHTML = `
            Você tem que criar um cadastro na capa inicial.<br>
            <button onclick="irCriarCadastro()" style="
                background:#2e7d32;
                color:#fff;
                border:none;
                border-radius:8px;
                padding:6px 12px;
                font-size:12px;
                cursor:pointer;
                margin-top:5px;
            ">Ir criar um cadastro</button>
        `;
    } else {
        cadastros.forEach((c, i) => {
            const div = document.createElement('div');
            div.textContent = `${i+1}. ${c}`;
            lista.appendChild(div);
        });
        document.getElementById('mensagem-cadastro').innerHTML = '';
    }
}

function apagarCadastros() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    if(cadastros.length > 0) cadastrosAntigos = [...cadastros];
    localStorage.removeItem('cadastros');
    atualizarLista();
}

function recuperarCadastrosAntigos() {
    if (cadastrosAntigos.length === 0) {
        alert("Nenhum cadastro antigo para recuperar!");
        return;
    }
    localStorage.setItem('cadastros', JSON.stringify(cadastrosAntigos));
    atualizarLista();
    document.getElementById('mensagem-cadastro').textContent = "Tá aqui seu cadastro antigo recuperado!";
}

function irCriarCadastro() {
    alert("Você será levado à capa inicial para criar um novo cadastro.");
    window.location.href = "capa-inicial.html"; // ajuste para sua página real
}

/* ================== IDIOMAS ================== */
function abrirIdiomas() {
    document.getElementById("quadro-idioma").classList.toggle("oculto");
}

function mudarIdioma(idioma) {
    idiomaAtual = idioma;

    document.querySelectorAll("[data-pt]").forEach(el => {
        el.innerHTML = el.dataset[idioma];
    });

    const frase = document.getElementById("frase-idioma");
    const frases = {
        pt: "Você voltou para o português. Continue lendo tudo que quiser, fique à vontade!",
        en: "You have switched the site to English. Feel free to read everything!",
        es: "Has cambiado el sitio al español. Puedes leer todo con tranquilidad."
    };
    frase.innerText = frases[idioma];
}
