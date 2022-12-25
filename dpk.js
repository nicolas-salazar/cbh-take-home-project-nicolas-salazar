const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const getDefaultDeterministicKey = () => {
  return TRIVIAL_PARTITION_KEY;
};

const getStringBasedDeterministicKey = (baseKey) => {
  if (baseKey.length <= MAX_PARTITION_KEY_LENGTH) {
    return baseKey;
  }

  return crypto.createHash("sha3-512").update(baseKey).digest("hex");
};

const getObjectBasedPartitionKey = (baseObject) => {
  return getStringBasedDeterministicKey(JSON.stringify(baseObject));
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return getDefaultDeterministicKey();
  }

  if (typeof event?.partitionKey === "string") {
    return getStringBasedDeterministicKey(event.partitionKey);
  }

  if (event?.partitionKey && typeof event?.partitionKey !== "string") {
    return getObjectBasedPartitionKey(event.partitionKey);
  }

  return getObjectBasedPartitionKey(event);
};

// Two key notes:
// 1. The candidate variable is, actually, too much variable. It is hard to follow
//    its flow on the code, specially considering that the second conditional depends
//    directly on the first one results and manipulates the candidate value aswell,
//    making the third one to be a pandora's box.
// 2. Nested conditionals are always a bad idea because most of developers try to
//    quicky understand the flow without actually taking the time for reading it.
//
// Thinking about these notes, my suggestion is to write is a simple as possible,
// creating subfunctions that handles each case, no matter if duplicating code.
// Having the subfunctions will make it easier to test the main function also.
