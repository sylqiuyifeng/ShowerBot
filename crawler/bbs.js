/**
 * Crawler for mcbbs
 */

const cheerio = require('cheerio');
const http = require('http');

const board = (id)=>`http://www.mcbbs.net/forum.php?mod=forumdisplay&fid=${id}&filter=lastpost&orderby=lastpost`;

const pattern = /^\w+_(\d+)$/;

function deserializeBoard(content) {
    const $ = cheerio.load(content);
    const table = $('#threadlisttableid');
    const threads = table.children().filter(function (i, element) {
        return pattern.exec($(this).attr('id'))
    });
    return threads.map(function (i, el) {
        return {
            id: pattern.exec($(this).attr('id'))[1],
            title: $('.icn', this).next().children().filter('.s.xst').text(),
            author: $('.by a', this).first().text(),
            time: $('.by span', this).first().text()
        }
    }).get();
}

function getList(id) {
    return new Promise((resolve, reject) => {
        http.get(board(id), res=> {
            if (!res.statusCode || res.statusCode !== 200) {
                return reject('Request failed');
            }
            let data = '';
            res.on('data', d=>data+=d);
            res.on('end', ()=>{
                resolve(deserializeBoard(data));
            })
        }).on('error', (e)=>reject(e));
    })
}

getList('139').then(v=>{
    console.log(v);
}).catch(e=>{
    console.log(e);
})