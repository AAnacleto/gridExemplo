import "./assets/css/style.css";
import icone from "./assets/img/icons8-contacts.svg";

const header = document.querySelector("header");
const img = document.createElement("img");
const form = document.querySelector(".new-contact-form") as HTMLFormElement;
const table = document.querySelector("tbody");
const cadastrarButton = document.querySelector(".create-button");

img.src = icone;
header?.prepend(img);

interface Pessoa {
  nome: string;
  telefone: string;
  email: string;
  interesses: string[];
}

let pessoas: Pessoa[] = [
  {
    nome: "João",
    telefone: "912345678",
    email: "joaozinho@gmail.com",
    interesses: ["Futebol", "Video-game", "Praia"],
  },
  {
    nome: "Maria",
    telefone: "987654321",
    email: "marc@gmail.com",
    interesses: ["Barbie", "Amizades", "Baladinhas"],
  },
];

function preencherTabela() {
  pessoas.forEach((pessoa) => {
    const row = document.createElement("tr");
    const column1 = document.createElement("td");
    column1.innerText = pessoa.nome;
    const column2 = document.createElement("td");
    column2.innerText = pessoa.telefone;
    const column3 = document.createElement("td");
    column3.innerText = pessoa.email;
    const column4 = document.createElement("td");
    const ul = document.createElement("ul");

    pessoa.interesses.forEach((interesse) => {
      const li = document.createElement("li");
      li.innerText = interesse;
      ul.appendChild(li);
    });

    column4.appendChild(ul);

    row.append(column1, column2, column3, column4);
    table?.append(row);
  });
}

window.addEventListener("load", preencherTabela);

cadastrarButton?.addEventListener("click", (event) => {
  event.preventDefault();

  const nome = (
    document.querySelector('input[name="nome"]') as HTMLInputElement
  ).value;
  const telefone = (
    document.querySelector('input[name="telefone"]') as HTMLInputElement
  ).value;
  const email = (
    document.querySelector('input[name="email"]') as HTMLInputElement
  ).value;
  const interesses = (
    document.querySelector('textarea[name="interesses"]') as HTMLTextAreaElement
  ).value.split(",");

  const novaPessoa: Pessoa = {
    nome: nome,
    telefone: telefone,
    email: email,
    interesses: interesses.map((interesse) => interesse.trim()), // Remove espaços em branco
  };

  pessoas.push(novaPessoa);

  form.reset();

  const table = document.querySelector("tbody");

  if (table) {
    table.innerHTML = "";
  }

  preencherTabela();
});
