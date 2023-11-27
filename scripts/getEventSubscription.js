const { runQuery } = require("./runQuery");

const contractAddress = process.env.SMARTDEPLOY_CONTRACT;

const query = `query DeployEvents {
    eventByTopic(t1: "AAAADgAAAAZkZXBsb3kAAA==") {
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
