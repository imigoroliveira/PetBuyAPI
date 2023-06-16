const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/petbuy';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida!');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });

const con = mongoose.connection;

con.on('close', function () {
  console.log('Desconectado do MongoDB!');
});

module.exports = con;