// Create the static data
const constants = Object.freeze({
    GITHUB_SEARCH_REPOS_URL: "https://api.github.com/search/repositories?q=",
    GITHUB_SEARCH_ISSUES_URL: "https://api.github.com/search/issues?q=",
    GITHUB_SEARCH_USERS_URL: "https://api.github.com/search/users?q=",
}); 

// Export the object to be used in external files or modules
module.exports = constants;