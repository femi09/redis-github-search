// Importing the express module
const express = require("express");
const { SearchRepos } = require("./controller/searchRepos");
const { SearchIssues } = require("./controller/searchIssues");
const { SearchUsers } = require("./controller/searchUsers");
const RedisHandler = require('./RedisHandler')

// Instantiating an object express
const app = express();

// Using the express object, handle the default '/' route for GET requests
app.get("/", (req, res) => {
    res.send(`Access <a href='/search-repos?query=javascript'>Search Repositories</a> route`);
});

// Handling the '/search-repos' route to search GitHub repositories
app.get("/search-repos", async (req, res) => {

    // Verifying the query parameter is passed in the request and not empty
    if (!req.query.query || req.query.query.trim() === '')
        res.json({ "error": "Please provide the search term!!" }).status(400)

    try{
        // Calling the SearchRepos() function to get the data
        const responseToSend = await SearchRepos(req.query.query);
        // Sending the response to the user
        return res.json(responseToSend);
    } catch (e) {
        return res.json({"error": JSON.stringify(e)}).status(400);
    }
});

// Handling the '/search-issues' route to search GitHub issues
app.get("/search-issues", async (req, res) => {
    
    // Verifying the query parameter is passed in the request and not empty
    if (!req.query.query || req.query.query.trim() === '')
        res.json({ "error": "Please provide the search term!!" }).status(400)
    
    try {
        // Calling the SearchIssues() function to get the data
        const responseToSend = await SearchIssues(req.query.query);
        // Sending the response to the user
        res.json(responseToSend);
    } catch (e) {
        res.json({"error": JSON.stringify(e)}).status(400);
    }
});

app.get("/search-users", async (req, res) => {
    
    // Verifying the query parameter is passed in the request and not empty
    if (!req.query.query || req.query.query.trim() === '')
        res.json({ "error": "Please provide the search term!!" }).status(400)
    
    try{
        // Calling the SearchUsers() function to get the data
        const responseToSend = await SearchUsers(req.query.query);
        // Sending the response to the user
        res.json(responseToSend);
    } catch (e) {
        res.json({"error": JSON.stringify(e)}).status(400);
    }
});

// Using the express object to listen to port 8000 for incoming requests
app.listen(8000, async () => {
    await RedisHandler.init()
    console.log("The App is listening on port 8000!");
});