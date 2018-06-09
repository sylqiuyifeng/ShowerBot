const snoowrap = require('snoowrap');
const { clientId, clientSecret, refreshToken, userAgent } = require('../config.json');

module.exports.r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken
})
