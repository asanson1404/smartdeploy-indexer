const axios = require('axios');
const fs = require('fs');
require("dotenv").config();
const sorobanClient = require('soroban-client');

const MERCURY_ACCESS_TOKEN = process.env.MERCURY_ACCESS_TOKEN;
const MERCURY_GRAPHQL_ENDPOINT = process.env.MERCURY_GRAPHQL_ENDPOINT;

// First we will create the results folder if does not exist
const resultFolderName = 'results';

try {
    fs.mkdirSync(resultFolderName);
    console.log(`Folder '${resultFolderName}' created successfully.`);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The folder '${resultFolderName}' already exists.`);
    } else {
        console.error(`An error occurred: ${err}`);
    }
}

// Now we will get some information about the contract we subscribed:
const runQuery = async (query, variables, name) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${MERCURY_ACCESS_TOKEN}`
            }
        };

        const data = {
            query,
            variables
        }

        const response = await axios.post(`${MERCURY_GRAPHQL_ENDPOINT}/graphql`, data, config);

        if (response.status == 200) {
            console.log("success");

            let resultFileName;

            if (name === "Deploy") {
                resultFileName = 'results/deployEventData.json';
            } else if (name === "Publish") {
                resultFileName = 'results/publishEventData.json';
            }
            const nbEvents = response.data.data.eventByTopic.edges.length;

            // Create the object which gather all the events datas
            const eventObj = {};
            for(let i = 0; i < nbEvents; i++) {
                const xdrDataEvent = response.data.data.eventByTopic.edges[i].node.data;
                const jsDataEvent = sorobanClient.scValToNative(sorobanClient.xdr.ScVal.fromXDR(xdrDataEvent, 'base64'));
                eventObj[`event${i}`] = { jsDataEvent };
            }

            // Stringify the object and display it in a file
            const jsonToSave = JSON.stringify(eventObj, null, 2);
            try {
                fs.writeFileSync(resultFileName, jsonToSave);

            } catch (error) {
                console.error("error saving file: ", error);

            }

        } else {
            console.log(response);

        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = { runQuery }