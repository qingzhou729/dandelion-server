const cp = require('child_process'); 
const shell = require('shelljs');
async function createGitBranch() {
    return new Promise((resolve, reject) => {
        shell.sh('../../shell/createGitBranch.sh',  (err, result) => {
            console.log(err)
            console.log(result)
            resolve(result);
        });
        
    })
}

async function createBranch(ctx, next) {
    console.log('123456');
    const data = await createGitBranch();
    console.log(data);
    ctx.body = {
        mes: '',
        data: '',
        success: true,
    };
}


module.exports = {
    createBranch,
};