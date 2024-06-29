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
        const response = await axios.request(options);
        console.log(response.data.data.products);
        await fs.writeFile('test.json', JSON.stringify(response.data, null, 2));
        console.log('Successfully wrote to test.json');
    } catch (error) {
        console.error('Error fetching trending products:', error);
    }
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
    await getTrendingProducts({ query: temp, key: key })
}

module.exports = {
    main,
    getTrendingProducts,
    googleTrendsFunc
};
