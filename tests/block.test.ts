import Block from '../src/Block';
import config from '../src/config';

describe('Block', () => {
  let data: any, previewsBlock: Block, block: Block;
  data = 'This is a fake data';
  previewsBlock = Block.genesis();
  block = Block.mineBlock(previewsBlock, data);

  it('sets the data to match the input', () => {
    expect(block.data).toEqual(data);
  });
  it('sets the previewsHash to match the hash of the last block', () => {
    expect(block.previewsHash).toEqual(previewsBlock.hash);
  });

  it('creates a token that matches the difficulty', () => {
    expect(block.hash.substring(0, config.DIFFICULTY)).toEqual(
      '0'.repeat(config.DIFFICULTY)
    );
  });
});
