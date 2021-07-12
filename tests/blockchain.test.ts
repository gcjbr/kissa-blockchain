import Blockchain from '../src/Blockchain';
import Block from '../src/Block';

describe('Blockchain', () => {
  let blockchain: Blockchain;
  let blockchain2: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('start with genesis block', () => {
    expect(blockchain.chain[0].data).toStrictEqual(Block.genesis().data);
  });

  it('adds a new block', () => {
    const data = 'Fake data';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toBe(data);
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('foo');
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });

  it('invalidates a corrupt chain', () => {
    blockchain2.addBlock('foo');
    blockchain2.chain[1].data = 'bar';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain2.chain[0].data = 'Bad data';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('replaces chain if new chain is valid', () => {
    blockchain2.addBlock('foo');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it('doe not replace chain if new chain is smaller', () => {
    blockchain.addBlock('foo');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
