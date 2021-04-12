const axios = require('axios').default;

const dadJoke = async () => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await axios.get('https://icanhazdadjoke.com/', config);
    // console.log(response.data.joke);
    return response.data.joke;

}


exports.dadJoke = dadJoke();