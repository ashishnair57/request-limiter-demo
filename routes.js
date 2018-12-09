'use strict';

const RateLimiter = require('./config');
const logger = require('./Logger');

class Routes {

	constructor(app) {
		this.rateLimiter = new RateLimiter(app);
		this.app = app;
	}
	appRoutes() {
		/**
		 * rate Limter For /testApi route only based in IP address
		 */
		this.app.get('/testApi', this.rateLimiter.usingRemoteAddress(), (req, res) => {
			res.status(200).json({
				message: 'You are welcome here.',
				status: 200
			});
		});

		this.app.get('/getLog', (req, res) => {
			logger.fileRead(function(err,resp){
				res.status(200).json({
					data: resp,
					status: 200
				});
			})
		});
	}

	routesConfig() {
		this.appRoutes();
	}
}
module.exports = Routes;