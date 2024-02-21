const { StatusCodes } = require('http-status-codes')
const StartupService = require('../services/startup.Service');
class StartupController {
  constructor() {
    this.startupService = new StartupService();
    this.createStartup = this.createStartup.bind(this);
  }

  async createStartup(req, res) {
    try {
      const { messages, modeloNegocio } = req.body;
        const response = await this.startupService.createStartupWithContext(messages, modeloNegocio);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = StartupController;
