//change name and aliases
module.exports = {
    name: "commands", //name must match command name
    desctipion: "list of commands",
    execute(message, args) {
        
        //code goes in here
        message.reply("Here are a list of commands: ``~dadjoke``, ``~roll``, ``~roll redeem``");
    },
  };