'use client';
import React, { useEffect, useState } from 'react';
import styles from './vote.module.css'
const { Web3 } = require('web3');
import { votingContract } from '../../contracts/connect';

const AddCandidate = () => {

    const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    const [connectedAccount, setConnectedAccount] = useState();
    console.log("connectedAccount", connectedAccount);
    const [candidates, setCandidates] = useState();
    console.log(candidates);
    const [name, setName] = useState();

    const handleConnect = async () => {
        if (window.ethereum) {
            // instantiate Web3 with the injected provider
            const web3 = new Web3(window.ethereum);
            //request user to connect accounts (Metamask will prompt)
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('connected');
            //get the connected accounts
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            //show the first connected account in the react page
            setConnectedAccount(accounts[0]);
          } else {
            alert('Please download metamask');
          }
    };
useEffect(() => {
    votingContract.methods.getCandidates().call().then((res) => {
        setCandidates(res);
    });
}, [ ]);

    const handleSubmit = async  () => {
        // Add the candidate to the contract
        if (!name) alert('Please enter a candidate name');
        // votingContract.methods.addCandidate(name).send({ from: connectedAccount }).then((res) => {
        //     console.log(res);
        // });
        console.log(votingContract);
        votingContract.methods.addCandidates(name).send({ from: connectedAccount }).then((res) => {
            console.log(res);
            setCandidates([...candidates, { name, voteCount: 0 }]);
        });
        console.log(`added candidate ${name}`);
    };

    return (
        <div className={styles.page_body}>

        {connectedAccount == undefined ? 
            <div className={styles.connect_button}>
            <button className={styles.vote_button} onClick={handleConnect}>Please Connect With Metamask</button>
                <p>pls install metamask if you have'nt</p>
            </div>
            
           :<>
            <h1 className={styles.vote_heading}>Add Candidates</h1>
            <div className={styles.vote_description}>
                <p>Only the the preceeding officer can add a candidate, ie owner of the contract</p>
            </div>
            <div className={styles.page_body}>
                <div className={styles.candidate_form}>
                    <h3 className={styles.form_header}>Add Candidate</h3>
                    
                        <input type="text" placeholder="Enter candidate name" onChange={(e)=> setName(e.target.value)} />
                        <button className={styles.vote_button} onClick={handleSubmit}>Add Candidate</button>
                 
                </div>

                <div className={styles.candidate_cards}>
                {candidates?.map((candidate, index) => (
                    <div key={index} className={styles.candidate_card}>
                    <img src="/voteProfile.avif" alt="Candidate" />    
                    <h3>{candidate.name}</h3>
                    <h3>Votes: {Number(candidate.voteCount)}</h3>
                    </div>
                ))}
                </div>    
            
            </div>
                </>
}
        </div>
    );
};

export default AddCandidate;