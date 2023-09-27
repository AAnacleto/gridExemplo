import fetch from 'node-fetch';


const HOST = "http://localhost:3001";
const RESOURCE = "";
const HTTP_METHOD = "GET";

const QUERY_PARAMS = new URLSearchParams({
  startDate: "2023-09-19",
  endDate: "2024-03-17",
});

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

async function main() {
  // 200 OK
  const urlOK = `${HOST}${RESOURCE}?${QUERY_PARAMS}`;
  const headersOK = {
    "Authorization": `Bearer ${JWT}`
  };
  console.log("Linha da Requisição:", HTTP_METHOD, urlOK);
  console.log("Cabeçalhos:", headersOK);

  try {
    const responseOK = await fetch(urlOK, {
      method: HTTP_METHOD,
      headers: headersOK
    });

    console.log("Resposta:", responseOK.status, responseOK.statusText);

    if (responseOK.status !== 200) {
      throw new Error("A resposta HTTP deve ter o status 200");
    }

    const data = await responseOK.json();

    if (!data.length) {
      throw new Error("A resposta deve conter uma lista de produtos");
    }

    console.log("Produtos a vencer nos próximos 180 dias:");
    console.log(data, "\n");
  } catch (error) {
    console.error("Erro:", error);
  }

  // Resto do código para as outras solicitações...
}

main(); // Chama a função principal
