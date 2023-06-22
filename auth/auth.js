const jwt = require('jsonwebtoken');
const auth = require('./app.json');

const bcryptjs = require('bcryptjs');

async function incluirToken(client) {
  const token = await jwt.sign({ codigo: client.codigo }, auth.appId, {
    expiresIn: 3600 
  });
  client.token = token;
  client.password = undefined;
  console.log(token);
}

async function gerarHash(client) {
  if (typeof client.password !== 'undefined') {
    const hash = await bcryptjs.hash(client.password, 10);
    client.password = hash;
  }
  return client;
}

function autorizar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi enviado!' });
  }

  const partes = authHeader.split(' ');

  if (partes && partes.length !== 2) {
    return res.status(401).send({ error: 'Token incompleto!' });
  }

  const [tipo, token] = partes;

  if (!/^Bearer$/i.test(tipo)) {
    return res.status(401).send({ error: 'Token mal formado!' });
  }

  jwt.verify(token, auth.appId, (err, client) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido!' });
    }
    req.clientLogadoId = client.id;
    return next();
  });
}

module.exports = {
  gerarHash,
  incluirToken,
  autorizar
};