const client = require('./redis-config');
const logger = require('./Logger');

class Limiter {

    constructor(app) {
        this.limiter = require('express-limiter')(app, client);
    }

    /**
     * For IP only
     */
    usingRemoteAddress() {
        return this.limiter({
            path: '/users',
            method: 'get',
            lookup: ['connection.remoteAddress'],
            total: 10,
            expire: 1000,
            onRateAllowed: function(req) {
                logger.fileWrite({
                    'ipAddress': req.connection.remoteAddress,
                    'allowed': 'true',
                    'date': new Date()
                });

            },
            onRateLimited: function(req, res, next) {
                res.status(429).json({
                    message: 'Request Rate limit exceeded',
                    status: 429
                });
                logger.fileWrite({
                    'ipAddress': req.connection.remoteAddress,
                    'allowed': 'false',
                    'date': new Date()
                })
            }
        });
    }
}

module.exports = Limiter;