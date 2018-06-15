const path = require('path');
const fs = require('fs');
const {
    db
} = require('./db');

db.run('CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING UNIQUE);');
db.run('CREATE TABLE IF NOT EXISTS songs (id INTEGER, name STRING, FOREIGN KEY (id) REFERENCES playlist(id));');

fs.mkdirSync(path.join(__dirname, '../', 'music'));

module.exports.upload = async function (file, name) {
    return new Promise((resolve, reject) => {
        file.pipe(fs.createWriteStream(path.join(__dirname, '../', 'music', name)))
            .on('error', (e) => reject(e))
            .on('finish', () => resolve());
    })
}

module.exports.listFiles = function () {
    return new Promise((res, rej) => {
        fs.readdir(path.join(__dirname, '../', 'music'), (err, files) => err ? rej(err) : res(files));
    })
}

module.exports.listPlaylists = function () {
    return new Promise((res, rej) => {
        db.all('SELECT * FROM playlist;', (err, rows) => err ? rej(err) : res(rows));
    })
}

module.exports.getPlaylist = function (id) {
    return new Promise((res, rej) => {
        if (!/^\d+$/.exec(id)) {
            rej('Invalid id');
        }
        id = Number.parseInt(id);
        db.all('SELECT name FROM songs WHERE id = ?;', id, (err, rows) => err ? rej(err) : res(rows.map(v => v.name)));
    })
}

module.exports.addPlaylist = function (name) {
    return new Promise((res, rej) => {
        db.run('INSERT INTO playlist (name) VALUES (?);', name, (result, err) => {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                res();
            }
        });
    })
}

module.exports.setPlaylist = function (id, names) {
    return new Promise((res, rej) => {
        if (!/^\d+$/.exec(id)) {
            rej('Invalid id');
        }
        id = Number.parseInt(id);
        db.run('DELETE FROM songs WHERE id = ?;', id, (result, err) => {
            if (err) {
                rej(err);
            }
            const statement = db.prepare('INSERT INTO songs (id, name) VALUES ($id, $name)');
            for (const n of names) {
                statement.run({
                    $id: id,
                    $name: n
                }, (result, err) => {
                    if (err) {
                        rej(err);
                    }
                })
            }
            statement.finalize(() => res());
        });
    })
}