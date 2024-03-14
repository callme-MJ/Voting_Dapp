
// SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.24;

contract  VotingContract {
    struct  Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public hasVoted;

    uint public candidatesCount;

    constructor(string [] memory _candidateName) {
        for (uint i = 0; i < _candidateName.length; i++) {
            addCandidates(_candidateName[i]);
        }
    }

    function addCandidates(string memory name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    } 

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function  getCandidate(uint _candidateId) public view returns (uint, string memory, uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        return (candidates[_candidateId].id, candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
    function  getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory _candidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            _candidates[i-1] = candidates[i];
        }
        return _candidates;
    }

    function getCandidatesCount() public view returns (uint) {
        return candidatesCount;
    }

    function getHasVoted(address _address) public view returns (bool) {
        return hasVoted[_address];
    }

    function getVoteCount (uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        return candidates[_candidateId].voteCount;
    }
}

