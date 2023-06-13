const express = require('express');
const CategoryRoutes = require('./routes/CategoryRoutes');
const app = express();

app.use(express.json());
app.use('/api', CategoryRoutes);

// Resto da configuração do servidor

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});