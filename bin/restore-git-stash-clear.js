
const child_process = require('child_process');

/**
 *
 * @returns string[]
 */
function qryStashIds() {
  return new Promise((resolve, reject) => {
    child_process.exec('git fsck --lost-found', {encoding: 'utf8'}, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      // 筛选出dangling commit的id
      let matches = stdout.match(/commit\s+([^\s\r\n]+)/g);
      if (matches) {
        matches = matches.map(m => m.replace(/commit\s+/, ''));
        resolve(matches);
      }
    });
  });
}

function idGenerate(id, name) {
  return new Promise(resolve => {
    child_process.exec(`git show ${id}`, {encoding: 'utf8'}, (err, log) => {
      if (err) {
        return resolve();
      }
      // 经过观察每个log都会带有下面这种日期标识，我们只要根据 传入的日期，筛选出符合的即可
      // Author: bighamD <******2@qq.com>
      // Date:   Sun Sep 19 16:26:29 2021 +0800

      // 可以借助时间或者作者来筛选
      const match = log.includes(name);

      if (match) {
        resolve(id);
      }
      resolve();
    });
  });
}
async function matchRevertStashId(name) {
  const stashIds = await qryStashIds();

  return (await Promise.all(stashIds.map(id => idGenerate(id, name)))).filter(Boolean);
}

const run = async value => {
  const { Name } = value;

  let match = await matchRevertStashId(Name);

  console.error(match);
  // 然后再去 show，再去 merge 就好
};


module.exports = run;
