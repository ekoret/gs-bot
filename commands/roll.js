const userRoll = require('../schemas/userRoll');
const createRollUser = require('../models/createRollUser');
const ms = require('parse-ms');

//change name and aliases
module.exports = {
    name: "roll", //name must match command name
    desctipion: "roll for a chance to win",
    execute(message, args) {

        //if there are no arguments
        if(!args.length){

            const timeout = 604800000; //in milliseconds
            const now = Date.now();
            const rewards = [25, 15, 15, 10, 10, 10, 10, 5, 5, 5];
            const theRoll = Math.floor(Math.random() * 10 + 1); //random number from 1 - 10
            const reward = rewards[theRoll];
            const congratsMessage = `congratulations! You've received a \`\`${"$" + reward + " CREDIT"}\`\`! Contact an admin or customer service and provide the email address associated with your ${process.env.SITE_NAME} account.`;
            const theDate = new Date().toString();
            
            userRoll.findById({
                _id: message.author.id
            }, (err, data) => {
    
                if(err) return console.log("Error search DB", err); //if there is an error return it
                if(!data){  //if the user cannot be found, create a record in Rolls collection
                    console.log("No record found");
                    createRollUser(message.author.id, message.author.username, reward);
                    message.reply(congratsMessage);
                } else {    //if there is data => so the user is found
                    if(timeout - (now - data.weekly) > 0){   //if the timer is not over yet
                        const timeLeft = ms(timeout - (now - data.weekly));
                        console.log(`${message.author.username} tried rolling but is timed out!`);
                        message.reply(`you've already used your weekly roll! Roll again in \`\`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s\`\``);
                    } else { //if the timer is over, so they can claim their reward
                        data.totalCredits += reward;
                        data.weekly = now;   //reset the timer
                        data.save()
                        .then( res => { //when saving to db is successful
                            console.log(`Weekly timer successfully reset for ${message.author.username}`, res);
                            message.reply(`${congratsMessage} Roll again in \`\`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s\`\``);
                            message.reply(`You now have a total of ${data.totalCredits} credits`);
                        })
                        .catch( err => {    //error in saving to db
                            console.log(`Error saving weekly timer to database for ${message.author.username}`, err);
                            message.reply(`There was an error with your roll. Contact an admin!`);
                        });
    
                    }
                
                }
            });
        } else if(args[0] === "redeem"){
            message.reply(`Here's the menu: $25 CREDIT = 1000 POINTS, $50 CREDIT = 2000 + 200 POINTS, $75 CREDIT = 4000 + 400 POINTS. Message customer service or an admin with your email address associated with your ${process.env.SITE_NAME} account`);
        } else {
            message.reply("This command ``~roll`` does not take that argument! Accepted arguments: ``redeem``");
        }

    },  //end execute
  };