//change name and aliases
module.exports = {
    name: "roll", //name must match command name
    desctipion: "roll for a chance to win",
    execute(message, args) {
        
        //code goes in here
        const deals = ["$25 CREDIT", "$15 CREDIT", "$15 CREDIT", "$10 CREDIT", "$10 CREDIT", "$10 CREDIT", "$10 CREDIT", "$5 CREDIT", "$5 CREDIT", "$5 CREDIT"];
        const theRoll = Math.floor(Math.random() * 10 + 1); //random number from 1 - 10
        const congratsMessage = `congratulations! You've received a ${deals[theRoll]}! Contact an admin or customer service and they'll handle the rest.`;
        message.reply(congratsMessage);
    },
  };