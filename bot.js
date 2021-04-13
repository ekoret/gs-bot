//Get functions file
const { dadJoke } = require('./fetchDadJoke.js');
const { wcData } = require('./fetchWCdata.js');

//Get discord.js 
const Discord = require('discord.js');

//Create a client object from the Discord object
const client = new Discord.Client();

//Makes all .env variables enviroment varialbes that can be used with process
// https://nodejs.org/api/process.html
require('dotenv').config();


//For the prefix. Future-proofing
const pf = '~';

//When client is ready and connected
client.on('ready', () => {
    console.log(`GSBOT is logged in..`);
});


//The clients listens on the event that a message is sent from any channel
client.on('message', (message) => {



    /* Guard clauses
     */
    //If the message does not start with the prefix do nothing
    if (!message.content.startsWith(pf)) return;
    //If the message comes from a bot do nothing
    if (message.author.bot) return;



    /* Command Parser
        ?ping pong pang   =>   command = ping    args = [pong, pang];
    */
    //Slice the prefix off the message
    const commandBody = message.content.slice(pf.length);
    //Split the message into sub-strings. Makes a split wherever there is a space
    const args = commandBody.split(' ');
    //Get the first element in the sub-string array as the command and lowercase it
    const command = args.shift().toLowerCase();



    if (command === 'commands') {
        message.reply(`Here are a list of my commands: ${pf}ping ${pf}dadjoke`);
    }

    if (command === 'dadjoke') {
        const theDadJoke = dadJoke;
        theDadJoke.then(joke => {
            message.channel.send(joke);
        })
    }

    if (command === 'ping') {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`It took ${timeTaken}ms for the reply`);
    }

    //Product search command
    if (command === 'search') {
        //If there is more than 1 argument, display args message
        if(args.length > 1 || args.length === 0){
            message.reply(`Incorret usage. Example" ${pf}search productName`);
        } else {
            //Pass the first argument into wcData function
            wcData(args[0]).then( product => {
                //Reply back to author with the promise value
                message.reply(product);
            })
        }
    }

    // if (command === 'wc') {
    //     // const productInfo = wcData;
    //     wcData.then( product => {
    //         message.reply(product);
    //     })
    // }
});

//Logs the client in, establishing a websocket connection to Discord
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=login
client.login(process.env.BOT_TOKEN);