const core = require('hmu-core');
const parse = require('hmu-runs-parse');

function hmu(bot, config) {
  config = config[hmu.name] || {};

  return function run(message, args) {
    if (!args.length) return message.reply('Invalid arguments provided');
    parse(args.join(' ')).then(runs => {
      if (!runs.length) return message.reply('That plugin does not exist');
      core(runs).then(results => {
        results = results.map(res => {
          return `[${res[0]}] ${res[1]} ${res[2]}`
        });

        message.channel.sendCode('toml', results.join('\n'));
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}

hmu.command = 'hmu';
hmu.usage = 'hmu <name> [...args]';

module.exports = hmu;
