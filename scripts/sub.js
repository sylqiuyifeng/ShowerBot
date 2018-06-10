const {r} = require('./snoowrap');
const {rndCount} = require('../config.json');

module.exports = class Sub {
    constructor(name) {
        this.sub = r.getSubreddit(name);
    }

    async _getRndSubmission(funcName) {
        const list = await this.sub[funcName]({limit: 20});
        const rndIndex = Math.floor(Math.random() * 20);
        return list[rndIndex];
    }

    getRndHot() {
        return this._getRndSubmission('getHot');
    }
    getRndNew() {
        return this._getRndSubmission('getNew');
    }
    getRnd() {
        return this.sub.getRandomSubmission({limit: 1});
    }

    getSubmmision(strategy) {
        switch (strategy) {
            case 'hot':
                return this.getRndHot();
            case 'new':
                return this.getRndNew();
            case 'rnd':
                return this.getRnd();
            default:
                throw 'Unknown strategy';
        }
    }
}