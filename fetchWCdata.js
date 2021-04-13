//https://github.com/woocommerce/woocommerce-rest-api-js-lib
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();
 

const api = new WooCommerceRestApi({
  url: process.env.SITE_URL,
  consumerKey: process.env.GS_KEY,
  consumerSecret: process.env.GS_SECRET,
  version: process.env.WC_VERSION
});

async function wcData(args) {
    
    const response = await api.get(`products/${args}`)
    .then( response => {
        //Get the data object for the product
        const { data } = response;
        // const { id, name, permalink, regular_price, sale_price, stock_status} = data;
        console.log(data);
        // console.log( `id: ${id}, name: ${name}, permalink: ${permalink}, regular_price: ${regular_price}, sale_price: ${sale_price}, stock_status: ${stock_status}`);
        
        // return permalink;
    })
    .catch( () => {
        // console.log('Unable to fetch in wcData', error);
        const errorMessage = ` I was unable to fetch any data..`;
        return errorMessage;
    })

    return response;
}

module.exports = {
    wcData
}