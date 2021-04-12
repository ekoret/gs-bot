const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();
 

const api = new WooCommerceRestApi({
  url: process.env.SITE_URL,
  consumerKey: process.env.GS_KEY,
  consumerSecret: process.env.GS_SECRET,
  version: "wc/v3"
});


const wcData = async () => {

    const response = await api.get('products/1520223')
    .then( response => {
        //Get the data object for the product
        const { data } = response;
        const { id, name, permalink, regular_price, sale_price, stock_status} = data;

        // console.log( `id: ${id}, name: ${name}, permalink: ${permalink}, regular_price: ${regular_price}, sale_price: ${sale_price}, stock_status: ${stock_status}`);
        
        return permalink;
    })
    .catch( error => {
        console.log('Unable to fetch in wcData', error);
        const errorMessage = `Unable to fetch any data..`;
        return errorMessage;
    })

    return response;

}


exports.wcData = wcData();