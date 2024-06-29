# Trending Products Node Module

This Node.js module allows you to fetch trending products from Amazon and related queries using Google Trends. It provides functions to interact with the Amazon Real-Time Data API and the Google Trends API.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies using npm:

```bash
npm install axios dotenv google-trends-api
```

## Usage

### Configuration

1. Create a `.env` file in the root directory of your project.
2. Add your RapidAPI key to the `.env` file:

```
RAPIDAPI_KEY=your_rapidapi_key
```

### Functions

#### `getTrendingProducts`

Fetches trending products from Amazon based on a query.

```javascript
const { getTrendingProducts } = require('./path_to_your_module');

const query = 'laptop';
const key = process.env.RAPIDAPI_KEY;

getTrendingProducts({ query, key });
```

#### `googleTrendsFunc`

Fetches related queries from Google Trends based on a keyword.

```javascript
const { googleTrendsFunc } = require('./path_to_your_module');

const query = 'laptop';

googleTrendsFunc({ query }).then((relatedQuery) => {
    console.log(relatedQuery);
});
```

#### `main`

Combines the functionalities of `googleTrendsFunc` and `getTrendingProducts` to fetch related queries and then fetch trending products based on those queries.

```javascript
const { main } = require('./path_to_your_module');

const query = 'laptop';
const key = process.env.RAPIDAPI_KEY;

main({ query, key });
```

### Example

Here's an example of how to use the module in your project:

```javascript
const { main } = require('./path_to_your_module');

const query = 'laptop';
const key = process.env.RAPIDAPI_KEY;

main({ query, key }).then(() => {
    console.log('Trending products fetched successfully.');
}).catch((error) => {
    console.error('Error fetching trending products:', error);
});
```

### File Structure

```
.
├── .env
├── index.js
├── package.json
└── README.md
```

### Dependencies

- `axios`
- `dotenv`
- `fs`
- `google-trends-api`

### License

This project is licensed under the MIT License.

### Author

[Your Name]

### Acknowledgements

- [Axios](https://github.com/axios/axios)
- [Google Trends API](https://github.com/pat310/google-trends-api)
- [RapidAPI](https://rapidapi.com)

