const clientModel = require('../models/ClientModel');
const auth = require('../auth/auth');




class ClientController {

    async createClient(req, res) {
        try {
            const client = req.body;
            const profileImageBuffer = req.body.profileImage;
        
            const max = await clientModel.findOne({}).sort({ codigo: -1 });
            client.codigo = max == null ? 1 : max.codigo + 1;
        
            if (await clientModel.findOne({ email: client.email })) {
              return res.status(400).json({ error: 'Customer already registered!' });
            }
        
            client.profileImage = profileImageBuffer;
        
            const result = await clientModel.create(client);
            auth.incluirToken(result);
            
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Endpoint to edit client using Id as parameter
    async editClient(req, res) {
        try{
            const upclient = await clientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!upclient) {
            return res.status(404).json({ error: 'client not found :(' });
            }
            res.json(upclient);
        } catch(err){
            res.status(500).json({ error: err.message });
        }
    }

    //Endpoint to list all existing customers
    async listAllClients(req, res) {
        try {
            const client = await clientModel.find();
            res.json(client);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
   // Endpoint para listar um client específico por ID
   async listClientById(req, res) {
    try {
        const client = await clientModel.findOne({ _id: req.params.id });
        if (!client) {
          return res.status(404).json({ error: 'Client not found :(' });
        }
        res.json(client);
        console.log(res);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}
}
module.exports = new ClientController();