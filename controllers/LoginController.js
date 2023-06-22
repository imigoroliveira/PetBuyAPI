const clientModel = require('../models/ClientModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, password } = req.body;
        const client = await clientModel.findOne({ 'email': email }).select('+password')
        
        if (!client) {
            return res.status(400).send({ error: 'User not found!' });
        }

        if (!await bcryptjs.compare(password, client.password)) {
            return res.status(400).send({ error: 'Invalid password!' });
        }

        await auth.incluirToken(client);
        res.status(200).json(client);
    }
}

module.exports = new LoginController();