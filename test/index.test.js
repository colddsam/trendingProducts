const assert = require('assert');
const { main, getTrendingProducts, googleTrendsFunc } = require('../index');

describe('Trending Products Module', function() {
    it('should have main function', function() {
        assert.strictEqual(typeof main, 'function');
    });

    it('should have getTrendingProducts function', function() {
        assert.strictEqual(typeof getTrendingProducts, 'function');
    });

    it('should have googleTrendsFunc function', function() {
        assert.strictEqual(typeof googleTrendsFunc, 'function');
    });
});
