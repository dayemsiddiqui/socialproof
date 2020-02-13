
require('dotenv').config();

export default {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    FORWARDING_ADDRESS: process.env.FORWARDING_ADDRESS,
    BASE_URL: '/api/v1'
}