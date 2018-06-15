const path = require('path');
const fs = require('fs');

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

class Player {
    constructor() {
        this.connection = null;
        this.dispatcher = null;
        this.playlist = [];
        this.state = 0;
    }
    playSong(name, p) {
        fs.access(p, (err) => {
            if (err) {
                console.log(err);
                this.channel.send(`Error: ${name} does not exist`);
                return this.exit();
            }
            this.dispatcher = this.connection.playFile(p);
            this.dispatcher.once('end', (reason) => {
                if (reason !== 'skip' && reason !== 'stream') {
                    return;
                }
                if (this.connection.channel.members.array().length === 1) {
                    if (this.state !== 0) {
                        this.exit()
                    }
                    return;
                }
                if (this.state === 1) {
                    this.playNext();
                }
            });
        })
    }
    playNext() {
        this.index++;
        if (this.playlist.length === 0) {
            return;
        }
        if (this.index >= this.playlist.length) {
            this.index = 0;
            this.playlist = shuffle(this.playlist);
        }
        this.np = this.playlist[this.index];
        const p = path.join(__dirname, '../music', this.np);
        this.playSong(this.np, p);
    }
    async play(playlist, voiceChannel, channel) {
        if (this.state !== 0) {
            this.dispatcher.end('stop');
        }
        if (playlist.length === 0) {
            channel.send('Error: Empty playlist');
            return;
        }

        this.playlist = shuffle(playlist);
        if (!this.connection || this.connection.channel.id !== voiceChannel.id) {
            this.connection = await voiceChannel.join();
        }
        this.channel = channel;
        this.index = 0;
        this.np = this.playlist[this.index];
        const p = path.join(__dirname, '../music', this.np);
        this.state = 1;
        this.playSong(this.np, p);
    }
    getNp() {
        if (this.state === 0) {
            throw new Error('The player is not connected');
        }
        return this.np;
    }
    pause() {
        if (this.state !== 1) {
            throw new Error('There is no songs playing');
        }
        this.dispatcher.pause();
        this.state = 2;
    }
    skip() {
        if (this.state !== 1) {
            throw new Error('There is no songs playing');
        }
        this.dispatcher.end('skip');
    }
    resume() {
        if (this.state !== 2) {
            throw new Error('The player is not paused');
        }
        this.dispatcher.resume();
        this.state = 1;
    }
    exit() {
        if (this.state === 0) {
            throw new Error('The player is not connected');
        }
        this.state = 0;
        this.np = 0;
        this.dispatcher.end('stop');
        this.connection.disconnect();
    }
}

let map = new Map();

module.exports.getPlayer = function (id) {
    if (!map.has(id)) {
        map.set(id, new Player());
    }
    return map.get(id);
};

module.exports.getPlayers = function () {
    return map.values();
}