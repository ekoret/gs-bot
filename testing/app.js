fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log(data);
            //const {joke} = data;
            // console.log(data.joke);
            //  return data.joke;
            jokeResults(data.joke);
        })
        .catch(err => {
            console.log('Error in fetching dad joke..', err);
            const errorMessage = 'Error in fetching a dad joke..';
            return errorMessage;
        });

const jokeResults = function displayJoke(joke){
    const theJoke = joke;
    // console.log(joke);
    return theJoke;
}
