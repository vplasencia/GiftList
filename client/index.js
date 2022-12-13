const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // The arguments will start at position 2 of the process.argv array
  // To take the entered name it is used process.argv[2]

  // This if statement is used to check if the name was entered
  if (process.argv.length < 3) {
    console.log("Enter a name");
    return;
  }

  const name = process.argv[2];

  // Create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // Find the index of the name
  const index = niceList.findIndex((n) => n === name);

  // Get the proof, which is the merkle path using the above calculated index
  const merklePath = merkleTree.getProof(index);

  // Send the request to the server, so that the server can verify if that name is part of the list
  // To verify that, it is used the proof (Merkle path) and the name
  // With the proof and the name, the server calculates the Merkle root and can check if the calculated
  // Merkle root is equal to the Merkle root stored in the MERKLE_ROOT variable
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: merklePath,
    name,
  });

  console.log({ gift });
}

main();
