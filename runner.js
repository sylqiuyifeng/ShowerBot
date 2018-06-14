const child_process = require('child_process');

const exec = (cmd)=>new Promise((resolve, reject)=>{
    const proc = child_process.exec(cmd).on('exit', code=>resolve(code));
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stdout);
})

async function run() {
    while (true) {
        await exec('git pull');
        if (await exec('npm run main') !== 0) {
            console.log('Bot shutdown');
            break;
        }
    }
}

run().then(()=>console.log('Runner stopped'));