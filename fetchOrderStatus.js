const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();
 

const api = new WooCommerceRestApi({
  url: process.env.SITE_URL,
  consumerKey: process.env.GS_KEY,
  consumerSecret: process.env.GS_SECRET,
  version: process.env.WC_VERSION
});


async function getOrderStatus(userID, orderNumber) {
    
    //Get the order details from the API from order number
    const orderStatus = await api.get(`orders/${orderNumber}`)
    .then( (response) => {
        //This has all the order details
        // console.log(response.data);
        const { status, customer_id } = response.data;
        // console.log(customer_id);
        return `Your order is currently ${status.toUpperCase()}`;
    })
    .catch( (error) =>{
        // console.log(error);
        const errorMessage = `I was unable to find your order data.. Please try again or contact ${process.env.ADMIN_USER}.`;
        return errorMessage;
    })
  
 
    return orderStatus;
}



module.exports = {
    getOrderStatus
}