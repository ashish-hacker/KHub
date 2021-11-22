const {
    SearchClient,
    SearchIndexClient,
    SearchIndexerClient,
    AzureKeyCredential,
} = require("@azure/search-documents");
const {v4: uuidv4 } = require("uuid");
const express = require('express');
const router = express.Router();


// Create a SearchClient to send queries
const client = new SearchClient(
    `https://` + process.env.SEARCH_SERVICE_NAME + `.search.windows.net/`,
    process.env.SEARCH_INDEX_NAME,
    new AzureKeyCredential(process.env.SEARCH_API_KEY)
);

// creates filters in odata syntax
const createFilterExpression = (filterList, facets) => {
    let i = 0;
    let filterExpressions = [];
    // console.log(filterList);
    while (i < filterList.length) {
        let field = filterList[i].field;
        let value = filterList[i].value;

        // if (facets[field] === 'array') {
        //     // filterExpressions.push(`${field}/any(t: search.in(t, '${value}', ','))`);
        // } else {
        filterExpressions.push(`${field} eq '${value}'`);
        // }
        i += 1;
    }
    // console.log(filterExpressions);

    return filterExpressions.join(' and ');
}

// reads in facets and gets type
// array facets should include a * at the end 
// this is used to properly create filters
const readFacets = (facetString) => {
    let facets = facetString.split(",");
    
    let output = {};
    facets.forEach(function (f) {
        if (f.indexOf('*') > -1) {
            output[f.replace('*', '')] = 'array';
        } else {
            output[f] = 'string';
        }
    })
    console.log(output);
    return output;
}

router.post('/', async (req, res) => {
    try {

        // Reading inputs from HTTP Request
        let q = (req.query.q || (req.body && req.body.q));
        const top = (req.query.top || (req.body && req.body.top));
        const skip = (req.query.skip || (req.body && req.body.skip));
        const filters = (req.query.filters || (req.body && req.body.filters));
        const facets = readFacets(process.env.SEARCH_FACETS);


        // If search term is empty, search everything
        if (!q || q === "") {
            q = "*";
        }

        // Creating SearchOptions for query
        let searchOptions = {
            top: top,
            skip: skip,
            includeTotalCount: true,
            facets: Object.keys(facets),
            filter: createFilterExpression(filters, facets)
        };

        // Sending the search request
        const searchResults = await client.search(q, searchOptions);

        // Getting results for output
        const output = [];

        for await (const result of searchResults.results) {
            const obj = {
                id: uuidv4(),
                avatarUrl: '',
                name: result.document.author,
                topic: result.document.topic,
                filename: result.document.metadata_storage_name,
                lastModified: result.document.metadata_storage_last_modified,
                votes: result.document.votes
            }
            output.push(obj);
        }

        // Logging search results
        console.log(searchResults.count);

        // Creating the HTTP Response
        res.status(200);
        res.header('Content-Type', 'application/json');
        const body = {
            count: searchResults.count,
            results: output,
            facets: searchResults.facets
        };
        res.send(body);

    } catch (error) {
        console.log(error);

        // Creating the HTTP Response
        res.status(400).send(error);
    }
});



module.exports = router;
