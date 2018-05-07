exports.run = function(client, message, args) {
  client.user.setPresence({
      game: {
        name: args.join(" ")
      }
    })
    .then().catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setstatus'],
  permLevel: 4
};

exports.help = {
  name: 'setgame',
  description: 'Set Haruna\'s status. eg: setgame CSGO will display "Playing CSGO"',
  usage: 'setgame [game]'
};
