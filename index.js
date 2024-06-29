const axios = require("axios");
require('dotenv').config();
const fs = require("fs").promises; 
const googleTrends = require('google-trends-api');

const getTrendingProducts = async ({ query, key }) => {
    const options = {
        method: 'GET',
        url: `https://real-time-amazon-data.p.rapidapi.com/search`,
        params: {
            query: query,
            page: '1',
            country: 'IN',
            sort_by: 'RELEVANCE',
            product_condition: 'ALL'
        },
        headers: {
            'x-rapidapi-key': key,
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const temp = await axios.request(options);
        await fs.writeFile('products.json', JSON.stringify(temp.data, null, 2));
        console.log('Successfully wrote to products.json');
        return temp.data.data.products
    } catch (error) {
        console.error('Error fetching trending products:', error);
    }
    return []
}

const googleTrendsFunc = async ({ query }) => {
    let val = '';
    await googleTrends.relatedQueries({ keyword: [...query], geo: 'IN' })
        .then((res) => {
            const parsedResults = JSON.parse(res);
            val = parsedResults.default.rankedList[1].rankedKeyword[0].query;
        })
        .catch((err) => {
            console.log(err);
        })
    return val;
}

const main = async ({ query, key }) => {
    const temp = await googleTrendsFunc({ query: [...query] });
    const results = await getTrendingProducts({ query: temp, key: key })
    return results
}

module.exports = {
    main,
    getTrendingProducts,
    googleTrendsFunc
};
