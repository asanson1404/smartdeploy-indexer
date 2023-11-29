# Mercury Sandbox
This repository contains a [Mercury](https://mercurydata.app/) client developed with Node.js and Axios to index [Smart Deploy](https://github.com/TENK-DAO/smartdeploy) contract datas.

## What is Mercury?
[Mercury](https://mercurydata.app/) is an indexer service for Stellar and Soroban. Check more in the [Mercury Docs Page](https://developers.mercurydata.app/)

## Pre-requisites
You need docker installed.
It is tested with: `Docker version 24.0.7, build afdd53b`

## Get started

1. Set your `.env` file<br/><br/>
Copy and update the access token provided by Mercury, refer to [request access](https://developers.mercurydata.app/requesting-access).
You'll need to paste your access token as well as the address of the Soroban Smart Contract that you want to track, and the endpoint address of the Mercury Server.
```
MERCURY_ACCESS_TOKEN=net-set-here
CONTRACT_ADDRESS=CDNOMEB3ZQHS5WPCUPQ7IS4OKGTOTBRDCZUITBRNSQAB63JJ52JFO4KX
MERCURY_BACKEND_ENDPOINT=http://ec2-16-170-242-7.eu-north-1.compute.amazonaws.com:3030
MERCURY_GRAPHQL_ENDPOINT=http://ec2-16-170-242-7.eu-north-1.compute.amazonaws.com:5000
```

2. Run a node docker image and install:
Get the `node:18.18.2` container going:
```
bash run.sh
```

Inside the Node Docker containr, install packages:
```
npm i
```

3. Subscribe to Smart Deploy events
```
node scripts/subscribeDeployEvent.js
```

4. Run a query asking for ledger entries:
```
node scripts/getEventSubscription.js
```
The retrieved data will be available on `results/responseData.json`
