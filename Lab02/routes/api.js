const express = require('express');
const fs = require('fs');
const router = express.Router();

// Middleware para registrar pedidos
router.use((req, res, next) => {
  const url = req.originalUrl;
  const baseUrl = url.split('?')[0];
  if (baseUrl === '/processar-form-get-aluno' || baseUrl === '/processar-form-post-aluno') {
    const data = new Date().toISOString();
    const ip = req.ip;
    const log = `${data} - ${ip} - ${url}\n`;
    
    fs.appendFile('requests.txt', log, (err) => {
      if (err) console.error('Erro ao gravar log:', err);
    });
  }
  next();
});

module.exports = router;
