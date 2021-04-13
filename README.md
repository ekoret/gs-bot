# gs-bot
Custom Discord bot that uses Discord.js and makes requests to WooCommerce REST API endpoints



Need to do:
Create a custom endpoint to search for product
    - needs to return lets say, max 3 results that partially matches
    - need to take into consideration that product name can be more than 1 word
    - we need: product name, category, regular price, sale price, permalink, image

Implement the check order status command
    - bot returns order status successfully
    - now need to do a check if unique user id in user meta data entered in args[1] matches user id on order details