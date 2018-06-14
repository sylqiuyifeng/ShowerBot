const path = require('path');

class Player {
    constructor() {
        this.connection = null;
        this.dispatcher = null;
        this.playlist = [];
    }
    play(playlist, connection, channel) {
        this.playlist = playlist;
        this.connection = connection;
        this.channel = channel;
        try {
            this.index = 0;
            console.log(path.join(__dirname, '../../music', this.playlist[this.index]));
            this.dispatcher = connection.playFile(path.join(__dirname, '../../music', this.playlist[this.index]));
            this.dispatcher.on('end', ()=>{
                this.index++;
                this.index %= this.playlist.length;
                try {
                    this.dispatcher = this.connection.playFile(path.join(__dirname, '../../music', this.playlist[this.index]));
                } catch (err) {
                    this.channel.send(`Error: ${err}`);
                    this.exit();
                }
            })
        } catch (err) {
            this.channel.send(`Error: ${err}`);
            this.exit();
        }
    }
    exit() {
        this.connection.disconnect();
    }
}

module.exports = new Player();