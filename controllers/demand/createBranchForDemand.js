const shell = require('shelljs');

async function createBranch(ctx, next) {
    const branch_name = `branch_${new Date().getTime()}`
    shell.echo('hello world');
    shell.exec('git pull');
    shell.exec(`git checkout -b ${branch_name}`);
    shell.exec(` git push --set-upstream origin ${branch_name}`);
    ctx.body = {
        mes: '',
        data: '',
        success: true,
    };
}


module.exports = {
    createBranch,
};