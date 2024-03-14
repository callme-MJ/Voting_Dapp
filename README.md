This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with our Decentralized Voting Application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- our application allows us to create candidates and give votes to them,
- a user is allowed to give one vote only in each election

## How to run the Voting Dapp

-To run the applicatin you first need metamask or any other wallet installed your browser
-we are using hardhat here to compile the application so install hardhat locally in your project directory
## a wallet preferably metamask is mandatory 

## setup Hardhat

-on your project directory install hardhat with npm i hardhat
then,
-run the hardhat server with command "npx hardhat node"

- [[Hardhat Documentation](https://nextjs.org/docs](https://hardhat.org/hardhat-runner/docs/getting-started)) - learn about setting up hardhat here.

these command will setup a hardhat server locally and will give you tewnty private keys..... , we can use this later as different wallet addresses
- add this network to your wallet network as custom network 
- then run this command "npx hardhat run scripts/deploy.js --network localhost", it will log the address which deployed the contract store this address in a variable
- it will create a complete metada of our contract in artifact folder ie ./artifact/contracts/voting_contract.sol
- copy the VotingContract.json file and paste in inside the contracts folder inside src directory ie "./src/contracts" (replace if there's any file in the name of VotingContract.json)
- paste the address which deployed the contract to CONTRACT_ADDRESS variable inside connect.js file inside the contracts folder.
- now you are ready to use the application
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- remember only the account which deployed the contract can add candidates and one account can give only one vote to any candidates... 
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
