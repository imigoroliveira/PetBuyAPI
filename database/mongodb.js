const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', function () {
  console.log('Erro na conexão com o MongoDB!');
});

db.once('open', function () {
  console.log('Conectado ao MongoDB!');
});

db.on('close', function () {
  console.log('Desconectado do MongoDB!');
});

module.exports = db;
