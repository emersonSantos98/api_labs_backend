const router = require('express').Router();
const StartupController = require('../controllers/startup.Controller');
const startupController = new StartupController();


router.post('/startups', startupController.createStartup
    /*
        #swagger.tags = ['Startup']
        #swagger.description = 'Endpoint para criar uma startup com base nos inputs dos usuários.'

        #swagger.parameters['messages'] = {
          in: 'form url encoded',
          description: 'Mensagens para a criação da startup',
          required: true,
          type: 'string'
        }

        #swagger.parameters['modeloNegocio'] = {
          in: 'form url encoded',
          description: 'Modelo de negócio para a criação da startup',
          required: true,
          type: 'string'
        }

        #swagger.responses[200] = {
          description: 'Startup criada com sucesso',
          schema: {
            $ref: "#/definitions/Startup"
          }
        }
        #swagger.responses[500] = {
          description: 'Erro interno do servidor'
        }

    */
);


module.exports = router;
