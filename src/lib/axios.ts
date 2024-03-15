import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Coloque a URL base da sua API aqui
  headers: {
    'Content-Type': 'application/json'
    // Adicione quaisquer headers adicionais necessários aqui
  }
});

