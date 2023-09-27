const HOST = "http://localhost:3001"; // Exemplo: "http://localhost:3001/"
const RESOURCE = "";  // path/to/resource
const HTTP_METHOD = "GET";  // POST, PUT, GET, ...

const QUERY_PARAMS = new URLSearchParams({
  startDate: "2023-09-19",
  endDate: "2024-03-17",
});

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";


// 200 OK
const urlOK = `${HOST}${RESOURCE}?${QUERY_PARAMS}`;
const headersOK = {
  "Authorization": `Bearer ${JWT}`
};
console.log("Linha da RequisiÃ§Ã£o:", HTTP_METHOD, urlOK);
console.log("CabeÃ§alhos:", headersOK);
const responseOK =  fetch(urlOK, {
  method: HTTP_METHOD,
  headers: headersOK
});

console.log("Resposta:", responseOK.status, responseOK.statusText);
if (responseOK.status !== 200) {
  throw new Error("A resposta HTTP deve ter o status 200");
}

const data = responseOK.json()

if (!data.length) {
  throw new Error("A resposta deve conter uma lista de produtos");
}
console.log("Produtos a vencer nos prÃ³ximos 180 dias:");
console.log(data, "\n");

// 400 Bad Request
const badRequestQueryParams = [
  new URLSearchParams({endDate: "2024-03-17"}),
  new URLSearchParams({startDate: "2023-09-19"}),
  new URLSearchParams({dataInicial: "2024-03-17", dataFinal: "2023-09-19"}),
  new URLSearchParams({}),
];
const badRequestHeaders = {
  "Authorization": `Bearer ${JWT}`
};

for (const queryParams of badRequestQueryParams) {
  const urlBadRequest = `${HOST}${RESOURCE}?${queryParams}`;

  console.log("Linha da RequisiÃ§Ã£o:", HTTP_METHOD, urlBadRequest);
  console.log("CabeÃ§alhos:", badRequestHeaders);
  const responseBadRequest =  fetch(urlBadRequest, {
    method: HTTP_METHOD,
    headers: badRequestHeaders
  });

  console.log("Resposta:", responseBadRequest.status, responseBadRequest.statusText, "\n");
  if (responseBadRequest.status !== 400) {
    throw new Error("A resposta HTTP deve ter o status 400");
  }
}

// 401 Unauthorized
const unauthorizedHeaders = [
  {"Authorization": `${JWT}`},  // NÃ£o inicia com Bearer
  {"Authorization": `Basic ${JWT}`},  // NÃ£o inicia com Bearer
  {"Authentication": `Bearer ${JWT}`},  // CabeÃ§alho nÃ£o Ã© Authorization
  {},  // NÃ£o contÃ©m cabeÃ§alho Authorization
]
const urlUnauthorized = `${HOST}${RESOURCE}?${QUERY_PARAMS}`;

for (const headers of unauthorizedHeaders) {
  console.log("Linha da RequisiÃ§Ã£o:", HTTP_METHOD, urlUnauthorized);
  console.log("CabeÃ§alhos:", headers);
  const responseUnauthorized =  fetch(urlUnauthorized, {
    method: HTTP_METHOD,
    headers: headers
  });

  console.log("Resposta:", responseUnauthorized.status, responseUnauthorized.statusText, "\n");
  if (responseUnauthorized.status !== 401) {
    throw new Error("A resposta HTTP deve ter o status 401");
  }
}