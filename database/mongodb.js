const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/catalogo';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mongoose.connection;

con.on('open', function () {
  console.log('Conectado ao MongoDB!');
});

con.on('error', function () {
  console.log('Erro na conexão com o MongoDB!');
});

con.on('close', function () {
  console.log('Desconectado do MongoDB!');
});

module.exports = con;
