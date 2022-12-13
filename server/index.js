const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// Hardcode a Merkle root representing the whole nice list
// hex string, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // Take the proof and the name from the body of the request
  const { proof, name } = req.body;

  // Calculate the Merkle root using the proof (Merkle path) and the name
  // Verify if the calculated Merkle root is equal the correct Merkle root (MERKLE_ROOT)
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  // If the name is on the list, send the gift
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
