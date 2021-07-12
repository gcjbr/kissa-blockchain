import Block, { Data } from './Block';

type Chain = Array<Block>;

interface Blockchain {
  chain: Chain;
}

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: Data): Block {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

  replaceChain(newChain: Chain): void {
    if (newChain.length > this.chain.length && this.isValidChain(newChain)) {
      this.chain = newChain;
    }
  }

  isValidChain(chain: Chain): boolean {
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const previewsBlock = chain[i - 1];

      if (
        block.previewsHash !== previewsBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
