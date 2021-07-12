import SHA256 from 'crypto-js/sha256';
import config from './config';

type Timestamp = number;
type PreviewsHash = string;
type Hash = string;
type Nonce = number;
export type Data = any;

const { DIFFICULTY } = config;
interface Block {
  timestamp: Timestamp;
  previewsHash: PreviewsHash;
  hash: Hash;
  data: Data;
  nonce: Nonce;
}

class Block {
  constructor(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    hash: Hash,
    data: Data,
    nonce: Nonce
  ) {
    this.timestamp = timestamp;
    this.previewsHash = previewsHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  static genesis(): Block {
    return new this(1594585177000, '-----', '00000000000', 0, 0);
  }

  static mineBlock(lastBlock: Block, data: Data): Block {
    let nonce = 0;
    let hash;
    let timestamp;

    const previewsHash = lastBlock.hash;

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, previewsHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, previewsHash, hash, data, nonce);
  }

  static hash(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    data: Data,
    nonce: Nonce
  ): Hash {
    return SHA256(`${timestamp}${previewsHash}${data}${nonce}`).toString();
  }

  static blockHash(block: Block) {
    const { timestamp, previewsHash, data, nonce } = block;
    return Block.hash(timestamp, previewsHash, data, nonce);
  }

  toSring(): string {
    return `Block - 
      Timestamp----: ${this.timestamp}
      Previews Hash: ${this.previewsHash.substr(0, 15)}
      Hash --------: ${this.hash.substr(0, 15)}
      Data --------: ${this.data};
      Nonce -------: ${this.nonce};
    `;
  }
}

export default Block;
