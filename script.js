// ================== VARIÁVEIS GLOBAIS ==================
let tamanhoFonte = 18; // tamanho inicial da fonte

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

    // Esconde a capa e mostra o site
    document.getElementById('capa').style.display = 'none';
    document.getElementById('site').style.display = 'block';

    // Mensagem de boas-vindas
    const mensagem = document.createElement('div');
    mensagem.id = 'mensagem-boas-vindas';
    mensagem.innerText = `Fique à vontade, ${nome}! Leia tudo que quiser, o site é seu.`;
    mensagem.style.position = 'fixed';
    mensagem.style.top = '20px';
    mensagem.style.left = '50%';
    mensagem.style.transform = 'translateX(-50%)';
    mensagem.style.background = '#2e7d32';
    mensagem.style.color = '#fff';
    mensagem.style.padding = '15px 30px';
    mensagem.style.borderRadius = '12px';
    mensagem.style.zIndex = '9999';
    mensagem.style.transition = 'opacity 0.5s';

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.style.opacity = '0';
        setTimeout(() => mensagem.remove(), 500);
    }, 3000);
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
}

// ================== MODO CLARO / ESCURO ==================
function alternarTema() {
    document.body.classList.toggle('escuro');
}

// ================== CONTROLE DE TAMANHO DA FONTE ==================
function alterarFonte(delta) {
    tamanhoFonte += delta;

    if (tamanhoFonte < 12) tamanhoFonte = 12;
    if (tamanhoFonte > 40) tamanhoFonte = 40;

    document.querySelectorAll('.conteudo').forEach(conteudo => {
        conteudo.style.fontSize = tamanhoFonte + 'px';
    });
}

// ================== MUDAR COR NO MODO ESCURO ==================
function mudarCorModoEscuro() {
    if (!document.body.classList.contains("escuro")) {
        alert("Ative o modo escuro primeiro 🌙");
        return;
    }

    const topo = document.querySelector(".retangulo-topo");
    const lateral = document.querySelector(".botoes-retangulo");

    if (topo) topo.classList.toggle("verde-claro");
    if (lateral) lateral.classList.toggle("verde-claro");
}
