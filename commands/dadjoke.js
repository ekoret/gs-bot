const axios = require('axios');

//change name and aliases
module.exports = {
    name: "dadjoke", //name must match command name
    desctipion: "get a random dad joke",
    execute(message, args) {
        
        //the config parameters for icanhazdadjoke
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        }


        async function dadJoke(){
            try {
                const response = await axios.get('https://icanhazdadjoke.com', config);
                console.log(response.data);
                message.reply(response.data.joke);
            } catch (err) {
                console.log("Something went wrong in fetching dad joke", err);
                message.reply("I was unable to find a joke.. I might be broken contact an admin!");
            }
            
        }

        dadJoke();

    },
  };