const shell = require('shelljs');

async function createBranch(ctx, next) {
    const branchName = `branch_${new Date().getTime()}`;
    shell.exec('git pull');
    shell.exec(`git checkout -b ${branchName}`);
    shell.exec(` git push --set-upstream origin ${branchName}`);
    ctx.body = {
        mes: '',
        data: branchName,
        success: true,
    };
}


module.exports = {
    createBranch,
};