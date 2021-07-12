//change name and aliases
module.exports = {
    name: "ping",
    desctipion: "check response time",
    execute(message, args) {
        
        //code goes in here
        // const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`It took ${Date.now() - message.createdTimestamp}ms for the reply`);
  
    },
  };