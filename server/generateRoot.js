// This is a script to generate the root of the Merkle tree of all names in niceList.json

const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

console.log(root);
