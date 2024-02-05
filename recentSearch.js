// Importing the required module
const RedisHandler = require('./redisHandler.js');

// Function to get the list of recent search terms
const getRecentSearchTerms = async (searchQuery) => {

    // Getting the Redis client instance
    const redisClient = RedisHandler.getRedisClient();
    
    // Getting the list of search terms from Redis
    const searchQueryList = await redisClient.lRange("searchQuery", 0, -1)
   
    // Checking if the search terms in Redis exceeds five
    if (searchQueryList.length >= 5) {

        // Removing the leftmost element from the search terms list
        const removedSearchQuery = await redisClient.lPop("searchQuery")
        
        // Inserting the new search terms at the rightmost position of the list
        await redisClient.rPush("searchQuery", searchQuery)

        // Fetching the updated search terms list from Redis
        const updatedSearchQueryList = await redisClient.lRange("searchQuery", 0, -1)
        
        // Returning the response
        return {
            searchQueryList: updatedSearchQueryList,
            removedSearchQuery,
        }
    }
    // If there are less than five search terms in the list
    else {
        // Inserting the new search terms at the rightmost position of the list
        await redisClient.rPush("searchQuery", searchQuery)

        // Fetching the updated search terms list from Redis
        const updatedSearchQueryList = await redisClient.lRange("searchQuery", 0, -1)
        
        // Returning the response
        return {
            searchQueryList: updatedSearchQueryList,
            removedSearchQuery: null,
        }
    }
}

// Exporting the funtion to be used by external files or modules
module.exports = {
    getRecentSearchTerms
}