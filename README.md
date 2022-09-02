# gs-bot

> Version 0.1.4 now has all the embeds completed and basic functionality of the bot. I now need to add commands for admins to use to add and subtract from users total.

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)

---

## Description

This is a custom Discord bot that uses the Discord.js library. The bot is a for-fun project that is on-going and a way to learn Nodejs, Discordjs, MongoDB, and more. I will be adding new things as time goes on and as my experience grows.

#### Technologies

- discord.js `v14.3.0`
- dotenv `v16.0.2`
- discordjs/rest `v1.1.0`
- eslint `v8.23.0`
- nodemon `v2.0.19`

[Back To The Top](#react-counter)

---

## How To Use

### Installation

Clone the git project. Command line into the folder and use `npm install` to install all the packages. Create a `.env` file and add the enviroment variables from the list below.  
You can then use `node index.js` from the root of the project folder to start the bot. You can also use `npm run watch` to run the bot with nodemon. This method is useful for debugging and development.

### Enviroment Variables

- BOT_TOKEN
- BOT_CLIENT_ID
- GUILD_ID
- COMPANY_NAME
- ADMIN_USER
- CUSTOMER_SUPPORT_USER
- MONGO_SRV

[Back To The Top](#react-counter)

---

## To Do

- REFACTOR!
- Add content to readme

[Back To The Top](#react-counter)

---

## Questions

- What is the difference between using `interaction.isCommand()` vs `interaction.isChatInputCommand()`?
- Should controllers be classes?
- Should I group all "helpers" into a folder?
- Is it possible to turn NodeHelper into a class? If I can, is there any point?

  [Back To The Top](#react-counter)

---

## References

- Discord.js Official Documentation - https://discord.js.org/
- Guide for Building Discord Bot - https://discordjs.guide/
- Mongoose Official Documentation - https://mongoosejs.com/

  [Back To The Top](#react-counter)
