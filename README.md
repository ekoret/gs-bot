# gs-bot

> Version 0.1.5 now has everything but without the WooCommerce integration. The bot has been updated at this point to use slash commands, allows users to gain credits weekly that gets saved to a database, admin commands such as adding and removing credits from users. In the next versions, I will be working on adding some more admin commands such as setting the credits for a user and a command to view users data from the database.

> A change is going to be done in this branch. I will be removing all CommonJS requires and replacing them with modern import and export syntax.

### Table of Contents

- [Description](#description)
  - [Technologies](#technologies)
- [How To Use](#how-to-use)
  - [Installation](#installation)
  - [Setting Up Authorization](#setting-up-authorization)
  - [Enviroment Variables](#enviroment-variables)
- [To Do](#to-do)
- [Questions](#questions)
- [References](#references)

---

## Description

This is a custom Discord bot that uses the Discord.js library. The bot is a for-fun project that is on-going and a way to learn Nodejs, Discordjs, MongoDB, and more. I will be adding new things as time goes on and as my experience grows.

### Technologies

- discord.js `v14.3.0`
- dotenv `v16.0.2`
- discordjs/rest `v1.1.0`
- eslint `v8.23.0`
- nodemon `v2.0.19`
- mongoose `v6.5.4`

[Back To The Top](#gs-bot)

---

## How To Use

### _Installation_

Clone the git project. Command line into the folder and use `npm install` to install all the packages. Create a `.env` file and add the enviroment variables from the list below.  
You can then use `node index.js` from the root of the project folder to start the bot. You can also use `npm run watch` to run the bot with nodemon. This method is useful for debugging and development.

### _Setting Up Authorization_

We don't want EVERYONE to be able to use the bot, only verified members. In order to achieve this, we can set the flag `Use Application Commands` in role settings to true for the roles that CAN use the bot.  
For example, we would set the flag for the role `@everyone` to false, while role `Verified Member` and any other roles to true.

### _Enviroment Variables_

- Needs to be updated

[Back To The Top](#gs-bot)

---

## To Do

- REFACTOR!
- Change CommonJS requires to imports
- Add useful admin commands
- Add WooCommerce integration
- Add for fun commands for users

[Back To The Top](#gs-bot)

---

## Questions

- What is the difference between using `interaction.isCommand()` vs `interaction.isChatInputCommand()`?
- Should controllers be classes?

[Back To The Top](#gs-bot)

---

## References

- Discord.js Official Documentation - https://discord.js.org/
- Guide for Building Discord Bot - https://discordjs.guide/
- Mongoose Official Documentation - https://mongoosejs.com/

[Back To The Top](#gs-bot)
