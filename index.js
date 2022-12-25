const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey());
console.log(
  deterministicPartitionKey({
    attribute: "nsalazar",
  })
);
