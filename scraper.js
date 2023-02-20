// Importa o módulo axios, que permite fazer requisições HTTP
const axios = require('axios');

// Importa o módulo dotenv, que permite carregar variáveis de ambiente a partir do arquivo .env
require('dotenv').config();

// Obtém a URL da API Blaze a partir da variável de ambiente BLAZE_API_URL
const BLAZE_URL = process.env.BLAZE_API_URL;

// Define a função pegarUltimosResultados, que faz uma requisição HTTP para a API Blaze
// e retorna um array com as cores correspondentes aos últimos resultados
const pegarUltimosResultados = async () => {
  try {
    // Faz uma requisição HTTP GET para a URL da API Blaze
    const response = await axios.get(BLAZE_URL);

    // Extrai do objeto de resposta os valores de roll dos últimos resultados
    const resultados = response.data.map(item => item.roll);

    // Converte os valores de roll em cores correspondentes
    const cores = converterEmCores(resultados);

    // Retorna o array com as cores correspondentes aos últimos resultados
    return cores;
  } catch (error) {
    // Em caso de erro na requisição, imprime o erro no console e retorna um array vazio
    console.error(error);
    return [];
  }
};

// Define a função converterEmCores, que recebe um array de valores de roll e retorna um array
// com as cores correspondentes
const converterEmCores = resultados => {
  // Percorre o array de resultados e aplica a lógica de conversão para cada valor de roll
  return resultados.map(valor => {
    if (valor === 0) {
      return "B";
    } else if (valor >= 1 && valor <= 7) {
      return "V";
    } else if (valor >= 8 && valor <= 14) {
      return "P";
    } else {
      return null;
    }
  });
};

// Define uma função assíncrona auto-executável que chama a função pegarUltimosResultados e
// imprime o array de cores resultante no console
(async () => {
  const ultimosResultados = await pegarUltimosResultados();
  console.log(ultimosResultados);
})();
