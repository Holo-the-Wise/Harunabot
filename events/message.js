const prefix = require('../config.json').prefix;
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0].slice(prefix.length);
  let args = message.content.split(' ').slice(1);
  //  let perms = client.elevation(message);
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    console.log(`Command ${command} activated`);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
    console.log(`Command ${command} activated`);
  }
  if (cmd) {
    let perms = 0;
    if (message.channel.type == 'dm') {
      if (cmd.conf.guildOnly) {
        return message.channel.send("Sorry, I don't respond to that command in a DM");
      }
    } else {
      let perms = client.elevation(message);
      if (perms < cmd.conf.permLevel) {
        return message.channel.send(`You don't have permission to use. Perm level ${cmd.conf.permLevel}, your perm ${perms}`);
      }
    }
    cmd.run(client, message, args, perms);
  }
};
