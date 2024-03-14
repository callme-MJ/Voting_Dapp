'use client';
import React, { useEffect, useState } from 'react';
import styles from './vote.module.css'
import { votingContract } from '@/contracts/connect';
import Web3 from 'web3';
import { redirect } from 'next/dist/server/api-utils';

const VotingPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [connectedAccount, setConnectedAccount] = useState(null);
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
            setConnectedAccount(accounts[1]);
          } else {
            alert('Please download metamask');
          }
    };
    useEffect(() => {
        if (!connectedAccount) {
           console.log('connectedAccount', connectedAccount);
            handleConnect();
    }
    }, [ ]);

    console.log(candidates);
    useEffect(() => {
        votingContract.methods.getCandidates().call().then((res) => {
            setCandidates(res);
        });
    }, [ ]);
    const handleVote = async (id) => {
        if (!connectedAccount) {
            console.log('connectedAccount', connectedAccount);
             handleConnect();
     }
        // Handle the vote for the selected candidate
        console.log(votingContract);
        await votingContract.methods.vote(id).send({ from: connectedAccount }).then((res) => {
            console.log(res);
        });
        window.location.reload();
    };

    return (
        <div>
            <h1 className={styles.vote_heading}>Voting Page</h1>
            <div className={styles.vote_description}>
                <p>Register your vote here...,</p>
                <p>You can vote for one candidate only, other wise the functin will return an error</p>
            </div>

            <div className={styles.errorMessage}>

                {candidates.length == 0 &&
                <>
                <h4>
                    No candidates to vote for
                    </h4>
                    <h3>
                        Please add Candidates <span onClick={()=> window.location="/addCandidate"}>here</span>
                        </h3>
                </>}
                </div>
                <div className={styles.candidate_cards}>
            { candidates.length !==  0 && 
            candidates.map((candidate, index) => (
                <div key={index} className={styles.candidate_card}>
                    <img src="/voteProfile.avif" alt="Candidate" />    
                    <h3>{candidate.name}</h3>
                    <h3>Votes: {Number(candidate.voteCount)}</h3>
                    <button className={styles.vote_button} onClick={()=>{handleVote(candidate.id)}}>Vote</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default VotingPage;