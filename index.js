const express = require('express');
const { start } = require('repl');
const app = express();

// List of static users data
const users = [
        { "id": "1", "name": "user 1" },
        { "id": "2", "name": "user 2" },
        { "id": "3", "name": "user 3" },
        { "id": "4", "name": "user 4" },
        { "id": "5", "name": "user 5" },
        { "id": "6", "name": "user 6" },
        { "id": "7", "name": "user 7" },
        { "id": "8", "name": "user 8" },
        { "id": "9", "name": "user 9" },
        { "id": "10", "name": "user 10" },
        { "id": "11", "name": "user 11" },
        { "id": "12", "name": "user 12" },
        { "id": "13", "name": "user 13" }
    ];

// List of static posts data
const posts = [
        { "id": "1", "name": "post 1" },
        { "id": "2", "name": "post 2" },
        { "id": "3", "name": "post 3" },
        { "id": "4", "name": "post 4" },
        { "id": "5", "name": "post 5" },
        { "id": "6", "name": "post 6" },
        { "id": "7", "name": "post 7" },
        { "id": "8", "name": "post 8" },
        { "id": "9", "name": "post 9" },
        { "id": "10", "name": "post 10" },
        { "id": "11", "name": "post 11" },
        { "id": "12", "name": "post 12" },
        { "id": "13", "name": "post 13" }
    ];

// paginated api 
// created a middleware function paginatedResults
// so that it can used by any of the api which needs paginated results
// instead of writing code again and again

// Getting users
app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults);
})

// Getting posts
app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults);
})

// middleware function
function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        // Previous page
        if(startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        // Next page
        if(endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        results.results = model.slice(startIndex, endIndex);
        
        res.paginatedResults = results;
        next();
    }
}

app.listen(3000, () => console.log("Server is running..."));