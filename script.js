// ================== VARIÁVEIS GLOBAIS ==================
let nivelFonte = 0;          // controle do tamanho da fonte (0 a 20)
const maxNivel = 20;
const tamanhoBase = 16;      // tamanho normal
const passoFonte = 2;        // quanto cresce por clique

let nivelBrilho = 0;
const niveisBrilho = [40, 70, 110, 160]; // fraco → médio → forte → super

// ================== LOGIN E BOAS-VINDAS ==================
document.getElementById('entrar').addEventListener('click', function () {
    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (nome === "") {
        alert('Por favor, digite seu nome!');
        return;
    }

    if (senha.toLowerCase() !== "plantas") {
        alert("Nome ou senha incorretos. Tente novamente!");
        return;
    }

    document.getElementById('capa').style.display = 'none';
    document.getElementById('site').style.display = 'block';
});

// ================== MOSTRAR SEÇÃO ==================
function mostrarSecao(id) {
    document.querySelectorAll('.conteudo').forEach(secao => {
        secao.style.display = 'none';
    });

    const ativa = document.getElementById(id);
    if (ativa) ativa.style.display = 'block';
}

// ================== VOLTAR AO LOGIN ==================
function voltarLogin() {
    document.getElementById('site').style.display = 'none';
    document.getElementById('capa').style.display = 'flex';
    nivelBrilho = 0;
    document.body.style.removeProperty('--brilho');
    nivelFonte = 0;
    aplicarFonte();
}

// ================== MODO CLARO / ESCURO ==================
function alternarTema() {
    document.body.classList.toggle('escuro');
    if (!document.body.classList.contains('escuro')) {
        document.body.classList.remove('brilho-verde');
        nivelBrilho = 0;
        document.body.style.removeProperty('--brilho');
    }
}

// ================== CONTROLE DE FONTE ==================
function aumentarFonte() {
    if (nivelFonte < maxNivel) {
        nivelFonte++;
        aplicarFonte();
    }
}

function diminuirFonte() {
    if (nivelFonte > 0) {
        nivelFonte--;
        aplicarFonte();
    }
}

function aplicarFonte() {
    const novoTamanho = tamanhoBase + (nivelFonte * passoFonte);
    document.querySelectorAll('.conteudo, body').forEach(el => {
        el.style.fontSize = novoTamanho + 'px';
    });
}

// ================== BRILHO VERDE PROGRESSIVO ==================
function mudarCorModoEscuro() {
    if (!document.body.classList.contains('escuro')) {
        alert("Ative o modo escuro primeiro 🌙");
        return;
    }
    document.body.classList.add('brilho-verde');
    nivelBrilho++;
    if (nivelBrilho >= niveisBrilho.length) {
        nivelBrilho = 0;
    }
    document.body.style.setProperty('--brilho', niveisBrilho[nivelBrilho] + 'px');
}

// ================== MOSTRAR TEXTO DE VAGAR ==================
function mostrarTexto(id) {
    const elemento = document.getElementById(id);

    if (!elemento) return;

    // Se for uma lista (ul)
    if (elemento.tagName.toLowerCase() === 'ul') {
        const itens = Array.from(elemento.querySelectorAll('li'));
        elemento.style.display = 'block';
        itens.forEach(item => item.style.display = 'none');

        let i = 0;
        const interval = setInterval(() => {
            if (i >= itens.length) {
                clearInterval(interval);
                return;
            }
            itens[i].style.display = 'list-item';
            i++;
        }, 400); // intervalo de 400ms entre cada item
    } 
    // Se for parágrafo normal
    else {
        const texto = elemento.innerHTML;
        elemento.innerHTML = '';
        elemento.style.display = 'block';
        let i = 0;
        const interval = setInterval(() => {
            if (i >= texto.length) {
                clearInterval(interval);
                return;
            }
            elemento.innerHTML += texto.charAt(i);
            i++;
        }, 25); // 25ms por letra
    }
}
