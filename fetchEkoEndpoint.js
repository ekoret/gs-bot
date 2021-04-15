require('dotenv').config();
const axios = require("@woocommerce/woocommerce-rest-api/node_modules/axios").default;

async function search_product(args){

    //We need to concat the args with a + to query
    const searchTerms = args.join('+');

    const results = axios.get(`${process.env.DEV_ENDPOINT}${searchTerms}`)
    .then( (response) => {
        // console.log(response.data[0].category_link);
        console.log(response.data);

        return response.data;
    })
    .catch( (err) => {
        console.log(err);
    } )


    return results;
    
}


module.exports = {
    search_product
}