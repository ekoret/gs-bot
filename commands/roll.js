const userRoll = require('../schemas/userRoll');
const createRollUser = require('../models/createRollUser');
const ms = require('parse-ms');
const createEmbed = require('../createEmbed');

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
            const congratsMessage = `${message.author.username} congratulations! \n\nYou've received a \`\`${"$" + reward + " CREDIT"}\`\`!\n\nContact an admin or customer service and provide the email address associated with your ${process.env.SITE_NAME} account. \n\n \`\`A minimum of $25 credits is required for redemption.\`\``;
            const theDate = new Date().toString();
            
            userRoll.findById({
                _id: message.author.id
            }, (err, data) => {
    
                if(err) return console.log("Error search DB", err); //if there is an error return it
                if(!data){  //if the user cannot be found, create a record in Rolls collection
                    console.log("No record found");
                    createRollUser(message.author.id, message.author.username, reward);
                    const firstRollEmbed = createEmbed(`${message.author.username} you rolled a $${reward} CREDIT!`, congratsMessage);
                    message.reply(firstRollEmbed);
                } else {    //if there is data => so the user is found
                    if(timeout - (now - data.weekly) > 0){   //if the timer is not over yet
                        const timeLeft = ms(timeout - (now - data.weekly));
                        console.log(`${message.author.username} tried rolling but is timed out!`);
                        const alreadyRolledEmbed = createEmbed(`${message.author.username}, you've already rolled this week!`, `Roll again in \`\`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s\`\` \n Total Credits: \`\`$${data.totalCredits}\`\``);
                        message.reply(alreadyRolledEmbed);
                    } else { //if the timer is over, so they can claim their reward
                        data.totalCredits += reward;
                        data.weekly = now;   //reset the timer
                        data.save()
                        .then( res => { //when saving to db is successful
                            console.log(`Weekly timer successfully reset for ${message.author.username}`, res);
                            const rollSuccess = createEmbed(`${message.author.username}, you now have $${data.totalCredits} of Credits!`, congratsMessage);
                            message.reply(rollSuccess);
                        })
                        .catch( err => {    //error in saving to db
                            console.log(`Error saving weekly timer to database for ${message.author.username}`, err);
                            const errorEmbed = createEmbed(`${message.author.username}, something went wrong!`, `Contact ${process.env.ADMIN_USER}!`)
                            message.reply(errorEmbed);
                        });
                    }
                }
            });
        } else if(args[0] === "redeem" && args.length == 1){

            const redeemMessage = "``There is a minimum redemption amount of $25 CREDITS``\n\n``$25 CREDITS - 1000 POINTS``\n``$50 CREDITS - 2000 + 200 POINTS``\n``$75 CREDITS - 4000 + 400 POINTS``\n``$100 CREDITS - 5000 + 500 POINTS``\n\nContact an admin or customer service with the email address associated with your " + process.env.SITE_NAME + " account to redeem."
            const redeemEmbed = createEmbed(`Redeeming Credits` , redeemMessage);
            message.reply(redeemEmbed);

        } else if(args[0] === "redeem" && args[1] === "minus"){
            const user = args[2];
            const prepUser = args[2];
            const userReg = prepUser.replace(/\D/g, '');
            const minusAmount = args[3];
            // console.log(user.replace(/\D/g, ''));
            message.reply(`Give me 3 seconds to search for user ${user}...`);
            setTimeout( () => {
                userRoll.findOne({
                    _id: userReg
                }, (err, data) => {
                    if(err) return console.log("Error finding user for subtracting points", err);
                    if(!data){  //if there is no data
                        message.reply(`There was no data found for user ${user}. Did you type the name correctly?`);
                    } else {    //there is data found
                        const prevCredits = data.totalCredits;
                        data.totalCredits -= minusAmount;
                        data.save()
                        .then( (res) => {
                            console.log(`Subtracted \`\`${minusAmount}\`\` from \`\`${prevCredits}\`\` for user \`\`${user}\`\`.`);
                            message.reply(`Subtracted \`\`${minusAmount} CREDITS\`\` from \`\`${prevCredits} CREDITS\`\` for user \`\`${data.username}\`\`.\nThey now have a total of \`\`${data.totalCredits} CREDITS\`\``);
                        })
                        .catch( (err) => {
                            console.log("Error in subtracting from totalCredits", err);
                            message.reply(`There was an error subtracting the total credits..`);
                        })
                    }
                })
            }, 3000);

        } else {
            message.reply("This command ``~roll`` does not take that argument! Accepted arguments: ``redeem``");
        }

    },  //end execute
  };