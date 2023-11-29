const axios = require('axios');
const fs = require('fs');
const graphql = require('graphql');
const graphql_tag = require('graphql-tag');

// Update the Mercury Access Token in the .env file
const setEnvValue = (key, value) => {
    const envVars = fs.readFileSync(".env", "utf-8").split('\n');
    envVars.splice(0, 1, `${key}=${value}`);
    fs.writeFileSync(".env", envVars.join('\n'));
}

// Query a new Jwt Token to use Mercury Services
const runMutation = async () => {

    const MERCURY_GRAPHQL_ENDPOINT = process.env.MERCURY_GRAPHQL_ENDPOINT;
    
    const mutation = graphql_tag.gql`
    mutation NewJwtToken($email: String!, $password: String!) {
        authenticate(input: {email: $email, password: $password}) {
            clientMutationId
            jwtToken
        }
    }`

    try {

        const response = await axios.post(`${MERCURY_GRAPHQL_ENDPOINT}/graphql`, {
            query: graphql.print(mutation),
            variables: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            }
        });
        if (response.status == 200) {
            
            console.log("success");
            //console.log(response.data.data.authenticate.jwtToken);
            
            setEnvValue("MERCURY_ACCESS_TOKEN", response.data.data.authenticate.jwtToken);

        } else {
            console.log(response);

        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

runMutation();
