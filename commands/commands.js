const createEmbed = require('../createEmbed.js');

//change name and aliases
module.exports = {
    name: "commands", //name must match command name
    desctipion: "list of commands",
    execute(message, args) {
        const commands = "``~commands - Get a list of commands`` \n ``~dadjoke - Get a dad joke`` \n ``~roll - Get free credits`` \n ``~roll redeem - Redeem credits``";
        const commandsEmbed = createEmbed('List of Commands', commands);

        //code goes in here
        message.reply(commandsEmbed);
    },
  };