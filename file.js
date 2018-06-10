const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const settings = require('./setting.json');
const {port} = require('./config.json');

let mapping = {};
let counter = 0;

if (!fs.existsSync(settings.download)) {
    fs.mkdirSync(settings.download);
}

function getPath(id) {
    return path.join(__dirname, settings.download, id)
}

const server = http.createServer((request, response)=> {
    const id = (request.url||'/').substring(1);
    if (!(id in mapping)) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('File not found');
        return;
    }
    const p = getPath(id);
    mapping[id]['Content-Length'] = fs.stat(p, (err, stats)=> {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end(err);
        } else {
            mapping[id]['Content-Length'] = stats.size;
            response.writeHead(200, mapping[id]);
            const stream = fs.createReadStream(p);
            stream.pipe(response);
        }
    })
}).listen(port);

function download(url) {
    return new Promise((resolve, reject)=>{
        const id = (counter++).toString();
        const file = fs.createWriteStream(getPath(id));
        const protocol = url.startsWith('https')?https:http;

        const request = protocol.get(url, function(response) {
            if (!response.statusCode || response.statusCode !== 200) {
                return reject('Request failed');
            }
            const Content_Disposition = response.headers['content-disposition'] || 
                `attachment; filename="${path.basename(url)}"`;
            const Content_Type = response.headers['content-type'];
            response.pipe(file).on('error', (e)=> {
                return reject(e);
            }).on('finish', ()=> {
                mapping[id] = {'Content-Disposition': Content_Disposition, 'Content-Type': Content_Type};
                return resolve(id);
            });
        });
    })
}

function remove(id) {
    return new Promise((resolve, reject)=>{
        if (!(id in mapping)) {
            reject('File not found');
        }
        fs.unlink(path.join(settings.download, id), (err)=> {
            if (err) {
                resolve(err);
            } else {
                delete mapping[id];
                resolve(`Removed ${id}`);
            }
        })
    })
}

function close() {
    if (server) {
        server.close();
    }
}

module.exports.download = download;
module.exports.remove = remove;
module.exports.close = close;