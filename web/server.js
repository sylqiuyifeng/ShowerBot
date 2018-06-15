/**
 * Express server
 */

const express = require('express');
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const {
    port
} = require('../config.json');
const music = require('../file/music');
const proxy = require('../file/proxy');
const app = express()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.post('/player/upload', function (req, res) {
    const busboy = new Busboy({
        headers: req.headers
    });
    let promises = [];
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        promises.push(music.upload(file, filename));
    }).on('finish', () => Promise.all(promises).then(res.send('{"success":true}'))
        .catch(e => res.status(500).send(JSON.stringify({
            success: false,
            error: e.toString()
        }))));
    req.pipe(busboy);
})

app.get('/player/songs', function (req, res) {
    music.listFiles().then(v => {
        res.send(JSON.stringify({
            success: true,
            value: v
        }))
    }).catch(e => res.send(JSON.stringify({
        success: false,
        error: e
    })));
})
app.get('/player/playlist', function (req, res) {
    music.listPlaylists().then(v => {
        res.send(JSON.stringify({
            success: true,
            value: v
        }))
    }).catch(e => res.send(JSON.stringify({
        success: false,
        error: e
    })));
})
app.get('/player/playlist/:id', function (req, res) {
    music.getPlaylist(req.params.id).then(v => {
        res.send(JSON.stringify({
            success: true,
            value: v
        }))
    }).catch(e => res.send(JSON.stringify({
        success: false,
        error: e
    })));
})
app.post('/player/playlist/add/:name', function (req, res) {
    music.addPlaylist(req.params.name).then(() => {
        res.send(JSON.stringify({
            success: true
        }))
    }).catch(e => {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    });
})
app.post('/player/playlist/set', function (req, res) {
    music.setPlaylist(req.body.id, req.body.names).then(() => {
        res.send(JSON.stringify({
            success: true
        }))
    }).catch(e => res.send(JSON.stringify({
        success: false,
        error: e
    })));
})

app.get('/proxy/:id', function (req, res) {
    proxy.get(req.params.id, res);
})
app.listen(port, () => {
    console.log('Server started');
})