const { StatusCodes } = require('http-status-codes')
const StartupService = require('../services/startupService');
class StartupController {
  constructor() {
    this.startupService = new StartupService();
    this.createStartup = this.createStartup.bind(this);
  }

  async createStartup(req, res) {
    try {
      const { messages } = req.body;
        const response = await this.startupService.createStartup(messages);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.log('StartupController', error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = StartupController;
