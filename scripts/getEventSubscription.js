const { runQuery } = require("./runQuery");
const sorobanClient = require('soroban-client');

const contractAddress = process.env.SMARTDEPLOY_CONTRACT;
const xdrTopic1 = sorobanClient.nativeToScVal("deploy").toXDR("base64");

const query = `query DeployEvents {
    eventByTopic(t1: "${xdrTopic1}") {
        edges {
            node {
                contractId
                data
                ledger
                ledgerTimestamp
                topic1
                topic2
                topic3
                topic4
            }
        }
    }   
}`;

const variables = {
    
};

runQuery(query, variables);
