const prefix = require('../config.json').prefix;
module.exports = message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const client = message.client;
  const args = message.content.split(' ');
  const command = args.shift().slice(prefix.length);

  try {
    let cmdFile = require(`../commands/${command}`);
    cmdFile.run(client, message, args);
  } catch (err){
    console.log(`Commands ${command} failed`);
  }
}
