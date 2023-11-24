const { runQuery } = require("./runQuery");

const contractAddress = process.env.SMARTDEPLOY_CONTRACT;

const query = `query SmartDeployEvents($id: String!) {
    eventByContractId(
        searchedContractId: $id
    ) {
        edges {
            node {
                contractId
                data
                ledger
                ledgerTimestamp
                topic2
                topic1
                topic4
                topic3
            }
        }
    }   
}`;

const variables = {
    id: contractAddress
};

runQuery(query, variables);
