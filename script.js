
// ================= LOGIN =================
document.getElementById('entrar').addEventListener('click', function () {
    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // senha correta
    if (nome !== "" && senha.toLowerCase() === "plantas") {
        document.getElementById('capa').style.display = "none";
        document.getElementById('site').style.display = "block";
    } else {
        alert("Nome ou senha incorretos. Tente novamente!");
    }
});

// ================= MOSTRAR SEÇÃO =================
function mostrarSecao(id) {
    const secoes = document.querySelectorAll('.conteudo');

    // esconde todas
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    // mostra somente a clicada
    const ativa = document.getElementById(id);
    if (ativa) {
        ativa.style.display = 'block';
    }
}

// ================= MODO ESCURO / CLARO =================
function alternarTema() {
    document.body.classList.toggle('escuro');
}

// ================= CONTROLE DE TAMANHO DA FONTE =================
let tamanhoFonte = 18;

function alterarFonte(valor) {
    tamanhoFonte += valor;

    if (tamanhoFonte < 12) tamanhoFonte = 12;
    if (tamanhoFonte > 40) tamanhoFonte = 40;

    document.querySelectorAll('.conteudo').forEach(conteudo => {
        conteudo.style.fontSize = tamanhoFonte + 'px';
    });
}

