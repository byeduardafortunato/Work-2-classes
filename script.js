let turmas = [];

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
    renderizarTurmas();
}

function renderizarTurmas() {
    const container = document.getElementById("turmas");
    container.innerHTML = "";

    turmas.forEach((turma, index) => {
        const div = document.createElement("div");
        div.classList.add("turma");

        div.innerHTML = `
            <h3>${turma.nome}</h3>
            <input type="text" id="aluno-${index}" placeholder="Student name">
            <button onclick="adicionarAluno(${index})">Add Student</button>
            <div>
                ${turma.alunos.map(aluno => `<div class="aluno">${aluno}</div>`).join("")}
            </div>
        `;

        container.appendChild(div);
    });
}
