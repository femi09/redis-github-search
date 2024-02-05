// Import the required modules
const axios = require('axios')
const Constants = require("../common/constants");
const { processHrTimeToSeconds } = require("../common/utils");
const RedisHandler = require('../RedisHandler');

// Function to search GitHub issues based on the search term
const SearchIssues = async (searchQuery) => {

    // Get the Redis client instance
    const redisClient = RedisHandler.getRedisClient()

    // Fetch the time in high-resolution
    const startTime = process.hrtime();

    // Fetch the key from Redis and check if the required data is already present
    const data = await redisClient.get(searchQuery + "_issues");
    if (data)
        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "Redis"
        }

    // The required data is not present in Redis and hence need to make the API call
    else {
        // Call the GitHub search API
        const response = await axios.get(Constants.GITHUB_SEARCH_ISSUES_URL + searchQuery);

        // Set the total number of issues in Redis
        await redisClient.set(searchQuery + "_issues", response.data.total_count, {'EX': 30})

        // Return the response
        return {
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "GitHub API"
        }
    }
}

// Export the function to be used by external files or modules
module.exports = {
    SearchIssues
}