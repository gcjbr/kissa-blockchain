import SHA256 from 'crypto-js/sha256';
import { DIFFICULTY, MINE_RATE } from './config';

type Timestamp = number;
type PreviewsHash = string;
type Hash = string;
type Nonce = number;
type Difficulty = number;
export type Data = any;

interface Block {
  timestamp: Timestamp;
  previewsHash: PreviewsHash;
  hash: Hash;
  data: Data;
  nonce: Nonce;
  difficulty: Difficulty;
}

class Block {
  constructor(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    hash: Hash,
    data: Data,
    nonce: Nonce,
    difficulty: Difficulty
  ) {
    this.timestamp = timestamp;
    this.previewsHash = previewsHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis(): Block {
    return new this(1594585177000, '-----', '00000000000', 0, 0, DIFFICULTY);
  }

  static mineBlock(lastBlock: Block, data: Data): Block {
    let nonce = 0;
    let hash;
    let timestamp;
    let { difficulty } = lastBlock;

    const previewsHash = lastBlock.hash;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.changeDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, previewsHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, previewsHash, hash, data, nonce, difficulty);
  }

  static changeDifficulty(lastBlock: Block, currentTime: number): number {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;

    return difficulty;
  }

  static hash(
    timestamp: Timestamp,
    previewsHash: PreviewsHash,
    data: Data,
    nonce: Nonce,
    difficulty: Difficulty
  ): Hash {
    return SHA256(
      `${timestamp}${previewsHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static blockHash(block: Block) {
    const { timestamp, previewsHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, previewsHash, data, nonce, difficulty);
  }

  toSring(): string {
    return `Block - 
      Timestamp----: ${this.timestamp}
      Previews Hash: ${this.previewsHash.substr(0, 15)}
      Hash --------: ${this.hash.substr(0, 15)}
      Data --------: ${this.data};
      Nonce -------: ${this.nonce};
      Difficulty --: ${this.difficulty};
    `;
  }
}

export default Block;
