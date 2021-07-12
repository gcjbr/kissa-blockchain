import SHA256 from 'crypto-js/sha256';

type Timestamp = Number;
type PreviewsHash = String;
type Hash = String;
export type Data = any;

interface Block {
  timestamp: Timestamp;
  previewsHash: PreviewsHash;
  hash: Hash;
  data: Data;
}

class Block {
  constructor(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    hash: Hash,
    data: Data
  ) {
    this.timestamp = timestamp;
    this.previewsHash = previewsHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis(): Block {
    return new this(Date.now(), '-----', '00000000000', []);
  }

  static mineBlock(lastBlock: Block, data: Data): Block {
    const timestamp = Date.now();
    const previewsHash = lastBlock.hash;
    const hash = Block.hash(timestamp, previewsHash, data);

    return new this(timestamp, previewsHash, hash, data);
  }

  static hash(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    data: Data
  ): Hash {
    return SHA256(`${timestamp}${previewsHash}${data}`).toString();
  }

  static blockHash(block: Block) {
    const { timestamp, previewsHash, data } = block;
    return Block.hash(timestamp, previewsHash, data);
  }

  toSring(): String {
    return `Block - 
      Timestamp----: ${this.timestamp}
      Previews Hash: ${this.previewsHash.substr(0, 15)}
      Hash --------: ${this.hash.substr(0, 15)}
      Data --------: ${this.data};
    `;
  }
}

export default Block;
