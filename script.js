let turmas = [];

// Carregar dados do localStorage ao iniciar a página
function carregarDados() {
    const dadosSalvos = localStorage.getItem("turmas");
    if (dadosSalvos) {
        turmas = JSON.parse(dadosSalvos);
        renderizarTurmas();
    }
}

// Salvar dados no localStorage
function salvarDados() {
    localStorage.setItem("turmas", JSON.stringify(turmas));
}

function criarTurma() {
    const nome = document.getElementById("nomeTurma").value;

    if (nome === "") {
        alert("Digite o nome da turma");
        return;
    }

    turmas.push({
        nome: nome,
        alunos: []
    });

    document.getElementById("nomeTurma").value = "";
    salvarDados();
    renderizarTurmas();
}

function adicionarAluno(index) {
    const input = document.getElementById(`aluno-${index}`);
    const nomeAluno = input.value;

    if (nomeAluno === "") {
        alert("Digite o nome do aluno");
        return;
    }

    turmas[index].alunos.push(nomeAluno);
    input.value = "";
    salvarDados();
    renderizarTurmas();
}

function removerAluno(indexTurma, indexAluno) {
    turmas[indexTurma].alunos.splice(indexAluno, 1);
    salvarDados();
    renderizarTurmas();
}

function removerTurma(index) {
    if (confirm(`Tem certeza que quer remover a turma "${turmas[index].nome}"?`)) {
        turmas.splice(index, 1);
        salvarDados();
        renderizarTurmas();
    }
}

function limparTodas() {
    if (confirm("Tem certeza que quer limpar TODAS as turmas?")) {
        turmas = [];
        localStorage.removeItem("turmas");
        renderizarTurmas();
    }
}

function renderizarTurmas() {
    const container = document.getElementById("turmas");
    container.innerHTML = "";

    turmas.forEach((turma, index) => {
        const div = document.createElement("div");
        div.classList.add("turma");

        div.innerHTML = `
            <div class="turma-header">
                <h3>${turma.nome}</h3>
                <button class="btn-delete" onclick="removerTurma(${index})">Remover Turma</button>
            </div>
            <div class="alunos-input">
                <input type="text" id="aluno-${index}" placeholder="Nome do aluno">
                <button onclick="adicionarAluno(${index})">Adicionar Aluno</button>
            </div>
            <div class="alunos-lista">
                ${turma.alunos.map((aluno, alunoIndex) => `
                    <div class="aluno">
                        <span>${aluno}</span>
                        <button class="btn-delete" onclick="removerAluno(${index}, ${alunoIndex})">✕</button>
                    </div>
                `).join("")}
            </div>
        `;
        container.appendChild(div);
    });
}
