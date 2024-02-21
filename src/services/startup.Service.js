const  { AppError } = require('../utils/errorHandler');

class StartupService {

    async createStartup(data) {
        try {
            return { message: 'Hello World', data};
        } catch (error) {
            console.log('StartupService', error)
            throw new AppError(error.message, 500);
        }
    }

}

module.exports = StartupService;
