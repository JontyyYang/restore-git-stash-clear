const { Command } = require('commander');

const rgsc = require('./restore-git-stash-clear');
const program = new Command();
const { version } = require('../package.json');

const registerCommander = () => {
  program.version(version, '-v, --version');

  program
    .option('-dir <dir-name>')
    .option('-name <lottie-name>')
    .description('找回不小心清除的记录，传入用户名')
    .action((name, command) => {
      rgsc(name);
    });

  program.parse();
};

module.exports = registerCommander;
