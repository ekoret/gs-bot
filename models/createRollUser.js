const User = require('../schemas/userRoll');


const createRollUser = (messageAuthorId, messageAuthorUsername, reward) =>{
    const newUser = new User({
        _id: messageAuthorId,
        username: messageAuthorUsername,
        weekly: Date.now(),
        totalCredits: reward,
    });

    newUser.save()
    .then((res)=> {
        console.log(`User ${messageAuthorId}, ${messageAuthorUsername} has been added to the weekly lottery!`)
    })
    .catch(err => console.log("Error has occured creating user =>", err));

}

module.exports = createRollUser;