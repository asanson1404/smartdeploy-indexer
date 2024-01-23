const axios = require('axios');
require("dotenv").config();
const sorobanClient = require('soroban-client');

const MERCURY_ACCESS_TOKEN = process.env.MERCURY_ACCESS_TOKEN;
const MERCURY_BACKEND_ENDPOINT = process.env.MERCURY_BACKEND_ENDPOINT;
const SMARTDEPLOY_CONTRACT = process.env.SMARTDEPLOY_CONTRACT;

const suscribe_deploy = async () => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${MERCURY_ACCESS_TOKEN}`
            }
        };

        const data = {
            contract_id: SMARTDEPLOY_CONTRACT,
            topic1: sorobanClient.xdr.ScVal.scvSymbol("deploy").toXDR("base64"),
            max_single_size: 2000
        };

        const response = await axios.post(`${MERCURY_BACKEND_ENDPOINT}/event`, data, config);

        if (response.status == 200) {
            console.log("success");
        }
        //console.log(response);

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

suscribe_deploy();