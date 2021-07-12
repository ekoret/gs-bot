const userRoll = require('../schemas/userRoll');
const createRollUser = require('../models/createRollUser');
const ms = require('parse-ms');

//change name and aliases
module.exports = {
    name: "roll", //name must match command name
    desctipion: "roll for a chance to win",
    execute(message, args) {

        const timeout = 604800000; //in milliseconds
        const now = Date.now();
        const rewards = ["$25 CREDIT", "$15 CREDIT", "$15 CREDIT", "$10 CREDIT", "$10 CREDIT", "$10 CREDIT", "$10 CREDIT", "$5 CREDIT", "$5 CREDIT", "$5 CREDIT"];
        const theRoll = Math.floor(Math.random() * 10 + 1); //random number from 1 - 10
        const congratsMessage = `congratulations! You've received a \`\`${rewards[theRoll]}\`\`! Contact an admin or customer service and they'll handle the rest.`;
        
        userRoll.findById({
            _id: message.author.id
        }, (err, data) => {

            if(err) return console.log("Error search DB", err); //if there is an error return it
            if(!data){  //if the user cannot be found, create a record in Rolls collection
                console.log("No record found");
                createRollUser(message.author.id, message.author.username);
                message.reply(congratsMessage);
            } else {    //if there is data => so the user is found
                if(timeout - (now - data.weekly) > 0){   //if the timer is not over yet
                    const timeLeft = ms(timeout - (now - data.weekly));
                    message.reply(`you've already used your weekly roll! Roll again in \`\`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s\`\``);
                } else { //if the timer is over
                    data.weekly = now;   //reset the timer
                    data.save()
                    .then( res => { //when saving to db is successful
                        console.log(`Weekly timer successfully reset for ${message.author.username}`, res);
                        message.reply(`${congratsMessage}! Roll again in \`\`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s\`\``);
                    })
                    .catch( err => {    //error in saving to db
                        console.log(`Error saving weekly timer to database for ${message.author.username}`, err);
                        message.reply(`There was an error with your roll. Contact an admin!`)
                    });

                }
            
            }
        });
    },
  };