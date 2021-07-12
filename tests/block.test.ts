import Block from '../src/Block';

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
    expect(block.hash.substring(0, block.difficulty)).toEqual(
      '0'.repeat(block.difficulty)
    );
  });

  it('it lowers the difficulty to slowly mined blocks', () => {
    expect(Block.changeDifficulty(block, block.timestamp + 360000)).toEqual(
      block.difficulty - 1
    );
  });

  it('it raises the difficulty for quickly mined blocks', () => {
    expect(Block.changeDifficulty(block, block.timestamp - 1)).toEqual(
      block.difficulty + 1
    );
  });
});
