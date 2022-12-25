const { deterministicPartitionKey } = require("./dpk");
const { get1ToNArray } = require("./dpk.helpers");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("should return the trivial partition key when no input", () => {
    const deterministicKey = deterministicPartitionKey();
    expect(deterministicKey).toEqual("0");
  });

  it("should return the event's partitionKey attribute if it is a shorter-than-256-char string", () => {
    const key = "8a42c204345ffb95f7b292a2be3a18bc";

    const deterministicKey = deterministicPartitionKey({
      partitionKey: key,
    });

    expect(deterministicKey).toEqual(key);
  });

  it("should return the event's partitionKey attribute, hashed, if it is a longer-than-256-char string", () => {
    const key = get1ToNArray(257)
      .map(() => "X")
      .join("");

    const hashedKey = crypto.createHash("sha3-512").update(key).digest("hex");

    const deterministicKey = deterministicPartitionKey({
      partitionKey: key,
    });

    expect(deterministicKey).toEqual(hashedKey);
  });

  it("should return the event's partitionKey attribute stringified if it is not a string", () => {
    const key = {
      internalHash: "8a42c204345ffb95f7b292a2be3a18bc",
    };

    const deterministicKey = deterministicPartitionKey({
      partitionKey: key,
    });

    const stringifiedKey = JSON.stringify(key);

    expect(deterministicKey).toEqual(stringifiedKey);
  });

  it("should return the event's partitionKey attribute stringified and hashed if it is not a shorter-than-256-char string", () => {
    const key = {
      internalHash: get1ToNArray(256),
    };

    const deterministicKey = deterministicPartitionKey({
      partitionKey: key,
    });

    const stringifiedKey = JSON.stringify(key);
    const hashedKey = crypto.createHash("sha3-512").update(stringifiedKey).digest("hex");

    expect(deterministicKey).toEqual(hashedKey);
  });

  it("should return the stringified and hashed event if it does not include the partitionKey attribute", () => {
    const key = {
      internalHash: get1ToNArray(256),
    };
    const event = {
      anotherKey: key,
    };

    const deterministicKey = deterministicPartitionKey(event);

    const stringifiedEvent = JSON.stringify(event);

    const hashedEvent = crypto.createHash("sha3-512").update(stringifiedEvent).digest("hex");

    expect(deterministicKey).toEqual(hashedEvent);
  });
});
