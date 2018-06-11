const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const sqlite3 = require('sqlite3');
const settings = require('./setting.json');
const {port, domain} = require('./config.json');

const db = new sqlite3.Database(path.join(__dirname, settings.fileDb));
const pattern = /filename="(.+)"/;

db.run('CREATE TABLE IF NOT EXISTS file (id INTEGER PRIMARY KEY AUTOINCREMENT, type STRING, disposition STRING);');

if (!fs.existsSync(settings.download)) {
    fs.mkdirSync(settings.download);
}

function getPath(id) {
    return path.join(__dirname, settings.download, id)
}

const server = http.createServer((request, response)=> {
    const id = (request.url||'/').substring(1);
    if (!/^\d+$/.exec(id)) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Illegal request');
        return;
    }
    db.prepare('SELECT * FROM file WHERE id = ?').get(Number.parseInt(id), function (err, row){
        if (err || !row) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('File not found');
            return;
        }
        const p = getPath(id);
        fs.stat(p, (err, stats)=> {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end(err);
            }
            const header = {
                'Content-Disposition': row.disposition,
                'Content-Type': row.type,
                'Content-Length': stats.size
            };
            response.writeHead(200, header);
            const stream = fs.createReadStream(p);
            stream.pipe(response);
        })
    }).finalize();
}).listen(port);

function download(url) {
    return new Promise((resolve, reject)=>{
        const protocol = url.startsWith('https')?https:http;
        const request = protocol.get(url, function(response) {
            if (!response.statusCode || response.statusCode !== 200) {
                return reject('Request failed');
            }
            const Content_Disposition = response.headers['content-disposition'] || 
                `attachment; filename="${path.basename(url)}"`;
            const Content_Type = response.headers['content-type'];

            db.prepare('INSERT INTO file VALUES (null, ?, ?)').run([Content_Type, Content_Disposition], function (err) {
                if (err) {
                    return reject(e);
                }
                const file = fs.createWriteStream(getPath(this.lastID.toString()));
                response.pipe(file).on('error', (e)=> {
                    remove(this.lastID.toString()).catch(err=>{
                        reject(e + '\nCannot remove entry from database');
                    }).then(()=>{
                        reject(e);
                    });
                }).on('finish', ()=> {
                    return resolve(this.lastID.toString());
                });
            })
            
        });
    })
}

function remove(id) {
    return new Promise((resolve, reject)=>{
        if (!/^\d+$/.exec(id)) {
            return reject('Invalid id');
        }
        db.prepare('DELETE FROM file WHERE id = ?').run([Number.parseInt(id)]);
        fs.unlink(path.join(settings.download, id), (err)=> {
            if (err) {
                reject(err);
            } else {
                resolve(`Removed ${id}`);
            }
        })
    })
}

function list() {
    return new Promise((resolve, reject)=> {
        db.all('SELECT id, disposition FROM file', (err, rows)=> {
            if (err) {
                return reject(err);
            }
            let largest = 0;
            //map from the largest id
            resolve(rows.reverse().map(v=>{
                const id = v.id.toString();
                if (largest < id.length) {
                    largest = id.length;
                }
                return `${' '.repeat(largest - id.length)}${id} => [${pattern.exec(v.disposition)[1]}](http://${domain}:${port}/${id})`;
            }))
        })
    })
}

function close() {
    if (server) {
        server.close();
    }
    db.close();
}

module.exports.download = download;
module.exports.remove = remove;
module.exports.close = close;
module.exports.list = list;