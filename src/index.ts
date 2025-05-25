import chalk from "chalk";
import readlineSync from "readline-sync";

const MEDIA = 18;

let aprovadosDiretos = 0;
let aprovadosRecuperacao = 0;
let aprovadosSegundaChamada = 0;
let reprovadosDefinitivos = 0;

const quantidadeAlunos = Number(readlineSync.question(chalk.yellow.bold("Quantos alunos deseja cadastrar? ")));

for (let i = 0; i < quantidadeAlunos; i++) {
    processarAluno(i);
}

console.log(chalk.yellow.bold("\n--- Estatísticas ---"));
console.log(chalk.green(`Aprovados direto: ${aprovadosDiretos}`));
console.log(chalk.green(`Aprovados por recuperação: ${aprovadosRecuperacao}`));
console.log(chalk.green(`Aprovados por segunda chamada: ${aprovadosSegundaChamada}`));
console.log(chalk.green.bold(`Reprovados definitivos: ${reprovadosDefinitivos}`));

function processarAluno(indice: number): void {
    console.log(chalk.blue(`\n--- Aluno ${indice + 1} ---`));

    const nome = readlineSync.question(chalk.blue("Nome do aluno: "));

    let PI = readlineSync.question(chalk.blue("Nota da PI (deixe vazio se faltou): "));
    let PR = readlineSync.question(chalk.blue("Nota do PR: "));
    let PF = readlineSync.question(chalk.blue("Nota da PF (deixe vazio se faltou): "));

    let faltas = 0;

    if (PI === "") {
        PI = readlineSync.question(chalk.magenta("Você faltou na PI. Nota da SEGUNDA CHAMADA para PI: "));
        faltas++;
        aprovadosSegundaChamada++;
    }
    if (PF === "") {
        PF = readlineSync.question(chalk.magenta("Você faltou na PF. Nota da SEGUNDA CHAMADA para PF: "));
        faltas++;
        aprovadosSegundaChamada++;
    }

    const piNum = Number(PI);
    const prNum = Number(PR);
    const pfNum = Number(PF);

    const total = piNum + prNum + pfNum;
    console.log(chalk.blue(`Total: ${total}`));

    if (total >= MEDIA) {
        console.log(chalk.bgGreen.black(`Resultado: APROVADO(a)`));
        aprovadosDiretos++;
    } 
    else {
        console.log(chalk.bgYellow.black("Aluno(a) em recuperação!"));
        const notaRecuperacao = Number(readlineSync.question(chalk.magenta("Nota da RECUPERAÇÃO: ")));

        if (notaRecuperacao >= MEDIA) {
            console.log(chalk.bgGreen.black("Aprovado(a) na Recuperação!"));
            aprovadosRecuperacao++;
        } 
        else {
            console.log(chalk.bgRed.white.bold("Reprovado(a) definitivamente!"));
            reprovadosDefinitivos++;
        }
    }
}